// =====================================================
// ✏️ AGENT GÉNÉRATEUR DE MAMA BINTA
// =====================================================
// Le générateur consulte l'analyste pour savoir :
// 1. quelle matière travailler
// 2. quel niveau utiliser
// 3. quelle zone de difficulté travailler
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
// 🔀 MÉLANGER
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
// 🔎 RÉCUPÉRER L'ANALYSE
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
// 🧮 GÉNÉRER UN EXERCICE DE MATHS
// =====================================================

function generateMathQuestion(
    difficulty = "normal"
) {

    let minNumber;

    let maxNumber;


    // ---------------------------------------------
    // NIVEAU TRÈS SIMPLE
    // ---------------------------------------------

    if (
        difficulty === "tres_simple"
    ) {

        minNumber = 0;

        maxNumber = 5;
    }


    // ---------------------------------------------
    // NIVEAU SIMPLE
    // ---------------------------------------------

    else if (
        difficulty === "simple"
    ) {

        minNumber = 1;

        maxNumber = 10;
    }


    // ---------------------------------------------
    // NIVEAU NORMAL
    // ---------------------------------------------

    else if (
        difficulty === "normal"
    ) {

        minNumber = 2;

        maxNumber = 20;
    }


    // ---------------------------------------------
    // NIVEAU INTERMÉDIAIRE
    // ---------------------------------------------

    else if (
        difficulty === "intermediaire"
    ) {

        minNumber = 5;

        maxNumber = 30;
    }


    // ---------------------------------------------
    // NIVEAU DIFFICILE
    // ---------------------------------------------

    else if (
        difficulty === "difficile"
    ) {

        minNumber = 10;

        maxNumber = 50;
    }


    else {

        minNumber = 2;

        maxNumber = 20;
    }


    // =================================================
    // 🔢 CRÉER LES NOMBRES
    // =================================================

    const a =
        Math.floor(
            Math.random() *
            (
                maxNumber -
                minNumber +
                1
            )
        ) +
        minNumber;


    const b =
        Math.floor(
            Math.random() *
            (
                maxNumber -
                minNumber +
                1
            )
        ) +
        minNumber;


    const result =
        a + b;


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
// 🎯 GÉNÉRER AUTOUR D'UNE FRONTIÈRE
// =====================================================
// Exemple :
// Mama Binta réussit jusqu'à 20
// difficulté autour de 24
//
// Le générateur travaille autour de cette zone.
// =====================================================

function generateBoundaryMathQuestion(
    masteredSum,
    difficultySum
) {

    let lowerBound =
        Math.max(
            0,
            masteredSum - 3
        );


    let upperBound =
        difficultySum + 3;


    // Éviter une zone trop grande

    if (
        upperBound -
        lowerBound >
        15
    ) {

        upperBound =
            lowerBound + 15;
    }


    let targetSum =
        Math.floor(
            Math.random() *
            (
                upperBound -
                lowerBound +
                1
            )
        ) +
        lowerBound;


    // Éviter de refaire uniquement des additions
    // extrêmement faciles.

    if (
        targetSum < 2
    ) {

        targetSum = 2;
    }


    // ---------------------------------------------
    // Choisir le premier nombre
    // ---------------------------------------------

    let a =
        Math.floor(
            Math.random() *
            (
                Math.min(
                    targetSum,
                    20
                ) + 1
            )
        );


    // ---------------------------------------------
    // Deuxième nombre
    // ---------------------------------------------

    let b =
        targetSum - a;


    // Sécurité
    // Éviter un deuxième nombre négatif.

    if (
        b < 0
    ) {

        a = 0;

        b = targetSum;
    }


    const result =
        a + b;


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
// 🤖 GÉNÉRATEUR ADAPTATIF
// =====================================================

function generateAdaptiveQuestion() {

    const analysis =
        getAnalysis();


    // =================================================
    // 🛑 ANALYSTE INDISPONIBLE
    // =================================================

    if (!analysis) {

        console.log(
            "✏️ Générateur : analyste indisponible."
        );


        return generateMathQuestion(
            "normal"
        );
    }


    // =================================================
    // 🧮 MATHS
    // =================================================

    if (
        analysis.subject === "Maths"
    ) {

        // ---------------------------------------------
        // Nouvelle frontière détectée
        // ---------------------------------------------

        if (
            analysis.status === "frontière" &&
            analysis.highestCorrectSum > 0 &&
            analysis.lowestIncorrectSum !== null
        ) {

            console.log(
                "🎯 Générateur : travail autour de la frontière."
            );


            console.log(
                "✅ Niveau maîtrisé : " +
                analysis.highestCorrectSum
            );


            console.log(
                "⚠️ Difficulté autour de : " +
                analysis.lowestIncorrectSum
            );


            return generateBoundaryMathQuestion(

                analysis.highestCorrectSum,

                analysis.lowestIncorrectSum
            );
        }


        // ---------------------------------------------
        // Niveau recommandé par l'analyste
        // ---------------------------------------------

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


    // =================================================
    // 📖 LECTURE
    // =================================================

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
            (
                analysis.difficulty ||
                "normal"
            )
        );


        return generateReadingQuestion();
    }


    // =================================================
    // ⚖️ AUCUNE PRIORITÉ
    // =================================================

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
