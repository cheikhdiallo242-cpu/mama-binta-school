/*
==========================================================
✏️ MAMA BINTA — AGENT GÉNÉRATEUR
==========================================================

Rôle :
- créer les exercices
- respecter le niveau 1 → 100
- varier les exercices
- tenir compte des compétences faibles
- créer les sessions de 5 exercices

Compétences :

📖 reading
➕ addition
➖ subtraction
✖️ multiplication
🧠 comprehension

Le Générateur NE décide PAS du niveau.
Le Planificateur lui fournit le niveau.
==========================================================
*/


// ========================================================
// 📚 RESSOURCES DE LECTURE
// ========================================================

const READING_WORDS = [

    // 🏠 Maison
    { word: "Maison", emoji: "🏠", category: "maison" },
    { word: "Table", emoji: "🪑", category: "maison" },
    { word: "Chaise", emoji: "🪑", category: "maison" },
    { word: "Porte", emoji: "🚪", category: "maison" },
    { word: "Fenêtre", emoji: "🪟", category: "maison" },
    { word: "Lit", emoji: "🛏️", category: "maison" },
    { word: "Lampe", emoji: "💡", category: "maison" },

    // 🐾 Animaux
    { word: "Chat", emoji: "🐈", category: "animaux" },
    { word: "Chien", emoji: "🐕", category: "animaux" },
    { word: "Vache", emoji: "🐄", category: "animaux" },
    { word: "Poisson", emoji: "🐟", category: "animaux" },
    { word: "Oiseau", emoji: "🐦", category: "animaux" },
    { word: "Éléphant", emoji: "🐘", category: "animaux" },
    { word: "Girafe", emoji: "🦒", category: "animaux" },
    { word: "Zèbre", emoji: "🦓", category: "animaux" },
    { word: "Lion", emoji: "🦁", category: "animaux" },
    { word: "Koala", emoji: "🐨", category: "animaux" },
    { word: "Kangourou", emoji: "🦘", category: "animaux" },

    // 🌿 Nature
    { word: "Arbre", emoji: "🌳", category: "nature" },
    { word: "Fleur", emoji: "🌸", category: "nature" },
    { word: "Forêt", emoji: "🌲", category: "nature" },
    { word: "Soleil", emoji: "☀️", category: "nature" },
    { word: "Lune", emoji: "🌙", category: "nature" },
    { word: "Nuage", emoji: "☁️", category: "nature" },
    { word: "Pluie", emoji: "🌧️", category: "nature" },
    { word: "Étoile", emoji: "⭐", category: "nature" },
    { word: "Montagne", emoji: "⛰️", category: "nature" },

    // 🍎 Nourriture
    { word: "Pomme", emoji: "🍎", category: "nourriture" },
    { word: "Banane", emoji: "🍌", category: "nourriture" },
    { word: "Orange", emoji: "🍊", category: "nourriture" },
    { word: "Gâteau", emoji: "🍰", category: "nourriture" },
    { word: "Pain", emoji: "🍞", category: "nourriture" },
    { word: "Lait", emoji: "🥛", category: "nourriture" },
    { word: "Riz", emoji: "🍚", category: "nourriture" },
    { word: "Fromage", emoji: "🧀", category: "nourriture" },

    // 🏫 École
    { word: "École", emoji: "🏫", category: "école" },
    { word: "Livre", emoji: "📖", category: "école" },
    { word: "Stylo", emoji: "🖊️", category: "école" },
    { word: "Crayon", emoji: "✏️", category: "école" },
    { word: "Cahier", emoji: "📓", category: "école" },
    { word: "Règle", emoji: "📏", category: "école" },
    { word: "Sac", emoji: "🎒", category: "école" },

    // 🚗 Objets / transport
    { word: "Voiture", emoji: "🚗", category: "transport" },
    { word: "Moto", emoji: "🏍️", category: "transport" },
    { word: "Avion", emoji: "✈️", category: "transport" },
    { word: "Train", emoji: "🚆", category: "transport" },
    { word: "Vélo", emoji: "🚲", category: "transport" },
    { word: "Bateau", emoji: "🚢", category: "transport" },
    { word: "Wagon", emoji: "🚃", category: "transport" },

    // 🤖 Divers
    { word: "Robot", emoji: "🤖", category: "divers" },
    { word: "Ballon", emoji: "⚽", category: "divers" },
    { word: "Jouet", emoji: "🧸", category: "divers" },
    { word: "Drapeau", emoji: "🏳️", category: "divers" }
];


// ========================================================
// 🔤 LETTRES
// ========================================================

