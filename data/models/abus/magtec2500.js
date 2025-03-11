export default {
    isSchliessanlage: true,
    image: "./images/abus-magtec-doppelzylinder-schluessel-logo-500x500.png",
    keyPrice: 8.35,
    productID: 28683,
    useCase: "privat & gewerblich", 
    securityLevel: 7, 
    features: [
        "Magnettechnologie im Schlüssel und Zylinder",
        "Sicherungskarte mit enthalten",
        "Zertifiziert nach DIN 18252 und DIN EN 1303",
    ],
    infoText: `Das Magtec-Schließsystem von ABUS erfüllt höchste Sicherheitsansprüche, wie das unabhängige SKG-Prüfinstitut mit der Sicherheitsklasse SKG*** bestätigt. Die fortschrittliche Magnettechnologie im Zylinder und am Schlüssel bietet einen besonders zuverlässigen Schutz gegen illegale Schlüsselkopien und Manipulationen des Schließsystems. Dazu zählen Methoden wie Picking sowie gewaltsames Aufbrechen durch Aufbohren oder Herausziehen des Zylinderkerns. Mit Magtec sind Sie hinsichtlich Türsicherheit zukunftssicher.`,
    deliveryTime: "2-3 Werktage",

    ////////////////////////////////////////////////////////////////////////
    // DOPPELZYLINDER
    ////////////////////////////////////////////////////////////////////////
    Doppelzylinder: {
        sizes: [
            ///////
            { outside: 30, inside: 30, price: 69.25 },
            { outside: 30, inside: 35, price: 73.45 },
            { outside: 30, inside: 40, price: 77.65 },
            { outside: 30, inside: 45, price: 81.85 },
            { outside: 30, inside: 50, price: 86.05 },
            { outside: 30, inside: 55, price: 90.25 },
            { outside: 30, inside: 60, price: 93.4 },
            { outside: 30, inside: 65, price: 97.6 },
            { outside: 30, inside: 70, price: 101.8 },
            { outside: 30, inside: 80, price: 110.2 },
            { outside: 30, inside: 90, price: 118.6 },
            { outside: 30, inside: 100, price: 127.0 },
            { outside: 30, inside: 110, price: 134.35 },
            { outside: 30, inside: 120, price: 142.75 },
            ///////
            { outside: 35, inside: 30, price: 69.25 },
            { outside: 35, inside: 35, price: 77.65 },
            { outside: 35, inside: 40, price: 81.85 },
            { outside: 35, inside: 45, price: 86.05 },
            { outside: 35, inside: 50, price: 90.25 },
            { outside: 35, inside: 55, price: 93.4 },
            { outside: 35, inside: 60, price: 97.6 },
            { outside: 35, inside: 65, price: 101.8 },
            { outside: 35, inside: 70, price: 106.0 },
            { outside: 35, inside: 80, price: 79.75 },
            { outside: 35, inside: 90, price: 122.8 },
            { outside: 35, inside: 100, price: 131.2 },
            { outside: 35, inside: 110, price: 138.55 },
            { outside: 35, inside: 120, price: 146.95 },
            ///////
            { outside: 40, inside: 30, price: 77.65 },
            { outside: 40, inside: 35, price: 81.85 },
            { outside: 40, inside: 40, price: 86.05 },
            { outside: 40, inside: 45, price: 90.25 },
            { outside: 40, inside: 50, price: 93.4 },
            { outside: 40, inside: 55, price: 97.6 },
            { outside: 40, inside: 60, price: 102.85 },
            { outside: 40, inside: 65, price: 106.0 },
            { outside: 40, inside: 70, price: 110.2 },
            { outside: 40, inside: 80, price: 118.6 },
            { outside: 40, inside: 90, price: 127.0 },
            { outside: 40, inside: 100, price: 134.35 },
            { outside: 40, inside: 110, price: 142.75 },
            { outside: 40, inside: 120, price: 151.15 },
            ///////
            { outside: 45, inside: 30, price: 81.85 },
            { outside: 45, inside: 35, price: 86.05 },
            { outside: 45, inside: 40, price: 90.25 },
            { outside: 45, inside: 45, price: 93.4 },
            { outside: 45, inside: 50, price: 97.6 },
            { outside: 45, inside: 55, price: 101.8 },
            { outside: 45, inside: 60, price: 106.0 },
            { outside: 45, inside: 65, price: 110.2 },
            { outside: 45, inside: 70, price: 114.4 },
            ///////
            { outside: 50, inside: 30, price: 86.05 },
            { outside: 50, inside: 35, price: 90.25 },
            { outside: 50, inside: 40, price: 93.4 },
            { outside: 50, inside: 45, price: 97.6 },
            { outside: 50, inside: 50, price: 101.8 },
            { outside: 50, inside: 55, price: 106.0 },
            { outside: 50, inside: 60, price: 110.2 },
            { outside: 50, inside: 65, price: 114.4 },
            { outside: 50, inside: 70, price: 118.6 },
            ///////
            { outside: 55, inside: 30, price: 90.25 },
            { outside: 55, inside: 35, price: 94.45 },
            { outside: 55, inside: 40, price: 97.6 },
            { outside: 55, inside: 45, price: 101.8 },
            { outside: 55, inside: 50, price: 106.0 },
            { outside: 55, inside: 55, price: 110.2 },
            { outside: 55, inside: 60, price: 114.4 },
            { outside: 55, inside: 65, price: 118.6 },
            { outside: 55, inside: 70, price: 122.8 },
            ///////
            { outside: 60, inside: 30, price: 93.4 },
            { outside: 60, inside: 35, price: 97.6 },
            { outside: 60, inside: 40, price: 101.8 },
            { outside: 60, inside: 45, price: 106.0 },
            { outside: 60, inside: 50, price: 110.2 },
            { outside: 60, inside: 55, price: 114.4 },
            { outside: 60, inside: 60, price: 118.6 },
            { outside: 60, inside: 65, price: 122.8 },
            { outside: 60, inside: 70, price: 127.0 },
            ///////
            { outside: 65, inside: 30, price: 97.6 },
            { outside: 65, inside: 35, price: 101.8 },
            { outside: 65, inside: 40, price: 106.0 },
            { outside: 65, inside: 45, price: 110.2 },
            { outside: 65, inside: 50, price: 114.4 },
            { outside: 65, inside: 55, price: 118.6 },
            { outside: 65, inside: 60, price: 122.8 },
            { outside: 65, inside: 65, price: 127.0 },
            { outside: 65, inside: 70, price: 131.2 },
            ///////
            { outside: 70, inside: 30, price: 101.8 },
            { outside: 70, inside: 35, price: 106.0 },
            { outside: 70, inside: 40, price: 110.2 },
            { outside: 70, inside: 45, price: 114.4 },
            { outside: 70, inside: 50, price: 118.6 },
            { outside: 70, inside: 55, price: 122.8 },
            { outside: 70, inside: 60, price: 127.0 },
            { outside: 70, inside: 65, price: 131.2 },
            { outside: 70, inside: 70, price: 134.35 },
            ///////
            { outside: 80, inside: 30, price: 110.2 },
            { outside: 80, inside: 35, price: 108.95 },
            { outside: 80, inside: 40, price: 114.4 },
            ///////
            { outside: 90, inside: 30, price: 118.6 },
            { outside: 90, inside: 35, price: 122.8 },
            { outside: 90, inside: 40, price: 127.0 },
            ///////
            { outside: 100, inside: 30, price: 127.0 },
            { outside: 100, inside: 35, price: 131.2 },
            { outside: 100, inside: 40, price: 134.35 },
            ///////
            { outside: 110, inside: 30, price: 134.35 },
            { outside: 110, inside: 35, price: 138.55 },
            { outside: 110, inside: 40, price: 142.75 },
            ///////
            { outside: 120, inside: 30, price: 142.75 },
            { outside: 120, inside: 35, price: 146.95 },
            { outside: 120, inside: 40, price: 151.15 },
            ///////
        ],
        options: [
            "Not- & Gefahrenfunktion",
        ],
    },
    Knaufzylinder: {
        sizes: [
            ////////
            { outside: 30, inside: 30, price: 100.75 },
            { outside: 30, inside: 35, price: 104.95 },
            { outside: 30, inside: 40, price: 109.15 },
            { outside: 30, inside: 45, price: 113.35 },
            { outside: 30, inside: 50, price: 117.55 },
            { outside: 30, inside: 55, price: 121.75 },
            { outside: 30, inside: 60, price: 125.95 },
            { outside: 30, inside: 65, price: 129.10 },
            { outside: 30, inside: 70, price: 133.30 },
            { outside: 30, inside: 80, price: 141.70 },
            { outside: 30, inside: 90, price: 150.10 },
            { outside: 30, inside: 100, price: 158.50 },
            { outside: 30, inside: 110, price: 166.90 },
            { outside: 30, inside: 120, price: 174.25 },
            ////////
            { outside: 35, inside: 35, price: 109.15 },
            { outside: 35, inside: 40, price: 113.35 },
            { outside: 35, inside: 45, price: 117.55 },
            { outside: 35, inside: 50, price: 121.75 },
            { outside: 35, inside: 55, price: 125.95 },
            { outside: 35, inside: 60, price: 129.10 },
            { outside: 35, inside: 65, price: 133.30 },
            { outside: 35, inside: 70, price: 137.50 },
            { outside: 35, inside: 80, price: 141.70 },
            { outside: 35, inside: 90, price: 150.10 },
            { outside: 35, inside: 100, price: 158.50 },
            { outside: 35, inside: 110, price: 166.90 },
            { outside: 35, inside: 120, price: 174.25 },
            ////////
            { outside: 40, inside: 40, price: 117.55 },
            { outside: 40, inside: 45, price: 121.75 },
            { outside: 40, inside: 50, price: 125.95 },
            { outside: 40, inside: 55, price: 129.10 },
            { outside: 40, inside: 60, price: 133.30 },
            { outside: 40, inside: 65, price: 137.50 },
            { outside: 40, inside: 70, price: 141.70 },
            { outside: 40, inside: 80, price: 150.10 },
            { outside: 40, inside: 90, price: 158.50 },
            { outside: 40, inside: 100, price: 166.90 },
            { outside: 40, inside: 110, price: 174.25 },
            { outside: 40, inside: 120, price: 182.65 },
            ////////
            { outside: 45, inside: 45, price: 125.95 },
            { outside: 45, inside: 50, price: 129.10 },
            { outside: 45, inside: 55, price: 133.30 },
            { outside: 45, inside: 60, price: 137.50 },
            { outside: 45, inside: 65, price: 141.70 },
            { outside: 45, inside: 70, price: 145.90 },
            ////////
            { outside: 50, inside: 50, price: 133.30 },
            { outside: 50, inside: 55, price: 137.50 },
            { outside: 50, inside: 60, price: 141.70 },
            { outside: 50, inside: 65, price: 145.90 },
            { outside: 50, inside: 70, price: 150.10 },
            ////////
            { outside: 55, inside: 55, price: 141.70 },
            { outside: 55, inside: 60, price: 145.90 },
            { outside: 55, inside: 65, price: 150.10 },
            { outside: 55, inside: 70, price: 154.30 },
            ////////
            { outside: 60, inside: 60, price: 150.10 },
            { outside: 60, inside: 65, price: 154.30 },
            { outside: 60, inside: 70, price: 158.50 },
            ////////
            { outside: 65, inside: 65, price: 158.50 },
            { outside: 65, inside: 70, price: 162.70 },
            ////////
            { outside: 70, inside: 70, price: 166.90 },
            ////////
            { outside: 80, inside: 30, price: 141.70 },
            { outside: 80, inside: 35, price: 145.90 },
            { outside: 80, inside: 40, price: 150.10 },
            ////////
            { outside: 90, inside: 30, price: 150.10 },
            { outside: 90, inside: 35, price: 154.30 },
            { outside: 90, inside: 40, price: 158.50 },
            ////////
            { outside: 100, inside: 30, price: 158.50 },
            { outside: 100, inside: 35, price: 162.70 },
            { outside: 100, inside: 40, price: 166.90 },
            ////////
            { outside: 110, inside: 30, price: 166.90 },
            { outside: 110, inside: 35, price: 171.10 },
            { outside: 110, inside: 40, price: 174.25 },
            ////////
            { outside: 120, inside: 30, price: 174.25 },
            { outside: 120, inside: 35, price: 178.45 },
            { outside: 120, inside: 40, price: 182.65 },
            ////////
        ],
        options: [],
    },
    Halbzylinder: {
        sizes: [
            ////////
            { outside: 30, inside: 10, price: 47.20 },
            { outside: 35, inside: 10, price: 51.40 },
            { outside: 40, inside: 10, price: 55.60 },
            { outside: 45, inside: 10, price: 58.75 },
            { outside: 50, inside: 10, price: 62.95 },
            { outside: 55, inside: 10, price: 67.15 },
            { outside: 60, inside: 10, price: 71.35 },
            { outside: 65, inside: 10, price: 79.75 },
            { outside: 70, inside: 10, price: 88.15 },
            ////////
        ],
        options: [
            "Not- & Gefahrenfunktion",
        ],
    },
    Vorhangschloss: {
        types: {
            "50mm": {
                options: [
                    "Seenwasserfest",
                ]
            },
            "80mm": {
                options: [
                    "Seenwasserfest",
                ]
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
    ],
}
