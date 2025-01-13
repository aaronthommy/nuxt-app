export default {
  "Kein bestimmtes Modell": {
    isSchliessanlage: true,
    Doppelzylinder: {
      sizes: [
        { inside: 30, outside: 30 },
        { inside: 30, outside: 35 },
        { inside: 30, outside: 40 },
        { inside: 30, outside: 45 },
        { inside: 30, outside: 50 },
        { inside: 30, outside: 55 },
        { inside: 30, outside: 60 },
        { inside: 30, outside: 65 },
        { inside: 30, outside: 70 },
        { inside: 30, outside: 75 },
        { inside: 30, outside: 80 },
        { inside: 30, outside: 85 },
        { inside: 30, outside: 90 },
        { inside: 30, outside: 95 },
        { inside: 30, outside: 100 },
        { inside: 30, outside: 105 },
        { inside: 30, outside: 110 },
        { inside: 30, outside: 115 },
        { inside: 30, outside: 120 },
        { inside: 30, outside: 125 },
        { inside: 30, outside: 130 },
        { inside: 35, outside: 30 },
        { inside: 35, outside: 35 },
        { inside: 35, outside: 40 },
        { inside: 35, outside: 45 },
        { inside: 35, outside: 50 },
        { inside: 35, outside: 55 },
        { inside: 35, outside: 60 },
        { inside: 35, outside: 65 },
        { inside: 35, outside: 70 },
        { inside: 35, outside: 75 },
        { inside: 35, outside: 80 },
        { inside: 35, outside: 85 },
        { inside: 35, outside: 90 },
        { inside: 35, outside: 95 },
        { inside: 35, outside: 100 },
        { inside: 35, outside: 105 },
        { inside: 35, outside: 110 },
        { inside: 35, outside: 115 },
        { inside: 35, outside: 120 },
        { inside: 35, outside: 125 },
        { inside: 35, outside: 130 },
        { inside: 40, outside: 30 },
        { inside: 40, outside: 35 },
        { inside: 40, outside: 40 },
        { inside: 40, outside: 45 },
        { inside: 40, outside: 50 },
        { inside: 40, outside: 55 },
        { inside: 40, outside: 60 },
        { inside: 40, outside: 65 },
        { inside: 40, outside: 70 },
        { inside: 40, outside: 75 },
        { inside: 40, outside: 80 },
        { inside: 40, outside: 85 },
        { inside: 40, outside: 90 },
        { inside: 40, outside: 95 },
        { inside: 40, outside: 100 },
        { inside: 40, outside: 105 },
        { inside: 40, outside: 110 },
        { inside: 40, outside: 115 },
        { inside: 40, outside: 120 },
        { inside: 40, outside: 125 },
        { inside: 40, outside: 130 },
      ],
      options: {
        Material: ["Standard","Nickel", "Bronze (+5€)", "Brass"],
        Sicherheit: ["Standard", "High Security"],
        Oberfläche: ["Standard","Matt", "Poliert"],
      },
    },
    Knaufzylinder: {
      sizes: [
        { inside: 30, outside: 35 },
        { inside: 35, outside: 40 },
      ],
      options: {
        Form: ["Rund", "Oval"],
        Material: ["Nickel", "Bronze"],
        Besonderheit: ["Not- & Gefahrenfunktion"],
      },
    },
    Halbzylinder: {
      sizes: [
        { inside: 30, outside: 10 },
        { inside: 35, outside: 10 },
      ],
      options: {
        Material: ["Nickel", "Bronze"],
        Sicherheit: ["Standard", "Security"],
      },
    },
    Vorhangschloss: {
      types: {
        "50mm": {
          options: {
            Länge: ["Standard", "Long"],
          },
        },
        "80mm": {
          options: {
            Länge: ["Standard", "Long", "Extra Long"],
          },
        },
      },
    },
    Briefkastenschloss: {
      options: {
        Art: ["Surface", "Mortise"],
        Material: ["Nickel", "Bronze"],
      },
    },
    availableTypes: [
      "Doppelzylinder",
      "Knaufzylinder (innen)",
      "Halbzylinder",
      "Vorhangschloss 50mm",
      "Vorhangschloss 80mm",
      "Briefkastenschloss",
    ],
  },
  "ABUS EC550": {
    isSchliessanlage: false,
    Doppelzylinder: {
      sizes: [
        { inside: 30, outside: 30 },
        { inside: 30, outside: 35 },
        { inside: 30, outside: 40 },
        { inside: 30, outside: 45 },
        { inside: 30, outside: 50 },
        { inside: 35, outside: 35 },
        { inside: 35, outside: 40 },
        { inside: 35, outside: 45 },
        { inside: 40, outside: 40 },
        { inside: 40, outside: 45 },
        { inside: 45, outside: 45 },
        { inside: 50, outside: 30 },
      ],
      options: {
        Material: ["Nickel", "Bronze", "Brass"],
        Sicherheit: ["Standard", "High Security", "Not- & Gefahrenfunktion"],
        Finish: ["Matt", "Poliert"],
      },
    },
    Knaufzylinder: {
      sizes: [
        { inside: 30, outside: 35 },
        { inside: 35, outside: 40 },
      ],
      options: {
        Form: ["Round", "Oval"],
        Material: ["Nickel", "Bronze"],
        Besonderheit: ["Not- & Gefahrenfunktion"],
      },
    },
    Halbzylinder: {
      sizes: [
        { inside: 30, outside: 0 },
        { inside: 35, outside: 0 },
      ],
      options: {
        Material: ["Nickel", "Bronze"],
        Sicherheit: ["Standard", "Security"],
      },
    },
    Vorhangschloss: {
      types: {
        "50mm": {
          options: {
            Länge: ["Standard", "Long"],
          },
        },
        "80mm": {
          options: {
            Länge: ["Standard", "Long", "Extra Long"],
          },
        },
      },
    },
    Briefkastenschloss: {
      options: {
        Art: ["Surface", "Mortise"],
        Material: ["Nickel", "Bronze"],
      },
    },
    availableTypes: [
      "Doppelzylinder",
      "Knaufzylinder (innen)",
      "Halbzylinder",
      "Vorhangschloss 50mm",
      "Vorhangschloss 80mm",
      "Briefkastenschloss",
    ],
  },
  "ABUS EC660": {
    isSchliessanlage: false,
    Doppelzylinder: {
      sizes: [
        { inside: 30, outside: 30 },
        { inside: 30, outside: 35 },
        { inside: 30, outside: 40 },
        { inside: 30, outside: 45 },
        { inside: 30, outside: 50 },
        { inside: 35, outside: 35 },
        { inside: 35, outside: 40 },
        { inside: 35, outside: 45 },
        { inside: 40, outside: 40 },
        { inside: 40, outside: 45 },
        { inside: 45, outside: 45 },
      ],
      options: {
        Material: ["Nickel", "Bronze", "Brass"],
        Sicherheit: ["Standard", "High Security"],
      },
    },
    Knaufzylinder: {
      sizes: [
        { inside: 30, outside: 35 },
        { inside: 35, outside: 40 },
      ],
      options: {
        Form: ["Round", "Oval"],
        Material: ["Nickel", "Bronze"],
      },
    },
    Halbzylinder: {
      sizes: [
        { inside: 30, outside: 0 },
        { inside: 35, outside: 0 },
      ],
      options: {
        Material: ["Nickel", "Bronze"],
        Sicherheit: ["Standard", "Security"],
      },
    },
    availableTypes: [
      "Doppelzylinder",
      "Knaufzylinder (innen)",
      "Halbzylinder",
    ],
  },
  "ABUS EC880": {
    isSchliessanlage: false,
    Doppelzylinder: {
      sizes: [
        { inside: 50, outside: 30 },
      ],
      options: {
        Material: ["Nickel", "Bronze", "Brass"],
        Sicherheit: ["Standard", "High Security"],
        Finish: ["Matt", "Poliert"],
      },
    },
    Knaufzylinder: {
      sizes: [
        { inside: 30, outside: 35 },
        { inside: 35, outside: 40 },
      ],
      options: {
        Form: ["Round", "Oval"],
        Material: ["Nickel", "Bronze"],
        Besonderheit: ["Not- & Gefahrenfunktion"],
      },
    },
    Halbzylinder: {
      sizes: [
        { inside: 30, outside: 0 },
        { inside: 35, outside: 0 },
      ],
      options: {
        Material: ["Nickel", "Bronze"],
        Sicherheit: ["Standard", "Security"],
      },
    },
    availableTypes: [
      "Doppelzylinder",
      "Knaufzylinder (innen)",
      "Halbzylinder",
    ],
  },
};
