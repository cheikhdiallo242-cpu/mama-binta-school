// ===== GÉNÉRATEUR STABLE =====

// Lettres
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Mots simples pour enfants
const WORDS = [
  "Banane","Chat","Maison","Soleil","Moto",
  "Livre","École","Table","Pomme","Ballon"
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
