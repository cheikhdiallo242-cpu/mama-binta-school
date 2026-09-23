// ===== GÉNÉRATEUR STABLE — ÉTAPE 1 =====

// Mots simples pour enfants
const WORDS = [
    "Avion", "Arbre",
    "Banane", "Ballon",
    "Chat", "Chien",
    "Drapeau", "Dinosaure",
    "École", "Éléphant",
    "Fleur", "Forêt",
    "Gâteau", "Girafe",
    "Hôpital", "Hibou",
    "Igloo", "Image",
    "Jardin", "Jouet",
    "Koala", "Kangourou",
    "Livre", "Lune",
    "Maison", "Moto",
    "Nuage", "Navire",
    "Orange", "Oiseau",
    "Pomme", "Poisson",
    "Question", "Quatre",
    "Robot", "Roue",
    "Soleil", "Stylo",
    "Table", "Train",
    "Usine", "Uniforme",
    "Voiture", "Vache",
    "Wagon", "Web",
    "Xylophone", "Xavier",
    "Yaourt", "Yoyo",
    "Zèbre", "Zoo"
];

// Mélange fiable
function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

// Première lettre normalisée
function firstLetter(word) {
    return word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .charAt(0)
        .toUpperCase();
}

// ----- LECTURE -----

function generateReadingQuestion() {

    // Choisir une lettre qui possède plusieurs mots
    const availableLetters = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z"
    ];

    const letter =
        availableLetters[
            Math.floor(Math.random() * availableLetters.length)
        ];

    // Mots qui commencent réellement par cette lettre
    const correctWords = WORDS.filter(
        word => firstLetter(word) === letter
    );

    // Mots qui ne commencent PAS par cette lettre
    const wrongWords = WORDS.filter(
        word => firstLetter(word) !== letter
    );

    // Bonne réponse
    const answer =
        correctWords[
            Math.floor(Math.random() * correctWords.length)
        ];

    // Deux mauvaises réponses
    const wrongChoices = shuffle(wrongWords).slice(0, 2);

    // Les trois choix
    const choices = shuffle([
        answer,
        ...wrongChoices
    ]);

    return {
        question: "Quel mot commence par la lettre " + letter + " ?",
        choices: choices,
        answer: answer
    };
}

// ----- MATHS -----

function generateMathQuestion() {

    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;

    const res = a + b;

    return {
        question: "Combien font " + a + " + " + b + " ?",

        choices: shuffle([
            res.toString(),
            (res + 1).toString(),
            (res - 1).toString()
        ]),

        answer: res.toString()
    };
}
