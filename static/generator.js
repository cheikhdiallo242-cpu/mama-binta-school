/*
==========================================================
✏️ MAMA BINTA — AGENT GÉNÉRATEUR v2
==========================================================

Rôle :
- créer les exercices
- respecter le niveau 1 → 100
- varier les exercices
- éviter les répétitions
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
    { word: "Maison", emoji: "🏡", category: "maison" },
    { word: "Clé", emoji: "🔑", category: "maison" },

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
    { word: "Poule", emoji: "🐔", category: "animaux" },
    { word: "Mouton", emoji: "🐑", category: "animaux" },
    { word: "Cheval", emoji: "🐎", category: "animaux" },
    { word: "Papillon", emoji: "🦋", category: "animaux" },
    { word: "Abeille", emoji: "🐝", category: "animaux" },

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
    { word: "Mer", emoji: "🌊", category: "nature" },
    { word: "Feuille", emoji: "🍃", category: "nature" },

    // 🍎 Nourriture
    { word: "Pomme", emoji: "🍎", category: "nourriture" },
    { word: "Banane", emoji: "🍌", category: "nourriture" },
    { word: "Orange", emoji: "🍊", category: "nourriture" },
    { word: "Gâteau", emoji: "🍰", category: "nourriture" },
    { word: "Pain", emoji: "🍞", category: "nourriture" },
    { word: "Lait", emoji: "🥛", category: "nourriture" },
    { word: "Riz", emoji: "🍚", category: "nourriture" },
    { word: "Fromage", emoji: "🧀", category: "nourriture" },
    { word: "Mangue", emoji: "🥭", category: "nourriture" },
    { word: "Fraise", emoji: "🍓", category: "nourriture" },
    { word: "Pastèque", emoji: "🍉", category: "nourriture" },

    // 🏫 École
    { word: "École", emoji: "🏫", category: "école" },
    { word: "Livre", emoji: "📖", category: "école" },
    { word: "Stylo", emoji: "🖊️", category: "école" },
    { word: "Crayon", emoji: "✏️", category: "école" },
    { word: "Cahier", emoji: "📓", category: "école" },
    { word: "Règle", emoji: "📏", category: "école" },
    { word: "Sac", emoji: "🎒", category: "école" },
    { word: "Gomme", emoji: "🧽", category: "école" },

    // 🚗 Transport
    { word: "Voiture", emoji: "🚗", category: "transport" },
    { word: "Moto", emoji: "🏍️", category: "transport" },
    { word: "Avion", emoji: "✈️", category: "transport" },
    { word: "Train", emoji: "🚆", category: "transport" },
    { word: "Vélo", emoji: "🚲", category: "transport" },
    { word: "Bateau", emoji: "🚢", category: "transport" },
    { word: "Bus", emoji: "🚌", category: "transport" },

    // ⚽ Jeux / objets
    { word: "Ballon", emoji: "⚽", category: "jeu" },
    { word: "Balle", emoji: "🥎", category: "jeu" },
    { word: "Jouet", emoji: "🧸", category: "jeu" },
    { word: "Poupée", emoji: "🪆", category: "jeu" },
    { word: "Robot", emoji: "🤖", category: "divers" },
    { word: "Drapeau", emoji: "🏳️", category: "divers" },
    { word: "Téléphone", emoji: "📱", category: "divers" },
    { word: "Horloge", emoji: "🕐", category: "divers" }
];


// ========================================================
// 👧🏾 PRÉNOMS
// ========================================================

const MAMA_BINTA_NAMES = [

    "Olga",
    "Diatta",
    "Daba",
    "Papa Baba",
    "Sandrine",
    "Mamadou",
    "Maty",
    "Ndické",
    "Awa",
    "Moussa",
    "Fatou",
    "Ibrahima",
    "Sali",
    "Oumar",
    "Astou",
    "Binta",
    "Ali",
    "Mariama",
    "Cheikh",
    "Aminata"
];


// ========================================================
// 🏪 CONTEXTES
// ========================================================

const MAMA_BINTA_CONTEXTS = [

    "à l'école",
    "à la maison",
    "au marché",
    "dans le jardin",
    "dans la cour",
    "au terrain",
    "dans la classe",
    "près de la maison",
    "au village",
    "dans le quartier"
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
// 🔀 OUTILS
// ========================================================

function shuffle(arr) {

    return [...arr].sort(
        () => Math.random() - 0.5
    );
}


function randomItem(arr) {

    return arr[
        Math.floor(
            Math.random() * arr.length
        )
    ];
}


function firstLetter(word) {

    return word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .charAt(0)
        .toUpperCase();
}


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


function randomInt(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}


// ========================================================
// 🧠 MÉMOIRE DES QUESTIONS DU GÉNÉRATEUR
// ========================================================

const GENERATOR_HISTORY_KEY =
    "mamaBintaQuestionHistory";


function getGeneratorHistory() {

    try {

        const data =
            localStorage.getItem(
                GENERATOR_HISTORY_KEY
            );

        if (!data) {
            return [];
        }

        const parsed =
            JSON.parse(data);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.warn(
            "⚠️ Impossible de lire l'historique du générateur.",
            error
        );

        return [];
    }
}


function saveGeneratorHistory(history) {

    try {

        localStorage.setItem(
            GENERATOR_HISTORY_KEY,
            JSON.stringify(
                history.slice(-80)
            )
        );

    } catch (error) {

        console.warn(
            "⚠️ Impossible de sauvegarder l'historique du générateur.",
            error
        );
    }
}


function wasRecentlyUsed(signature) {

    return getGeneratorHistory()
        .includes(signature);
}


function rememberGeneratedQuestion(
    question
) {

    if (!question) {
        return;
    }

    const signature =
        question.signature ||
        question.question;

    if (!signature) {
        return;
    }

    const history =
        getGeneratorHistory();

    const updated =
        history.filter(
            item =>
                item !== signature
        );

    updated.push(signature);

    saveGeneratorHistory(updated);
}


function clearGeneratorHistory() {

    try {

        localStorage.removeItem(
            GENERATOR_HISTORY_KEY
        );

    } catch (error) {

        console.warn(error);
    }
}


// ========================================================
// 🧠 FINALISER UNE QUESTION
// ========================================================

function finalizeGeneratedQuestion(
    question
) {

    if (!question) {
        return question;
    }

    if (!question.signature) {

        question.signature =
            question.skill +
            "|" +
            question.question;
    }

    rememberGeneratedQuestion(
        question
    );

    return question;
}


// ========================================================
// 📖 LECTURE
// ========================================================

function generateReadingQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);

    let question;

    if (safeLevel <= 20) {

        question =
            generateLetterWordQuestion();

    } else if (safeLevel <= 40) {

        question =
            generateEmojiWordQuestion();

    } else if (safeLevel <= 60) {

        question =
            generateMissingLetterQuestion();

    } else if (safeLevel <= 80) {

        question =
            generateSentenceQuestion();

    } else {

        question =
            generateReadingComprehensionQuestion();
    }

    return getUniqueQuestion(
        question,
        () => generateReadingQuestion(safeLevel)
    );
}


// ========================================================
// 🔤 LETTRE → MOT
// ========================================================

function generateLetterWordQuestion() {

    const letter =
        randomItem(
            READING_LETTERS
        );

    const correctWords =
        READING_WORDS.filter(
            item =>
                firstLetter(item.word) === letter
        );

    if (!correctWords.length) {

        return generateLetterWordQuestion();
    }

    const answer =
        randomItem(
            correctWords
        );

    const wrongWords =
        shuffle(
            READING_WORDS.filter(
                item =>
                    item.word !== answer.word
            )
        ).slice(0, 2);

    return finalizeGeneratedQuestion({

        question:
            "Quel mot commence par la lettre " +
            letter +
            " ?",

        choices:
            shuffle([
                answer.word,
                ...wrongWords.map(
                    item => item.word
                )
            ]),

        answer:
            answer.word,

        answerDisplay:
            answer.word +
            " " +
            answer.emoji,

        answerEmoji:
            answer.emoji,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "letter_word",

        signature:
            "reading-letter|" +
            letter +
            "|" +
            answer.word
    });
}


// ========================================================
// 🖼️ EMOJI → MOT
// ========================================================

function generateEmojiWordQuestion() {

    const item =
        randomItem(
            READING_WORDS
        );

    const wrongChoices =
        shuffle(
            READING_WORDS.filter(
                candidate =>
                    candidate.word !== item.word
            )
        ).slice(0, 2);

    return finalizeGeneratedQuestion({

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

        answerDisplay:
            item.word +
            " " +
            item.emoji,

        answerEmoji:
            item.emoji,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "emoji_word",

        signature:
            "reading-emoji|" +
            item.word +
            "|" +
            item.emoji
    });
}


// ========================================================
// ✏️ MOT À COMPLÉTER
// ========================================================

function generateMissingLetterQuestion() {

    const item =
        randomItem(
            READING_WORDS
        );

    const word =
        item.word;

    if (word.length < 3) {

        return generateLetterWordQuestion();
    }

    const position =
        randomInt(
            0,
            word.length - 1
        );

    const missing =
        word.charAt(
            position
        ).toUpperCase();

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
                    letter !== missing
            )
        ).slice(0, 2);

    return finalizeGeneratedQuestion({

        question:
            "Quelle lettre manque dans : " +
            displayed +
            " ?",

        choices:
            shuffle([
                missing,
                ...wrongLetters
            ]),

        answer:
            missing,

        answerDisplay:
            missing +
            " → " +
            word +
            " " +
            item.emoji,

        answerEmoji:
            item.emoji,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "missing_letter",

        signature:
            "reading-missing|" +
            word +
            "|" +
            position
    });
}


// ========================================================
// 📝 PHRASES DE LECTURE
// ========================================================

const READING_SENTENCES = [

    {
        sentence: "Le chat dort sur le tapis.",
        answer: "chat",
        choices: ["chat", "train", "soleil"]
    },

    {
        sentence: "Olga porte son sac pour aller à l'école.",
        answer: "sac",
        choices: ["sac", "poisson", "voiture"]
    },

    {
        sentence: "Mamadou mange une mangue bien mûre.",
        answer: "mangue",
        choices: ["mangue", "chaise", "avion"]
    },

    {
        sentence: "Daba joue avec une balle dans la cour.",
        answer: "balle",
        choices: ["balle", "livre", "lune"]
    },

    {
        sentence: "Sandrine lit un livre dans sa chambre.",
        answer: "livre",
        choices: ["livre", "chien", "vélo"]
    },

    {
        sentence: "Papa Baba regarde les poules dans le jardin.",
        answer: "poules",
        choices: ["poules", "bateau", "crayon"]
    },

    {
        sentence: "Maty écrit avec un crayon.",
        answer: "crayon",
        choices: ["crayon", "chat", "maison"]
    },

    {
        sentence: "Ndické regarde les étoiles dans le ciel.",
        answer: "étoiles",
        choices: ["étoiles", "chaise", "pomme"]
    },

    {
        sentence: "Diatta prend le bus pour aller à l'école.",
        answer: "bus",
        choices: ["bus", "mouton", "gâteau"]
    },

    {
        sentence: "Awa arrose une fleur dans le jardin.",
        answer: "fleur",
        choices: ["fleur", "train", "stylo"]
    },

    {
        sentence: "Moussa fait du vélo dans la cour.",
        answer: "vélo",
        choices: ["vélo", "livre", "orange"]
    }
];


function generateSentenceQuestion() {

    const item =
        randomItem(
            READING_SENTENCES
        );

    return finalizeGeneratedQuestion({

        question:
            "Quel mot est important dans cette phrase ?\n\n" +
            item.sentence,

        choices:
            shuffle(
                item.choices
            ),

        answer:
            item.answer,

        answerDisplay:
            item.answer,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "sentence",

        signature:
            "reading-sentence|" +
            item.sentence
    });
}


// ========================================================
// 📖 COMPRÉHENSION DE LECTURE
// ========================================================

const READING_PASSAGES = [

    {
        text:
            "Olga a un petit chat. " +
            "Chaque matin, elle lui donne à manger. " +
            "Le chat aime ensuite dormir près de la fenêtre.",

        question:
            "Où le chat aime-t-il dormir ?",

        choices:
            [
                "Près de la fenêtre",
                "Dans le bus",
                "Au marché"
            ],

        answer:
            "Près de la fenêtre"
    },

    {
        text:
            "Mamadou va au marché avec Daba. " +
            "Ils achètent des mangues, des oranges et du pain.",

        question:
            "Qu'achètent Mamadou et Daba ?",

        choices:
            [
                "Des mangues, des oranges et du pain",
                "Des cahiers et des crayons",
                "Des chaussures"
            ],

        answer:
            "Des mangues, des oranges et du pain"
    },

    {
        text:
            "Sandrine prépare son sac avant de partir à l'école. " +
            "Elle met un cahier, un livre et deux crayons.",

        question:
            "Que met Sandrine dans son sac ?",

        choices:
            [
                "Un cahier, un livre et deux crayons",
                "Une balle et un ballon",
                "Une pomme et une orange"
            ],

        answer:
            "Un cahier, un livre et deux crayons"
    },

    {
        text:
            "Papa Baba possède quelques poules. " +
            "Chaque soir, il vérifie qu'elles sont bien rentrées " +
            "dans leur abri.",

        question:
            "Que fait Papa Baba chaque soir ?",

        choices:
            [
                "Il vérifie ses poules",
                "Il prend le train",
                "Il va nager"
            ],

        answer:
            "Il vérifie ses poules"
    },

    {
        text:
            "Maty trouve un livre dans la classe. " +
            "Elle le donne à la maîtresse afin qu'il soit rendu " +
            "à son propriétaire.",

        question:
            "Que fait Maty avec le livre ?",

        choices:
            [
                "Elle le donne à la maîtresse",
                "Elle le jette",
                "Elle le mange"
            ],

        answer:
            "Elle le donne à la maîtresse"
    },

    {
        text:
            "Ndické regarde le ciel après la pluie. " +
            "Elle voit des nuages et un grand arc-en-ciel.",

        question:
            "Que voit Ndické dans le ciel ?",

        choices:
            [
                "Des nuages et un arc-en-ciel",
                "Des poissons",
                "Des voitures"
            ],

        answer:
            "Des nuages et un arc-en-ciel"
    }
];


function generateReadingComprehensionQuestion() {

    const item =
        randomItem(
            READING_PASSAGES
        );

    return finalizeGeneratedQuestion({

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

        answerDisplay:
            item.answer,

        skill:
            "reading",

        subject:
            "Lecture",

        levelType:
            "reading_comprehension",

        signature:
            "reading-passage|" +
            item.text +
            "|" +
            item.question
    });
}


// ========================================================
// 🧠 MÉMOIRE DES RÉSULTATS
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
// 🔢 RÉPONSES FAUSSES
// ========================================================

function createWrongNumbers(
    result
) {

    const wrong =
        new Set();

    const offsets = [
        -3,
        -2,
        -1,
        1,
        2,
        3
    ];

    shuffle(
        offsets
    ).forEach(
        offset => {

            const value =
                result + offset;

            if (
                value >= 0 &&
                value !== result
            ) {

                wrong.add(value);
            }
        }
    );

    let attempts = 0;

    while (
        wrong.size < 2 &&
        attempts < 20
    ) {

        const value =
            result +
            randomInt(
                1,
                6
            );

        if (
            value !== result
        ) {

            wrong.add(value);
        }

        attempts++;
    }

    return [
        ...wrong
    ].slice(0, 2);
}


// ========================================================
// ➕ ADDITION
// ========================================================

const ADDITION_TEMPLATES = [

    (name, a, b, item) =>
        `${name} a ${a} ${item.word}. ` +
        `Il/Elle en reçoit ${b}. Combien en a-t-il/elle maintenant ?`,

    (name, a, b, item) =>
        `${name} possède ${a} ${item.word}. ` +
        `Il/Elle achète encore ${b}. Combien en possède-t-il/elle ?`,

    (name, a, b, item) =>
        `${name} trouve ${a} ${item.word} ` +
        `et en trouve encore ${b}. Combien en a-t-il/elle en tout ?`,

    (name, a, b, item) =>
        `Dans ${name}'s panier, il y a ${a} ${item.word}. ` +
        `On ajoute ${b}. Combien y en a-t-il maintenant ?`,

    (name, a, b, item) =>
        `${name} a ${a} ${item.word} ${item.emoji}. ` +
        `${b} autres arrivent. Combien y en a-t-il en tout ?`
];


function getAdditionMax(level) {

    if (level <= 10) return 5;
    if (level <= 20) return 10;
    if (level <= 30) return 15;
    if (level <= 40) return 20;
    if (level <= 50) return 30;
    if (level <= 60) return 40;
    if (level <= 70) return 50;
    if (level <= 80) return 70;
    if (level <= 90) return 90;

    return 100;
}


function generateAdditionQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);

    const max =
        getAdditionMax(
            safeLevel
        );

    const useStory =
        Math.random() < 0.55;

    let a =
        randomInt(
            1,
            Math.max(
                2,
                Math.floor(max * 0.7)
            )
        );

    let b =
        randomInt(
            1,
            Math.max(
                2,
                Math.min(
                    max - a,
                    Math.ceil(max * 0.4)
                )
            )
        );

    if (
        a + b > max
    ) {

        b =
            Math.max(
                1,
                max - a
            );
    }

    const result =
        a + b;

    const wrong =
        createWrongNumbers(
            result
        );

    let questionText;

    let answerDisplay =
        String(result);

    let signature;

    if (useStory) {

        const name =
            randomItem(
                MAMA_BINTA_NAMES
            );

        const item =
            randomItem(
                READING_WORDS
            );

        const template =
            randomItem(
                ADDITION_TEMPLATES
            );

        questionText =
            template(
                name,
                a,
                b,
                item
            );

        answerDisplay =
            String(result) +
            " " +
            item.emoji;

        signature =
            "addition-story|" +
            name +
            "|" +
            a +
            "|" +
            b +
            "|" +
            item.word +
            "|" +
            template.toString();

    } else {

        const forms = [

            `Combien font ${a} + ${b} ?`,

            `Calcule : ${a} + ${b} = ?`,

            `Quel est le résultat de ${a} + ${b} ?`,

            `Ajoute ${a} et ${b}. Combien obtiens-tu ?`
        ];

        questionText =
            randomItem(
                forms
            );

        signature =
            "addition-number|" +
            a +
            "|" +
            b +
            "|" +
            questionText;
    }

    return getUniqueQuestion(

        finalizeGeneratedQuestion({

            question:
                questionText,

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

            answerDisplay:
                answerDisplay,

            skill:
                "addition",

            subject:
                "Maths",

            operator:
                "+",

            level:
                safeLevel,

            signature:
                signature
        }),

        () =>
            generateAdditionQuestion(
                safeLevel
            )
    );
}


// ========================================================
// ➖ SOUSTRACTION
// ========================================================

const SUBTRACTION_TEMPLATES = [

    (name, a, b, item) =>
        `${name} a ${a} ${item.word}. ` +
        `Il/Elle en donne ${b}. Combien lui en reste-t-il ?`,

    (name, a, b, item) =>
        `${name} possède ${a} ${item.word}. ` +
        `Il/Elle perd ${b}. Combien en reste-t-il ?`,

    (name, a, b, item) =>
        `Il y a ${a} ${item.word} ${item.emoji}. ` +
        `On en retire ${b}. Combien en reste-t-il ?`,

    (name, a, b, item) =>
        `${name} avait ${a} ${item.word}. ` +
        `Il/Elle en utilise ${b}. Combien en reste-t-il ?`
];


function getSubtractionMax(level) {

    if (level <= 10) return 5;
    if (level <= 20) return 10;
    if (level <= 30) return 15;
    if (level <= 40) return 20;
    if (level <= 50) return 30;
    if (level <= 60) return 40;
    if (level <= 70) return 50;
    if (level <= 80) return 70;
    if (level <= 90) return 90;

    return 100;
}


function generateSubtractionQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);

    const max =
        getSubtractionMax(
            safeLevel
        );

    let a =
        randomInt(
            2,
            max
        );

    let b =
        randomInt(
            1,
            Math.max(
                1,
                a - 1
            )
        );

    const result =
        a - b;

    const wrong =
        createWrongNumbers(
            result
        );

    const useStory =
        Math.random() < 0.55;

    let questionText;
    let answerDisplay =
        String(result);
    let signature;

    if (useStory) {

        const name =
            randomItem(
                MAMA_BINTA_NAMES
            );

        const item =
            randomItem(
                READING_WORDS
            );

        const template =
            randomItem(
                SUBTRACTION_TEMPLATES
            );

        questionText =
            template(
                name,
                a,
                b,
                item
            );

        answerDisplay =
            String(result) +
            " " +
            item.emoji;

        signature =
            "subtraction-story|" +
            name +
            "|" +
            a +
            "|" +
            b +
            "|" +
            item.word +
            "|" +
            template.toString();

    } else {

        const forms = [

            `Combien font ${a} − ${b} ?`,

            `Calcule : ${a} − ${b} = ?`,

            `Quel est le résultat de ${a} − ${b} ?`,

            `Retire ${b} de ${a}. Combien reste-t-il ?`
        ];

        questionText =
            randomItem(
                forms
            );

        signature =
            "subtraction-number|" +
            a +
            "|" +
            b +
            "|" +
            questionText;
    }

    return getUniqueQuestion(

        finalizeGeneratedQuestion({

            question:
                questionText,

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

            answerDisplay:
                answerDisplay,

            skill:
                "subtraction",

            subject:
                "Maths",

            operator:
                "-",

            level:
                safeLevel,

            signature:
                signature
        }),

        () =>
            generateSubtractionQuestion(
                safeLevel
            )
    );
}


// ========================================================
// ✖️ MULTIPLICATION
// ========================================================

function generateMultiplicationQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);

    let maxFactor;

    if (safeLevel <= 20) {

        maxFactor = 2;

    } else if (safeLevel <= 40) {

        maxFactor = 5;

    } else if (safeLevel <= 60) {

        maxFactor = 7;

    } else if (safeLevel <= 80) {

        maxFactor = 9;

    } else {

        maxFactor = 12;
    }

    const a =
        randomInt(
            1,
            maxFactor
        );

    const b =
        randomInt(
            1,
            maxFactor
        );

    const result =
        a * b;

    const wrong =
        createWrongNumbers(
            result
        );

    const forms = [

        `Combien font ${a} × ${b} ?`,

        `Calcule : ${a} × ${b} = ?`,

        `Quel est le résultat de ${a} × ${b} ?`,

        `Combien obtient-on en multipliant ${a} par ${b} ?`
    ];

    const questionText =
        randomItem(
            forms
        );

    return getUniqueQuestion(

        finalizeGeneratedQuestion({

            question:
                questionText,

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

            answerDisplay:
                String(result),

            skill:
                "multiplication",

            subject:
                "Maths",

            operator:
                "×",

            level:
                safeLevel,

            signature:
                "multiplication|" +
                a +
                "|" +
                b +
                "|" +
                questionText
        }),

        () =>
            generateMultiplicationQuestion(
                safeLevel
            )
    );
}


// ========================================================
// 🧠 COMPRÉHENSION — RÉSERVOIR LARGE
// ========================================================

const COMPREHENSION_QUESTIONS = [

    {
        question:
            "Olga a 3 pommes 🍎 et reçoit 2 pommes. " +
            "Combien a-t-elle de pommes maintenant ?",

        choices:
            ["4", "5", "6"],

        answer:
            "5"
    },

    {
        question:
            "Mamadou possède 7 mangues 🥭. " +
            "Il donne 2 mangues à Daba. " +
            "Combien lui en reste-t-il ?",

        choices:
            ["4", "5", "6"],

        answer:
            "5"
    },

    {
        question:
            "Sandrine a 5 crayons ✏️. " +
            "Maty lui donne 4 crayons. " +
            "Combien en a-t-elle maintenant ?",

        choices:
            ["8", "9", "10"],

        answer:
            "9"
    },

    {
        question:
            "Papa Baba a 6 poules 🐔. " +
            "2 autres arrivent. " +
            "Combien y a-t-il de poules en tout ?",

        choices:
            ["7", "8", "9"],

        answer:
            "8"
    },

    {
        question:
            "Olga a 1 chat 🐈 et une balle 🥎. " +
            "Combien d'objets possède-t-elle ?",

        choices:
            ["1", "2", "3"],

        answer:
            "2"
    },

    {
        question:
            "Diatta a 4 livres 📚. " +
            "Elle en prête 1 à Sandrine. " +
            "Combien de livres lui reste-t-il ?",

        choices:
            ["2", "3", "4"],

        answer:
            "3"
    },

    {
        question:
            "Maty voit un chien 🐕 près de la maison. " +
            "Quel animal voit-elle ?",

        choices:
            [
                "Un chien",
                "Un poisson",
                "Une poule"
            ],

        answer:
            "Un chien"
    },

    {
        question:
            "Le ciel est couvert de nuages ☁️ " +
            "et la pluie commence à tomber. " +
            "Quel temps fait-il ?",

        choices:
            [
                "Il pleut",
                "Il neige",
                "Il fait très chaud"
            ],

        answer:
            "Il pleut"
    },

    {
        question:
            "Moussa prend son sac 🎒 et se dirige vers l'école 🏫. " +
            "Où va Moussa ?",

        choices:
            [
                "À l'école",
                "À la plage",
                "Au marché"
            ],

        answer:
            "À l'école"
    },

    {
        question:
            "Ndické a 8 fleurs 🌸. " +
            "Elle en offre 3 à sa maman. " +
            "Combien lui en reste-t-il ?",

        choices:
            ["4", "5", "6"],

        answer:
            "5"
    },

    {
        question:
            "Awa a 2 livres 📖 et trouve 3 autres livres. " +
            "Combien a-t-elle de livres ?",

        choices:
            ["4", "5", "6"],

        answer:
            "5"
    },

    {
        question:
            "Cheikh a 4 ballons ⚽ et en donne 2 à Mamadou. " +
            "Combien de ballons garde-t-il ?",

        choices:
            ["1", "2", "3"],

        answer:
            "2"
    },

    {
        question:
            "Un poisson 🐟 vit dans l'eau. " +
            "Où vit le poisson ?",

        choices:
            [
                "Dans l'eau",
                "Dans un arbre",
                "Dans une voiture"
            ],

        answer:
            "Dans l'eau"
    },

    {
        question:
            "Une abeille 🐝 visite une fleur 🌸. " +
            "Qu'est-ce qu'elle visite ?",

        choices:
            [
                "Une fleur",
                "Une maison",
                "Une école"
            ],

        answer:
            "Une fleur"
    },

    {
        question:
            "Il fait nuit et la lune 🌙 est visible. " +
            "Quel moment de la journée est-ce ?",

        choices:
            [
                "La nuit",
                "Le matin",
                "L'après-midi"
            ],

        answer:
            "La nuit"
    },

    {
        question:
            "Mamadou prend un vélo 🚲 pour se déplacer. " +
            "Quel moyen de transport utilise-t-il ?",

        choices:
            [
                "Un vélo",
                "Un bateau",
                "Un avion"
            ],

        answer:
            "Un vélo"
    }
];


function generateComprehensionQuestion(
    level = 1
) {

    const safeLevel =
        getDifficultyFromLevel(level);

    let item =
        randomItem(
            COMPREHENSION_QUESTIONS
        );

    return getUniqueQuestion(

        finalizeGeneratedQuestion({

            question:
                item.question,

            choices:
                shuffle(
                    item.choices
                ),

            answer:
                item.answer,

            answerDisplay:
                item.answer,

            skill:
                "comprehension",

            subject:
                "Compréhension",

            level:
                safeLevel,

            signature:
                "comprehension|" +
                item.question
        }),

        () =>
            generateComprehensionQuestion(
                safeLevel
            )
    );
}


// ========================================================
// 🚫 ÉVITER UNE QUESTION RÉCENTE
// ========================================================

function getUniqueQuestion(
    question,
    generatorFunction
) {

    if (!question) {
        return question;
    }

    if (
        !wasRecentlyUsed(
            question.signature
        )
    ) {

        return question;
    }

    /*
    On essaie plusieurs fois de trouver
    une autre question.
    */

    for (
        let attempt = 0;
        attempt < 8;
        attempt++
    ) {

        const alternative =
            generatorFunction();

        if (
            alternative &&
            !wasRecentlyUsed(
                alternative.signature
            )
        ) {

            return alternative;
        }
    }

    /*
    Si tout le petit réservoir disponible
    a récemment été utilisé, on accepte
    finalement une question plutôt que
    de bloquer l'application.
    */

    return question;
}


