// =====================================================
// ✏️ AGENT GÉNÉRATEUR DE MAMA BINTA
// =====================================================
// Le générateur crée les questions.
//
// Il peut maintenant consulter l'analyste
// pour savoir quelle matière mérite davantage
// d'entraînement.
// =====================================================


// =====================================================
// MOTS POUR LA LECTURE
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
// MÉLANGE
// =====================================================

function shuffle(arr) {

    return [...arr].sort(
        () => Math.random() - 0.5
    );
}


// =====================================================
// PREMIÈRE LETTRE
// =====================================================

function firstLetter(word) {

    return word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .charAt(0)
        .toUpperCase();
}


// =====================================================
// 🔎 CONSULTER L'ANALYSTE
// =====================================================

function getRecommendedSubject() {

    // Si l'analyste n'est pas disponible,
    // on continue normalement.

    if (
        typeof analyzeStudent !== "function"
    ) {

        return null;
    }


    const analysis =
        analyzeStudent();


    if (
        analysis &&
        analysis.subject
    ) {

        return analysis.subject;
    }


    return null;
}


// =====================================================
// 📖 GÉNÉRATEUR DE LECTURE
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
// 🧮 GÉNÉRATEUR DE MATHS
// =====================================================

function generateMathQuestion() {

    const a =
        Math.floor(
            Math.random() * 10
        ) + 1;


    const b =
        Math.floor(
            Math.random() * 10
        ) + 1;


    const result =
        a + b;


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

                (result + 1).toString(),

                (result - 1).toString()

            ]),


        answer:
            result.toString()
    };
}


// =====================================================
// 🤖 GÉNÉRATEUR INTELLIGENT
// =====================================================
// Cette fonction demande à l'analyste quelle matière
// mérite davantage d'entraînement.
//
// Elle ne remplace pas encore les boutons Lecture
// et Maths : elle prépare simplement la décision.
// =====================================================

function generateAdaptiveQuestion() {

    const recommendedSubject =
        getRecommendedSubject();


    // ================================================
    // L'ANALYSTE RECOMMANDE LES MATHS
    // ================================================

    if (
        recommendedSubject === "Maths"
    ) {

        console.log(
            "🔎 Analyste → ✏️ Générateur : " +
            "priorité aux maths."
        );


        return generateMathQuestion();
    }


    // ================================================
    // L'ANALYSTE RECOMMANDE LA LECTURE
    // ================================================

    if (
        recommendedSubject === "Lecture"
    ) {

        console.log(
            "🔎 Analyste → ✏️ Générateur : " +
            "priorité à la lecture."
        );


        return generateReadingQuestion();
    }


    // ================================================
    // AUCUNE PRIORITÉ
    // ================================================

    const randomSubject =
        Math.random() < 0.5
            ? "Lecture"
            : "Maths";


    console.log(
        "✏️ Générateur : aucune difficulté " +
        "prioritaire détectée."
    );


    if (
        randomSubject === "Maths"
    ) {

        return generateMathQuestion();

    }


    return generateReadingQuestion();
}
