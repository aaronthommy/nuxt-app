<!-- ColumnModal.vue -->
<template>
  <UModal class="column-modal" v-model="isOpenC">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">Schlüssel benennen</h6>
        <UButton class="close-button" color="red" @click="closeModal"
          >X</UButton
        >
      </div>
      <div class="modal-body">
        <label for="input" class="modal-label">Schlüsselbezeichnung:</label>
        <UInput
          autofocus
          class="modal-input"
          v-model="columnName"
          color="amber"
          placeholder="z.B. Haustürschlüssel"
        />
      </div>
      <div class="modal-footer">
        <UButton
          class="save-button"
          style="color: #fff"
          @click="closeModal"
          color="amber"
        >
          Speichern
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<script>
export default {
  name: "ColumnModal",
  props: ["columnId"],
  data() {
    return {
      isOpenC: false,
      columnName: "",
    };
  },
  methods: {
    closeModal() {
      // Hier z. B. das neue Spalten-Label speichern
      this.$emit("update-column-name", this.columnName);
      this.$emit("close-this-modal", this.isOpenC);
    },
  },
};
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  h6 {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    font-weight: 900;
  }

  .modal-label {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    font-weight: 400;
  }
}

.column-modal ::v-deep .u-modal-content {
  background: #ffffff; /* oder #f9fafb für ein helleres Offwhite */
  border-radius: 12px;
  max-width: 480px; /* Modale etwas schmaler halten */
  margin: 1.5rem auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease, transform 0.3s ease;
  overflow: hidden;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.close-button {
  background-color: #dc2626 !important; /* rote Nuance */
  color: #fff !important;
  font-weight: 600;
  border-radius: 6px;
  min-width: 36px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: #b91c1c !important; /* dunkleres Rot */
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal-label {
  font-size: 0.95rem;
  color: #555; /* Für helle Themes */
}

.modal-input ::v-deep .u-input__field {
  border-color: #cbd5e1;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.modal-input ::v-deep .u-input__field:hover {
  border-color: #94a3b8;
}

.modal-input ::v-deep .u-input__field:focus {
  border-color: #f59e0b; /* Amber-Hover */
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.save-button {
  background-color: #f59e0b !important; /* Amber-Farbe */
  color: #fff !important;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s, transform 0.1s;
}

.save-button:hover {
  background-color: #d97706 !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}
</style>