// ========================================================
// 🎯 CHOISIR UNE COMPÉTENCE
// ========================================================

function chooseSkillForSession(
    exerciseIndex,
    priority = []
) {

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
                defaultSkills.includes(
                    skill
                )
        );

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
// 🧠 GÉNÉRER SELON LA COMPÉTENCE
// ========================================================

function generateExerciseBySkill(
    skill,
    level
) {

    switch (skill) {

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
// 📝 SESSION DE 5 EXERCICES
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
        typeof getPlannerPriority ===
        "function"
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
// 📦 TAILLE SESSION
// ========================================================

const SESSION_SIZE_GENERATOR = 5;


// ========================================================
// 🎯 EXERCICE ADAPTATIF
// ========================================================

function generateAdaptiveQuestion() {

    let level = 1;

    if (
        typeof getPedagogicalLevel ===
        "function"
    ) {

        level =
            getPedagogicalLevel();

    } else if (
        typeof getLearningPlan ===
        "function"
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

    const exercises =
        generateLearningSession(
            level
        );

    return exercises[0];
}


// ========================================================
// 🧮 COMPATIBILITÉ ANCIENNE
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

    if (!plan) {

        return generateAdditionQuestion(
            1
        );
    }

    return generateAdditionQuestion(
        plan.level || 1
    );
}


// ========================================================
// 🧹 RÉINITIALISATION
// ========================================================

function resetGeneratorHistory() {

    clearGeneratorHistory();

    console.log(
        "🧹 Historique des questions du générateur réinitialisé."
    );
}


// ========================================================
// 🧪 DIAGNOSTIC
// ========================================================

console.log(
    "✏️ Générateur Mama Binta v2 chargé."
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
    "👧🏾 Prénoms disponibles :",
    MAMA_BINTA_NAMES.length
);

console.log(
    "📖 Mots / emojis disponibles :",
    READING_WORDS.length
);

console.log(
    "📝 Taille d'une session :",
    SESSION_SIZE_GENERATOR
);

console.log(
    "🧠 Anti-répétition activé."
);
