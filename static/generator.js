// =====================================================
// ✏️ AGENT GÉNÉRATEUR DE MAMA BINTA
// =====================================================
// Le générateur reçoit maintenant son plan du
// 🎯 Planificateur pédagogique.
//
// Le générateur ne choisit plus arbitrairement
// un niveau de difficulté.
//
// Il respecte le niveau décidé par le planificateur.
// =====================================================


// =====================================================
// 📚 MOTS POUR LA LECTURE
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
// 📖 GÉNÉRER UNE QUESTION DE LECTURE
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


    // Sécurité :
    // si aucune réponse correcte n'existe
    // pour une lettre, on recommence.

    if (
        correctWords.length === 0
    ) {

        return generateReadingQuestion();
    }


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
        ).slice(
            0,
            2
        );


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
// 🧮 GÉNÉRER UNE ADDITION DANS UNE ZONE
// =====================================================
// Exemple :
// niveau 1 → résultat entre 1 et 10
// niveau 2 → résultat entre 1 et 20
// niveau 3 → résultat entre 1 et 30
//
// Le résultat final est toujours contrôlé.
// =====================================================

function generateMathQuestion(
    minSum = 1,
    maxSum = 10
) {

    // ---------------------------------------------
    // Sécurité
    // ---------------------------------------------

    minSum =
        Math.max(
            1,
            Number(minSum)
        );


    maxSum =
        Math.max(
            minSum,
            Number(maxSum)
        );


    // ---------------------------------------------
    // Choisir le résultat cible
    // ---------------------------------------------

    const targetSum =
        Math.floor(
            Math.random() *
            (
                maxSum -
                minSum +
                1
            )
        ) +
        minSum;


    // ---------------------------------------------
    // Choisir le premier nombre
    // ---------------------------------------------
    //
    // On limite volontairement le premier nombre
    // afin d'obtenir des additions adaptées à un enfant.

    const a =
        Math.floor(
            Math.random() *
            (
                targetSum + 1
            )
        );


    // ---------------------------------------------
    // Calculer le deuxième nombre
    // ---------------------------------------------

    const b =
        targetSum - a;


    const result =
        a + b;


    // =================================================
    // ❌ MAUVAISES RÉPONSES
    // =================================================

    let wrong1 =
        result + 1;


    let wrong2 =
        result - 1;


    // ---------------------------------------------
    // Éviter une réponse négative
    // ---------------------------------------------

    if (
        wrong2 < 0
    ) {

        wrong2 =
            result + 2;
    }


    // ---------------------------------------------
    // Éviter les doublons
    // ---------------------------------------------

    if (
        wrong1 === result
    ) {

        wrong1 =
            result + 1;
    }


    if (
        wrong2 === result ||
        wrong2 === wrong1
    ) {

        wrong2 =
            result + 2;
    }


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
            result.toString(),

        // Informations internes utiles
        // aux futurs agents.

        subject:
            "Maths",

        levelMax:
            maxSum,

        targetSum:
            result
    };
}


// =====================================================
// 🎯 GÉNÉRER UNE QUESTION À PARTIR DU PLAN
// =====================================================

function generatePlannedMathQuestion(
    plan
) {

    if (
        !plan
    ) {

        return generateMathQuestion(
            1,
            10
        );
    }


    console.log(
        "🎯 Planificateur → Générateur"
    );


    console.log(
        "Niveau : " +
        plan.level
    );


    console.log(
        "Zone : " +
        plan.minSum +
        " → " +
        plan.maxSum
    );


    return generateMathQuestion(

        plan.minSum,

        plan.maxSum
    );
}


// =====================================================
// 🤖 GÉNÉRATEUR ADAPTATIF
// =====================================================
// C'est maintenant le point central.
//
// 1. Le planificateur décide.
// 2. Le générateur exécute.
// 3. La question respecte le niveau.
// =====================================================

function generateAdaptiveQuestion() {

    // =================================================
    // 🎯 DEMANDER LE PLAN
    // =================================================

    if (
        typeof getMathPlan !== "function"
    ) {

        console.log(
            "⚠️ Planificateur indisponible."
        );


        // Sécurité :
        // l'application peut quand même fonctionner.

        return generateMathQuestion(
            1,
            10
        );
    }


    const plan =
        getMathPlan();


    console.log(
        "🎯 Plan pédagogique :",
        plan
    );


    // =================================================
    // 🧮 LE PLAN DIT DE TRAVAILLER LES MATHS
    // =================================================

    if (
        plan &&
        plan.action !== "apprendre" &&
        typeof plan.level === "number"
    ) {

        return generatePlannedMathQuestion(
            plan
        );
    }


    // =================================================
    // 🌱 DÉBUT
    // =================================================

    if (
        plan &&
        plan.action === "apprendre"
    ) {

        return generatePlannedMathQuestion(
            plan
        );
    }


    // =================================================
    // 📖 POUR L'INSTANT :
    // SI LE PLANIFICATEUR NE DEMANDE PAS DE MATHS,
    // ON UTILISE LA LECTURE.
    // =================================================

    return generateReadingQuestion();
}