const READING_LETTERS = [

    "A", "B", "C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X",
    "Y", "Z"
];


// ========================================================
// 🔀 MÉLANGER
// ========================================================

function shuffle(arr) {

    return [...arr].sort(
        () => Math.random() - 0.5
    );
}


// ========================================================
// 🔤 PREMIÈRE LETTRE
// ========================================================

function firstLetter(word) {

    return word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .charAt(0)
        .toUpperCase();
}


// ========================================================
// 🧮 NIVEAU → DIFFICULTÉ
// ========================================================

function getDifficultyFromLevel(level) {

    const safeLevel =
        Math.max(
            1,
            Math.min(
                100,
                Number(level) || 1
            )
        );

    return safeLevel;
}


// ========================================================
// 📖 QUESTION DE LECTURE
// ========================================================

function generateReadingQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);


    // ----------------------------------------------------
    // NIVEAUX 1 → 20
    // Lettre → mot
    // ----------------------------------------------------

    if (safeLevel <= 20) {

        return generateLetterWordQuestion();
    }


    // ----------------------------------------------------
    // NIVEAUX 21 → 40
    // Mot → image / emoji
    // ----------------------------------------------------

    if (safeLevel <= 40) {

        return generateEmojiWordQuestion();
    }


    // ----------------------------------------------------
    // NIVEAUX 41 → 60
    // Mot à compléter
    // ----------------------------------------------------

    if (safeLevel <= 60) {

        return generateMissingLetterQuestion();
    }


    // ----------------------------------------------------
    // NIVEAUX 61 → 80
    // Choisir le bon mot dans une phrase
    // ----------------------------------------------------

    if (safeLevel <= 80) {

        return generateSentenceQuestion();
    }


    // ----------------------------------------------------
    // NIVEAUX 81 → 100
    // Compréhension de lecture
    // ----------------------------------------------------

    return generateReadingComprehensionQuestion();
}


// ========================================================
// 🔤 LETTRE → MOT
// ========================================================

function generateLetterWordQuestion() {

    const letter =
        READING_LETTERS[
            Math.floor(
                Math.random() *
                READING_LETTERS.length
            )
        ];


    const correctWords =
        READING_WORDS.filter(
            item =>
                firstLetter(item.word) === letter
        );


    const wrongWords =
        READING_WORDS.filter(
            item =>
                firstLetter(item.word) !== letter
        );


    if (
        correctWords.length === 0
    ) {

        return generateLetterWordQuestion();
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
                answer.word,
                ...wrongChoices.map(
                    item => item.word
                )
            ]),

        answer:
            answer.word,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "letter_word"
    };
}


// ========================================================
// 🖼️ EMOJI → MOT
// ========================================================

function generateEmojiWordQuestion() {

    const item =
        READING_WORDS[
            Math.floor(
                Math.random() *
                READING_WORDS.length
            )
        ];


    const wrongChoices =
        shuffle(
            READING_WORDS.filter(
                candidate =>
                    candidate.word !== item.word
            )
        ).slice(
            0,
            2
        );


    return {

        question:
            "Quel mot correspond à " +
            item.emoji +
            " ?",

        choices:
            shuffle([
                item.word,
                ...wrongChoices.map(
                    candidate =>
                        candidate.word
                )
            ]),

        answer:
            item.word,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "emoji_word"
    };
}


// ========================================================
// ✏️ MOT À COMPLÉTER
// ========================================================

function generateMissingLetterQuestion() {

    const item =
        READING_WORDS[
            Math.floor(
                Math.random() *
                READING_WORDS.length
            )
        ];


    const word =
        item.word;


    if (
        word.length < 3
    ) {

        return generateLetterWordQuestion();
    }


    const position =
        Math.floor(
            Math.random() *
            word.length
        );


    const missing =
        word.charAt(
            position
        );


    const displayed =
        word.substring(
            0,
            position
        ) +
        "_" +
        word.substring(
            position + 1
        );


    const wrongLetters =
        shuffle(
            READING_LETTERS.filter(
                letter =>
                    letter !==
                    firstLetter(missing)
            )
        ).slice(
            0,
            2
        );


    return {

        question:
            "Quelle lettre manque dans : " +
            displayed +
            " ?",

        choices:
            shuffle([
                missing.toUpperCase(),
                ...wrongLetters
            ]),

        answer:
            missing.toUpperCase(),

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "missing_letter"
    };
}


// ========================================================
// 📝 PHRASE SIMPLE
// ========================================================

