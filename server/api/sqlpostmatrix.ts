import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event); // Stellen Sie sicher, dass getQuery korrekt implementiert ist
  const id: string = query.ID;
  let body = [{}];

  body = await readBody(event); // Stellen Sie sicher, dass readBody korrekt implementiert ist

  async function executeWithRetry(fn, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (error.code === 'P1001' && attempt < maxRetries) {
          console.log(`Retrying... (Attempt ${attempt})`);
        } else {
          throw error;
        }
      }
    }
  }

  async function handleData() {
    return await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`DELETE FROM Schliessplan WHERE id = ${id};`;

      for (const item of body) {
        await tx.$executeRaw`
          INSERT INTO Schliessplan (ID, POSZylinder, POSSchluessel, Berechtigung) 
          VALUES (${id}, ${item.position}, ${item.keynr}, ${item.checked}) 
          ON DUPLICATE KEY UPDATE
          Berechtigung = ${item.checked};
        `;
      }
    });
  }

  try {
    await executeWithRetry(handleData);
    return { message: 'Daten gelöscht und eingefügt.' };
  } catch (e) {
    console.error(e);
    return { error: 'Ein Fehler ist aufgetreten.' };
  } finally {
    await prisma.$disconnect();
  }
});
