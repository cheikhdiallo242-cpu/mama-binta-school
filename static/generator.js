// =====================================================
// ✏️ AGENT GÉNÉRATEUR DE MAMA BINTA
// =====================================================
// Le générateur consulte l'analyste pour savoir :
// 1. quelle matière travailler
// 2. quel niveau utiliser
// 3. comment adapter les exercices
// =====================================================

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


// =====================================================
// 🔀 MÉLANGE
// =====================================================

function shuffle(arr) {

    return [...arr].sort(
        () => Math.random() - 0.5
    );
}


// =====================================================
// 🔤 PREMIÈRE LETTRE
// =====================================================

function firstLetter(word) {

    return word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .charAt(0)
        .toUpperCase();
}


// =====================================================
// 🔎 CONSULTATION DE L'ANALYSTE
// =====================================================

function getAnalysis() {

    if (
        typeof analyzeStudent !== "function"
    ) {
        return null;
    }

    return analyzeStudent();
}


// =====================================================
// 📖 QUESTION DE LECTURE
// =====================================================

function generateReadingQuestion() {

    const availableLetters = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z"
    ];

    const letter =
        availableLetters[
            Math.floor(
                Math.random() *
                availableLetters.length
            )
        ];

    const correctWords =
        WORDS.filter(
            word =>
                firstLetter(word) === letter
        );

    const wrongWords =
        WORDS.filter(
            word =>
                firstLetter(word) !== letter
        );

    const answer =
        correctWords[
            Math.floor(
                Math.random() *
                correctWords.length
            )
        ];

    const wrongChoices =
        shuffle(
            wrongWords
        ).slice(0, 2);

    return {
        question:
            "Quel mot commence par la lettre " +
            letter +
            " ?",

        choices:
            shuffle([
                answer,
                ...wrongChoices
            ]),

        answer:
            answer
    };
}


// =====================================================
// 🧮 QUESTION DE MATHS
// =====================================================

function generateMathQuestion(
    difficulty = "normal"
) {

    let minNumber;
    let maxNumber;

    // -----------------------------------------
    // 🔴 TRÈS SIMPLE
    // -----------------------------------------

    if (
        difficulty === "tres_simple"
    ) {

        minNumber = 0;
        maxNumber = 5;
    }


    // -----------------------------------------
    // 🟡 SIMPLE
    // -----------------------------------------

    else if (
        difficulty === "simple"
    ) {

        minNumber = 1;
        maxNumber = 10;
    }


    // -----------------------------------------
    // 🟢 NORMAL
    // -----------------------------------------

    else if (
        difficulty === "normal"
    ) {

        minNumber = 2;
        maxNumber = 20;
    }


    // -----------------------------------------
    // 🔵 DIFFICILE
    // -----------------------------------------

    else if (
        difficulty === "difficile"
    ) {

        minNumber = 10;
        maxNumber = 50;
    }


    // -----------------------------------------
    // ⚪ VALEUR PAR DÉFAUT
    // -----------------------------------------

    else {

        minNumber = 2;
        maxNumber = 20;
    }


    const a =
        Math.floor(
            Math.random() *
            (maxNumber - minNumber + 1)
        ) + minNumber;

    const b =
        Math.floor(
            Math.random() *
            (maxNumber - minNumber + 1)
        ) + minNumber;

    const result =
        a + b;


    // -----------------------------------------
    // Mauvaises réponses
    // -----------------------------------------

    const wrong1 =
        result + 1;

    const wrong2 =
        result > 1
            ? result - 1
            : result + 2;


    return {

        question:
            "Combien font " +
            a +
            " + " +
            b +
            " ?",

        choices:
            shuffle([
                result.toString(),
                wrong1.toString(),
                wrong2.toString()
            ]),

        answer:
            result.toString()
    };
}


// =====================================================
// 🤖 EXERCICE PERSONNALISÉ
// =====================================================

function generateAdaptiveQuestion() {

    const analysis =
        getAnalysis();


    // -----------------------------------------
    // Analyste indisponible
    // -----------------------------------------

    if (!analysis) {

        console.log(
            "✏️ Générateur : analyste indisponible."
        );

        return generateMathQuestion(
            "normal"
        );
    }


    // -----------------------------------------
    // 🧮 MATHS
    // -----------------------------------------

    if (
        analysis.subject === "Maths"
    ) {

        const difficulty =
            analysis.difficulty ||
            "normal";

        console.log(
            "🔎 Analyste → ✏️ Générateur"
        );

        console.log(
            "Matière : Maths"
        );

        console.log(
            "Niveau : " +
            difficulty
        );

        return generateMathQuestion(
            difficulty
        );
    }


    // -----------------------------------------
    // 📖 LECTURE
    // -----------------------------------------

    if (
        analysis.subject === "Lecture"
    ) {

        console.log(
            "🔎 Analyste → ✏️ Générateur"
        );

        console.log(
            "Matière : Lecture"
        );

        console.log(
            "Niveau : " +
            (analysis.difficulty || "normal")
        );

        return generateReadingQuestion();
    }


    // -----------------------------------------
    // ⚖️ AUCUNE MATIÈRE PRIORITAIRE
    // -----------------------------------------

    const randomSubject =
        Math.random() < 0.5
            ? "Lecture"
            : "Maths";


    console.log(
        "✏️ Générateur : aucune difficulté prioritaire."
    );


    if (
        randomSubject === "Maths"
    ) {

        return generateMathQuestion(
            "normal"
        );
    }


    return generateReadingQuestion();
}