function generateSentenceQuestion() {

    const sentences = [

        {
            sentence:
                "Le chat dort sur le tapis.",
            choices:
                ["chat", "soleil", "voiture"],
            answer:
                "chat"
        },

        {
            sentence:
                "La fille mange une pomme.",
            choices:
                ["pomme", "maison", "train"],
            answer:
                "pomme"
        },

        {
            sentence:
                "Le garçon va à l'école.",
            choices:
                ["école", "forêt", "bateau"],
            answer:
                "école"
        },

        {
            sentence:
                "Le chien court dans le jardin.",
            choices:
                ["chien", "livre", "lune"],
            answer:
                "chien"
        }
    ];


    const item =
        sentences[
            Math.floor(
                Math.random() *
                sentences.length
            )
        ];


    return {

        question:
            "Quel mot est important dans cette phrase ?\n\n" +
            item.sentence,

        choices:
            shuffle(
                item.choices
            ),

        answer:
            item.answer,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "sentence"
    };
}


// ========================================================
// 📖 COMPRÉHENSION DE LECTURE
// ========================================================

function generateReadingComprehensionQuestion() {

    const passages = [

        {
            text:
                "Awa a un petit chat. " +
                "Le chat aime dormir sous la table.",

            question:
                "Où le chat aime-t-il dormir ?",

            choices:
                [
                    "Sous la table",
                    "Dans la voiture",
                    "À l'école"
                ],

            answer:
                "Sous la table"
        },

        {
            text:
                "Moussa va au marché avec sa maman. " +
                "Ils achètent des pommes et des bananes.",

            question:
                "Qu'est-ce que Moussa achète ?",

            choices:
                [
                    "Des pommes et des bananes",
                    "Des chaussures",
                    "Des livres"
                ],

            answer:
                "Des pommes et des bananes"
        }
    ];


    const item =
        passages[
            Math.floor(
                Math.random() *
                passages.length
            )
        ];


    return {

        question:
            item.text +
            "\n\n" +
            item.question,

        choices:
            shuffle(
                item.choices
            ),

        answer:
            item.answer,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "reading_comprehension"
    };
}


// ========================================================
// 🧮 MÉMOIRE DES QUESTIONS RÉCENTES
// ========================================================

function getGeneratorMemory() {

    if (
        typeof loadStudentMemory === "function"
    ) {

        return loadStudentMemory();
    }


    if (
        typeof getStudentMemory === "function"
    ) {

        return getStudentMemory();
    }


    return null;
}


function getRecentResultsForSkill(
    skill
) {

    const memory =
        getGeneratorMemory();


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
            result.skill === skill
    );
}


// ========================================================
// 🔑 SIGNATURE MATHÉMATIQUE
// ========================================================

function getMathSignature(
    operator,
    a,
    b
) {

    return (
        operator +
        ":" +
        a +
        ":" +
        b
    );
}


// ========================================================
// 🔢 RÉPONSE FAUSSE
// ========================================================

function createWrongNumbers(
    result
) {

    const wrong = new Set();

    const offsets = [
        -2, -1, 1, 2, 3
    ];


    for (
        const offset
        of offsets
    ) {

        const value =
            result + offset;


        if (
            value >= 0 &&
            value !== result
        ) {

            wrong.add(value);
        }
    }


    while (
        wrong.size < 2
    ) {

        wrong.add(
            result +
            Math.floor(
                Math.random() * 5
            ) +
            1
        );
    }


    return [
        ...wrong
    ].slice(
        0,
        2
    );
}


// ========================================================
// ➕ ADDITION
// ========================================================

function generateAdditionQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);


    const maxNumber =
        Math.max(
            5,
            Math.min(
                100,
                safeLevel
            )
        );


    let a =
        Math.floor(
            Math.random() *
            (maxNumber + 1)
        );


    let b =
        Math.floor(
            Math.random() *
            (maxNumber + 1)
        );


    let result =
        a + b;


    // Éviter des nombres inutilement grands.

    if (
        result > 100
    ) {

        b =
            Math.max(
                0,
                100 - a
            );

        result =
            a + b;
    }


    if (
        a === 0 &&
        b === 0
    ) {

        b = 1;
        result = 1;
    }


    const wrong =
        createWrongNumbers(
            result
        );


    return {

        question:
            "Combien font " +
            a +
            " + " +
            b +
            " ?",

        choices:
            shuffle([
                String(result),
                ...wrong.map(
                    value =>
                        String(value)
                )
            ]),

        answer:
            String(result),

        skill:
            "addition",

        subject:
            "Maths",

        operator:
            "+",

        level:
            safeLevel
    };
}


