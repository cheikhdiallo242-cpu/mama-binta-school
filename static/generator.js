// =====================================================
// ✏️ AGENT GÉNÉRATEUR DE MAMA BINTA
// =====================================================
// Le générateur reçoit son plan du
// 🎯 Planificateur pédagogique.
//
// Il doit :
// - respecter le niveau actuel
// - varier les additions
// - éviter les répétitions
// - éviter les inversions inutiles
// - produire des exercices adaptés
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
// 🧠 RÉCUPÉRER LES ADDITIONS RÉCENTES
// =====================================================

function getRecentMathQuestions() {

    if (
        typeof getStudentMemory !== "function"
    ) {

        return [];
    }


    const memory =
        getStudentMemory();


    if (
        !memory ||
        !Array.isArray(
            memory.recentResults
        )
    ) {

        return [];
    }


    return memory.recentResults.filter(
        result =>
            result.subject === "Maths"
    );
}


// =====================================================
// 🔑 CRÉER UNE SIGNATURE D'ADDITION
// =====================================================
// 1 + 4 et 4 + 1 auront la même signature :
// "1+4"
//
// Cela nous permet d'éviter les inversions inutiles.
// =====================================================

function getAdditionSignature(
    a,
    b
) {

    const first =
        Math.min(
            a,
            b
        );


    const second =
        Math.max(
            a,
            b
        );


    return (
        first +
        "+" +
        second
    );
}


// =====================================================
// 🧠 RÉCUPÉRER LES ADDITIONS DÉJÀ UTILISÉES
// =====================================================

function getRecentAdditionSignatures() {

    const recentQuestions =
        getRecentMathQuestions();


    const signatures =
        new Set();


    for (
        const result
        of recentQuestions
    ) {

        if (
            !result.question
        ) {
            continue;
        }


        const match =
            result.question.match(
                /Combien font (\d+) \+ (\d+)/
            );


        if (
            !match
        ) {
            continue;
        }


        const a =
            parseInt(
                match[1]
            );


        const b =
            parseInt(
                match[2]
            );


        signatures.add(
            getAdditionSignature(
                a,
                b
            )
        );
    }


    return signatures;
}


// =====================================================
// 🧮 CRÉER UNE ADDITION
// =====================================================

function createAddition(
    targetSum
) {

    // ---------------------------------------------
    // Choisir a
    // ---------------------------------------------

    const a =
        Math.floor(
            Math.random() *
            (
                targetSum + 1
            )
        );


    // ---------------------------------------------
    // Calculer b
    // ---------------------------------------------

    const b =
        targetSum - a;


    return {

        a: a,

        b: b,

        result:
            targetSum
    };
}


// =====================================================
// 🧮 GÉNÉRER UNE ADDITION VARIÉE
// =====================================================

function generateMathQuestion(
    minSum = 1,
    maxSum = 10
) {

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


    // =================================================
    // 🧠 MÉMOIRE DES QUESTIONS RÉCENTES
    // =================================================

    const recentSignatures =
        getRecentAdditionSignatures();


    // =================================================
    // 🎯 CRÉER PLUSIEURS CANDIDATS
    // =================================================
    //
    // On ne prend pas la première addition venue.
    // On crée plusieurs possibilités puis on choisit
    // une addition qui n'a pas été utilisée récemment.

    const candidates = [];


    for (
        let i = 0;
        i < 50;
        i++
    ) {

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


        const addition =
            createAddition(
                targetSum
            );


        const signature =
            getAdditionSignature(
                addition.a,
                addition.b
            );


        candidates.push({

            ...addition,

            signature: signature,

            wasRecent:
                recentSignatures.has(
                    signature
                )
        });
    }


    // =================================================
    // 🟢 PRIORITÉ AUX NOUVELLES ADDITIONS
    // =================================================

    let freshCandidates =
        candidates.filter(
            candidate =>
                !candidate.wasRecent
        );


    // =================================================
    // 🔄 SI TOUT EST DÉJÀ UTILISÉ
    // =================================================
    // On accepte alors une ancienne addition.
    //
    // Cela évite de bloquer le générateur.

    if (
        freshCandidates.length === 0
    ) {

        freshCandidates =
            candidates;
    }


    // =================================================
    // 🎯 CHOISIR UNE ADDITION
    // =================================================

    const selected =
        freshCandidates[
            Math.floor(
                Math.random() *
                freshCandidates.length
            )
        ];


    const a =
        selected.a;


    const b =
        selected.b;


    const result =
        selected.result;


    // =================================================
    // ❌ MAUVAISES RÉPONSES
    // =================================================

    let wrong1 =
        result + 1;


    let wrong2 =
        result - 1;


    if (
        wrong2 < 0
    ) {

        wrong2 =
            result + 2;
    }


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


    // =================================================
    // 📦 QUESTION FINALE
    // =================================================

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

        subject:
            "Maths",

        levelMax:
            maxSum,

        targetSum:
            result
    };
}


// =====================================================
// 🎯 GÉNÉRER SELON LE PLANIFICATEUR
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

function generateAdaptiveQuestion() {

    // =================================================
    // 🎯 VÉRIFIER LE PLANIFICATEUR
    // =================================================

    if (
        typeof getMathPlan !== "function"
    ) {

        console.log(
            "⚠️ Planificateur indisponible."
        );


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
    // 🧮 MATHS
    // =================================================

    if (
        plan &&
        typeof plan.level === "number"
    ) {

        return generatePlannedMathQuestion(
            plan
        );
    }


    // =================================================
    // 📖 LECTURE
    // =================================================

    return generateReadingQuestion();
}
