// ===== GÉNÉRATEUR STABLE =====

// Lettres
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Mots simples pour enfants
const WORDS = [
  "Avion","Arbre",
  "Banane","Ballon",
  "Chat","Chien",
  "Drapeau","Dinosaure",
  "École","Éléphant",
  "Fleur","Forêt",
  "Gâteau","Girafe",
  "Hôpital","Hibou",
  "Igloo","Image",
  "Jardin","Jouet",
  "Koala","Kangourou",
  "Livre","Lune",
  "Maison","Moto",
  "Nuage","Navire",
  "Orange","Oiseau",
  "Pomme","Poisson",
  "Question","Quatre",
  "Robot","Roue",
  "Soleil","Stylo",
  "Table","Train",
  "Usine","Uniforme",
  "Voiture","Vache",
  "Wagon","Web",
  "Xylophone","Xavier",
  "Yaourt","Yoyo",
  "Zèbre","Zoo"
];

// Mélange
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// ----- LECTURE -----
function generateReadingQuestion() {
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    const validWords = WORDS.filter(w => w.startsWith(letter));

    const answer = validWords.length > 0 ? validWords[0] : WORDS[0];

    return {
        question: "Quel mot commence par la lettre " + letter + " ?",
        choices: shuffle([
            answer,
            WORDS[Math.floor(Math.random() * WORDS.length)],
            WORDS[Math.floor(Math.random() * WORDS.length)]
        ]),
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