// ========================================================
// ➖ SOUSTRACTION
// ========================================================

function generateSubtractionQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);


    const maxNumber =
        Math.max(
            5,
            Math.min(
                100,
                safeLevel
            )
        );


    let a =
        Math.floor(
            Math.random() *
            (maxNumber + 1)
        );


    let b =
        Math.floor(
            Math.random() *
            (a + 1)
        );


    if (
        a === 0
    ) {

        a = 1;
        b = 0;
    }


    const result =
        a - b;


    const wrong =
        createWrongNumbers(
            result
        );


    return {

        question:
            "Combien font " +
            a +
            " − " +
            b +
            " ?",

        choices:
            shuffle([
                String(result),
                ...wrong.map(
                    value =>
                        String(value)
                )
            ]),

        answer:
            String(result),

        skill:
            "subtraction",

        subject:
            "Maths",

        operator:
            "-",

        level:
            safeLevel
    };
}


// ========================================================
// ✖️ MULTIPLICATION
// ========================================================

function generateMultiplicationQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);


    /*
    Progression douce :

    niveaux 1-20  → tables 1-2
    niveaux 21-40 → tables 1-5
    niveaux 41-60 → tables 1-7
    niveaux 61-80 → tables 1-9
    niveaux 81-100 → nombres plus variés
    */

    let maxFactor;

    if (
        safeLevel <= 20
    ) {

        maxFactor = 2;

    } else if (
        safeLevel <= 40
    ) {

        maxFactor = 5;

    } else if (
        safeLevel <= 60
    ) {

        maxFactor = 7;

    } else {

        maxFactor = 10;
    }


    const a =
        Math.floor(
            Math.random() *
            maxFactor
        ) + 1;


    const b =
        Math.floor(
            Math.random() *
            maxFactor
        ) + 1;


    const result =
        a * b;


    const wrong =
        createWrongNumbers(
            result
        );


    return {

        question:
            "Combien font " +
            a +
            " × " +
            b +
            " ?",

        choices:
            shuffle([
                String(result),
                ...wrong.map(
                    value =>
                        String(value)
                )
            ]),

        answer:
            String(result),

        skill:
            "multiplication",

        subject:
            "Maths",

        operator:
            "×",

        level:
            safeLevel
    };
}


// ========================================================
// 🧠 COMPRÉHENSION
// ========================================================

function generateComprehensionQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);


    // -----------------------------------------------
    // Niveau débutant
    // -----------------------------------------------

    if (
        safeLevel <= 30
    ) {

        const questions = [

            {
                question:
                    "Si Awa a 2 pommes et reçoit 1 pomme, " +
                    "combien a-t-elle de pommes ?",

                choices:
                    ["2", "3", "4"],

                answer:
                    "3"
            },

            {
                question:
                    "Il fait très chaud et le soleil brille. " +
                    "Que peut-on voir dans le ciel ?",

                choices:
                    [
                    "Le soleil",
                    "Un poisson",
                    "Une chaussure"
                    ],

                answer:
                    "Le soleil"
            }
        ];


        const item =
            questions[
                Math.floor(
                    Math.random() *
                    questions.length
                )
            ];


        return {

            question:
                item.question,

            choices:
                shuffle(
                    item.choices
                ),

            answer:
                item.answer,

            skill:
                "comprehension",

            subject:
                "Compréhension",

            level:
                safeLevel
        };
    }


    // -----------------------------------------------
    // Niveau intermédiaire / avancé
    // -----------------------------------------------

    const questions = [

        {
            question:
                "Moussa avait 5 billes. " +
                "Il en donne 2 à son ami. " +
                "Combien lui en reste-t-il ?",

            choices:
                ["2", "3", "4"],

            answer:
                "3"
        },

        {
            question:
                "Awa se lève tôt pour aller à l'école. " +
                "Pourquoi se lève-t-elle tôt ?",

            choices:
                [
                    "Pour aller à l'école",
                    "Pour dormir toute la journée",
                    "Pour jouer dans la mer"
                ],

            answer:
                "Pour aller à l'école"
        },

        {
            question:
                "Un panier contient 4 oranges. " +
                "On ajoute 3 oranges. " +
                "Combien y en a-t-il maintenant ?",

            choices:
                ["6", "7", "8"],

            answer:
                "7"
        }
    ];


    const item =
        questions[
            Math.floor(
                Math.random() *
                questions.length
            )
        ];


    return {

        question:
            item.question,

        choices:
            shuffle(
                item.choices
            ),

        answer:
            item.answer,

        skill:
            "comprehension",

        subject:
            "Compréhension",

        level:
            safeLevel
    };
}


