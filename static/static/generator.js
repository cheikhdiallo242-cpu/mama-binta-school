// ---------- GÉNÉRATEUR DE QUESTIONS ----------

// Lettres
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Mots simples (tu peux en ajouter 1000 ici)
const words = [
  "Banane","Chat","Maison","Soleil","Moto","Livre","École","Table","Pomme","Ballon"
];

// ---------- LECTURE ----------
function generateReadingQuestion() {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const good = words.find(w => w.startsWith(letter)) || words[0];

    const choices = shuffle([
        good,
        words[Math.floor(Math.random()*words.length)],
        words[Math.floor(Math.random()*words.length)]
    ]);

    return {
        question: `Quel mot commence par la lettre ${letter} ?`,
        choices: choices,
        answer: good
    };
}

// ---------- MATHS ----------
function generateMathQuestion() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;

    const answer = a + b;

    return {
        question: `Combien font ${a} + ${b} ?`,
        choices: shuffle([
            answer.toString(),
            (answer + 1).toString(),
            (answer - 1).toString()
        ]),
        answer: answer.toString()
    };
}

// ---------- OUTIL ----------
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
