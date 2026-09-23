// =====================================================
// ✏️ AGENT GÉNÉRATEUR DE MAMA BINTA
// =====================================================
// Le générateur consulte l'analyste pour savoir :
// 1. quelle matière travailler
// 2. quel niveau de difficulté utiliser
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

    const choices =
        shuffle([
            answer,
            ...wrongChoices
        ]);

    return {
        question:
            "Quel mot commence par la lettre " +
            letter +
            " ?",

        choices:
            choices,

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

    let maxNumber;

    if (
        difficulty === "tres_simple"
    ) {

        maxNumber = 5;

    } else if (
        difficulty === "simple"
    ) {

        maxNumber = 10;

    } else {

        maxNumber = 20;
    }

    const a =
        Math.floor(
            Math.random() *
            (maxNumber + 1)
        );

    const b =
        Math.floor(
            Math.random() *
            (maxNumber + 1)
        );

    const result =
        a + b;

    const wrong1 =
        result + 1;

    const wrong2 =
        result > 0
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
    // Aucun analyste disponible
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
    // ⚖️ AUCUNE DIFFICULTÉ PRIORITAIRE
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