// ========================================================
// 🎯 CHOISIR UNE COMPÉTENCE
// ========================================================

function chooseSkillForSession(
    exerciseIndex,
    priority = []
) {

    /*
    Une session contient idéalement :

    1 → Lecture
    2 → Addition
    3 → Soustraction
    4 → Multiplication
    5 → Compréhension

    Mais si l'Analyste détecte une faiblesse,
    cette compétence peut être priorisée.
    */


    const defaultSkills = [

        "reading",
        "addition",
        "subtraction",
        "multiplication",
        "comprehension"
    ];


    const preferred =
        priority.filter(
            skill =>
                defaultSkills.includes(skill)
        );


    // Pour une session standard, on conserve
    // une compétence différente par exercice.

    if (
        exerciseIndex <
        preferred.length
    ) {

        return preferred[
            exerciseIndex
        ];
    }


    return defaultSkills[
        exerciseIndex %
        defaultSkills.length
    ];
}


// ========================================================
// 🧠 GÉNÉRER UN EXERCICE SELON LA COMPÉTENCE
// ========================================================

function generateExerciseBySkill(
    skill,
    level
) {

    switch (
        skill
    ) {

        case "reading":

            return generateReadingQuestion(
                level
            );


        case "addition":

            return generateAdditionQuestion(
                level
            );


        case "subtraction":

            return generateSubtractionQuestion(
                level
            );


        case "multiplication":

            return generateMultiplicationQuestion(
                level
            );


        case "comprehension":

            return generateComprehensionQuestion(
                level
            );


        default:

            return generateReadingQuestion(
                level
            );
    }
}


// ========================================================
// 📝 GÉNÉRER UNE SESSION DE 5 EXERCICES
// ========================================================

function generateLearningSession(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(
            level
        );


    let priority = [];


    if (
        typeof getPlannerPriority === "function"
    ) {

        priority =
            getPlannerPriority();
    }


    const exercises = [];


    for (
        let i = 0;
        i < SESSION_SIZE_GENERATOR;
        i++
    ) {

        const skill =
            chooseSkillForSession(
                i,
                priority
            );


        const exercise =
            generateExerciseBySkill(
                skill,
                safeLevel
            );


        exercise.sessionIndex =
            i + 1;


        exercise.sessionSize =
            SESSION_SIZE_GENERATOR;


        exercise.level =
            safeLevel;


        exercises.push(
            exercise
        );
    }


    return exercises;
}


// ========================================================
// 📦 TAILLE D'UNE SESSION
// ========================================================

const SESSION_SIZE_GENERATOR = 5;


// ========================================================
// 🎯 EXERCICE ADAPTATIF
// ========================================================

function generateAdaptiveQuestion() {

    let level = 1;


    if (
        typeof getPedagogicalLevel === "function"
    ) {

        level =
            getPedagogicalLevel();

    } else if (
        typeof getLearningPlan === "function"
    ) {

        const plan =
            getLearningPlan();

        if (
            plan &&
            plan.level
        ) {

            level =
                plan.level;
        }
    }


    /*
    Pour l'ancien index.html,
    cette fonction continue de renvoyer
    un seul exercice.

    Plus tard, le nouvel index.html
    utilisera generateLearningSession()
    pour gérer les 5 exercices.
    */

    const exercises =
        generateLearningSession(
            level
        );


    return exercises[0];
}


// ========================================================
// 🧮 COMPATIBILITÉ ANCIENNE : MATHS
// ========================================================

function generateMathQuestion(
    minSum = 1,
    maxSum = 10
) {

    const level =
        Math.max(
            1,
            Math.min(
                100,
                Number(maxSum) || 10
            )
        );


    return generateAdditionQuestion(
        level
    );
}


// ========================================================
// 🎯 COMPATIBILITÉ ANCIEN PLANIFICATEUR
// ========================================================

function generatePlannedMathQuestion(
    plan
) {

    if (
        !plan
    ) {

        return generateAdditionQuestion(
            1
        );
    }


    return generateAdditionQuestion(
        plan.level || 1
    );
}


// ========================================================
// 🧪 DIAGNOSTIC
// ========================================================

console.log(
    "✏️ Générateur Mama Binta chargé."
);

console.log(
    "📚 Compétences disponibles :",
    [
        "reading",
        "addition",
        "subtraction",
        "multiplication",
        "comprehension"
    ]
);

console.log(
    "📝 Taille d'une session :",
    SESSION_SIZE_GENERATOR
);
