/* =========================================================
   MAMA BINTA — GÉNÉRATEUR D'EXERCICES
   Version 5
   =========================================================
   Rôle :
   - Générer des exercices de Lecture
   - Générer des exercices de Maths
   - Générer des exercices de Compréhension
   - Générer les sessions personnalisées de 5 exercices
   - Éviter les répétitions
   - Garantir des questions cohérentes
   - Ne jamais modifier directement la mémoire pédagogique
   ========================================================= */


/* =========================================================
   1. CONSTANTES
   ========================================================= */

const GENERATOR_HISTORY_KEY = "mamaBintaQuestionHistory";
const SESSION_SIZE_GENERATOR = 5;

const GENERATOR_SKILLS = [
    "reading",
    "addition",
    "subtraction",
    "multiplication",
    "comprehension"
];


/* =========================================================
   2. BANQUE DE MOTS — LECTURE
   ========================================================= */

const READING_WORDS = [
    { word: "avion", emoji: "✈️", letter: "A" },
    { word: "arbre", emoji: "🌳", letter: "A" },
    { word: "ami", emoji: "👦", letter: "A" },
    { word: "abeille", emoji: "🐝", letter: "A" },

    { word: "banane", emoji: "🍌", letter: "B" },
    { word: "ballon", emoji: "⚽", letter: "B" },
    { word: "bateau", emoji: "⛵", letter: "B" },
    { word: "bébé", emoji: "👶", letter: "B" },

    { word: "chat", emoji: "🐱", letter: "C" },
    { word: "chien", emoji: "🐶", letter: "C" },
    { word: "chaise", emoji: "🪑", letter: "C" },
    { word: "crayon", emoji: "✏️", letter: "C" },
    { word: "citron", emoji: "🍋", letter: "C" },

    { word: "danse", emoji: "💃", letter: "D" },
    { word: "dauphin", emoji: "🐬", letter: "D" },
    { word: "domino", emoji: "🁢", letter: "D" },
    { word: "doigt", emoji: "☝️", letter: "D" },

    { word: "école", emoji: "🏫", letter: "É" },
    { word: "éléphant", emoji: "🐘", letter: "É" },
    { word: "étoile", emoji: "⭐", letter: "É" },
    { word: "église", emoji: "⛪", letter: "É" },

    { word: "fleur", emoji: "🌸", letter: "F" },
    { word: "fourmi", emoji: "🐜", letter: "F" },
    { word: "fromage", emoji: "🧀", letter: "F" },
    { word: "fusée", emoji: "🚀", letter: "F" },

    { word: "girafe", emoji: "🦒", letter: "G" },
    { word: "gâteau", emoji: "🍰", letter: "G" },
    { word: "guitare", emoji: "🎸", letter: "G" },
    { word: "glace", emoji: "🍦", letter: "G" },

    { word: "hérisson", emoji: "🦔", letter: "H" },
    { word: "hibou", emoji: "🦉", letter: "H" },
    { word: "haricot", emoji: "🫘", letter: "H" },

    { word: "igloo", emoji: "🛖", letter: "I" },
    { word: "île", emoji: "🏝️", letter: "I" },
    { word: "image", emoji: "🖼️", letter: "I" },

    { word: "jouet", emoji: "🧸", letter: "J" },
    { word: "jus", emoji: "🧃", letter: "J" },
    { word: "jardin", emoji: "🌿", letter: "J" },

    { word: "kiwi", emoji: "🥝", letter: "K" },
    { word: "koala", emoji: "🐨", letter: "K" },

    { word: "lapin", emoji: "🐰", letter: "L" },
    { word: "livre", emoji: "📖", letter: "L" },
    { word: "lion", emoji: "🦁", letter: "L" },
    { word: "lune", emoji: "🌙", letter: "L" },

    { word: "maison", emoji: "🏠", letter: "M" },
    { word: "maman", emoji: "👩", letter: "M" },
    { word: "mangue", emoji: "🥭", letter: "M" },
    { word: "montagne", emoji: "⛰️", letter: "M" },

    { word: "nez", emoji: "👃", letter: "N" },
    { word: "nuage", emoji: "☁️", letter: "N" },
    { word: "navire", emoji: "🚢", letter: "N" },

    { word: "orange", emoji: "🍊", letter: "O" },
    { word: "oiseau", emoji: "🐦", letter: "O" },
    { word: "ours", emoji: "🐻", letter: "O" },

    { word: "papa", emoji: "👨", letter: "P" },
    { word: "pomme", emoji: "🍎", letter: "P" },
    { word: "poisson", emoji: "🐟", letter: "P" },
    { word: "papillon", emoji: "🦋", letter: "P" },

    { word: "question", emoji: "❓", letter: "Q" },

    { word: "radio", emoji: "📻", letter: "R" },
    { word: "robot", emoji: "🤖", letter: "R" },
    { word: "rose", emoji: "🌹", letter: "R" },

    { word: "soleil", emoji: "☀️", letter: "S" },
    { word: "singe", emoji: "🐒", letter: "S" },
    { word: "sac", emoji: "🎒", letter: "S" },
    { word: "salade", emoji: "🥗", letter: "S" },

    { word: "table", emoji: "🪑", letter: "T" },
    { word: "tigre", emoji: "🐯", letter: "T" },
    { word: "tomate", emoji: "🍅", letter: "T" },
    { word: "train", emoji: "🚂", letter: "T" },

    { word: "uniforme", emoji: "👕", letter: "U" },
    { word: "usine", emoji: "🏭", letter: "U" },

    { word: "vélo", emoji: "🚲", letter: "V" },
    { word: "vache", emoji: "🐄", letter: "V" },
    { word: "valise", emoji: "🧳", letter: "V" },

    { word: "wagon", emoji: "🚃", letter: "W" },

    { word: "xylophone", emoji: "🎵", letter: "X" },

    { word: "yaourt", emoji: "🥛", letter: "Y" },

    { word: "zèbre", emoji: "🦓", letter: "Z" },
    { word: "zéro", emoji: "0️⃣", letter: "Z" }
];


/* =========================================================
   3. PRÉNOMS
   ========================================================= */

const MAMA_BINTA_NAMES = [
    "Mama",
    "Awa",
    "Fatou",
    "Moussa",
    "Ibrahima",
    "Sali",
    "Aminata",
    "Oumar",
    "Sidy",
    "Adama"
];


/* =========================================================
   4. CONTEXTES
   ========================================================= */

const MAMA_BINTA_CONTEXTS = [
    "à l'école",
    "dans la cour",
    "à la maison",
    "dans la classe",
    "au jardin",
    "à la bibliothèque",
    "dans le quartier",
    "avec sa famille"
];


/* =========================================================
   5. TEXTES DE COMPRÉHENSION
   ========================================================= */

const READING_PASSAGES = [
    {
        text: "Awa a un petit chat blanc. Chaque matin, elle lui donne de l'eau et un peu de nourriture. Le chat aime dormir près de la fenêtre.",
        question: "De quelle couleur est le chat ?",
        choices: ["Blanc", "Noir", "Vert"],
        answer: "Blanc"
    },
    {
        text: "Moussa va à l'école avec son sac bleu. Dans son sac, il a deux livres et un cahier.",
        question: "De quelle couleur est le sac de Moussa ?",
        choices: ["Bleu", "Rouge", "Jaune"],
        answer: "Bleu"
    },
    {
        text: "Fatou plante une petite graine dans le jardin. Elle l'arrose chaque jour. Après plusieurs jours, une petite plante apparaît.",
        question: "Que plante Fatou ?",
        choices: ["Une graine", "Une pierre", "Un ballon"],
        answer: "Une graine"
    },
    {
        text: "Sidy aime lire. Chaque soir, il prend un livre et lit quelques pages avant de dormir.",
        question: "Que fait Sidy avant de dormir ?",
        choices: ["Il lit", "Il court", "Il cuisine"],
        answer: "Il lit"
    },
    {
        text: "Maman prépare le repas dans la cuisine. Mama l'aide en mettant les assiettes sur la table.",
        question: "Où prépare-t-elle le repas ?",
        choices: ["Dans la cuisine", "Dans la cour", "Dans la voiture"],
        answer: "Dans la cuisine"
    },
    {
        text: "Un matin, Oumar voit un oiseau dans un arbre. L'oiseau chante puis s'envole vers une autre branche.",
        question: "Où est l'oiseau au début ?",
        choices: ["Dans un arbre", "Dans une maison", "Dans une voiture"],
        answer: "Dans un arbre"
    }
];


/* =========================================================
   6. QUESTIONS DE COMPRÉHENSION
   ========================================================= */

const COMPREHENSION_QUESTIONS = [
    {
        question: "Si tu as 2 pommes et que quelqu'un t'en donne 1, combien en as-tu ?",
        choices: ["2", "3", "4"],
        answer: "3"
    },
    {
        question: "Tu as chaud. Que peux-tu faire pour te rafraîchir ?",
        choices: ["Boire de l'eau", "Mettre un manteau", "Allumer un feu"],
        answer: "Boire de l'eau"
    },
    {
        question: "Il pleut dehors. Que peux-tu prendre pour te protéger ?",
        choices: ["Un parapluie", "Une cuillère", "Un cahier"],
        answer: "Un parapluie"
    },
    {
        question: "Quel objet utilise-t-on généralement pour écrire ?",
        choices: ["Un crayon", "Une chaussure", "Une assiette"],
        answer: "Un crayon"
    },
    {
        question: "Quel animal miaule ?",
        choices: ["Le chat", "Le chien", "La vache"],
        answer: "Le chat"
    },
    {
        question: "Quel animal aboie ?",
        choices: ["Le chien", "Le chat", "Le poisson"],
        answer: "Le chien"
    },
    {
        question: "Que fait-on généralement avec un livre ?",
        choices: ["On le lit", "On le mange", "On le boit"],
        answer: "On le lit"
    },
    {
        question: "Le soleil brille dans le ciel. Quel moment est-ce probablement ?",
        choices: ["Le jour", "La nuit", "Minuit"],
        answer: "Le jour"
    },
    {
        question: "Tu veux traverser une route. Que dois-tu faire avant ?",
        choices: [
            "Regarder des deux côtés",
            "Fermer les yeux",
            "Courir sans regarder"
        ],
        answer: "Regarder des deux côtés"
    },
    {
        question: "Pourquoi lave-t-on ses mains avant de manger ?",
        choices: [
            "Pour les nettoyer",
            "Pour les colorer",
            "Pour les cacher"
        ],
        answer: "Pour les nettoyer"
    },
    {
        question: "Une plante a besoin d'eau pour grandir. Que faut-il lui donner régulièrement ?",
        choices: ["De l'eau", "Du sable uniquement", "Des jouets"],
        answer: "De l'eau"
    },
    {
        question: "Si ton ami tombe et se fait mal, que peux-tu faire ?",
        choices: [
            "L'aider et prévenir un adulte",
            "Rire de lui",
            "Partir sans rien dire"
        ],
        answer: "L'aider et prévenir un adulte"
    },
    {
        question: "Quel objet permet généralement de mesurer le temps ?",
        choices: ["Une horloge", "Une chaise", "Un ballon"],
        answer: "Une horloge"
    },
    {
        question: "Si tu as faim, quelle action est logique ?",
        choices: ["Manger", "Dormir dans la rue", "Mettre des chaussures"],
        answer: "Manger"
    },
    {
        question: "Quel endroit est généralement destiné à apprendre ?",
        choices: ["L'école", "La piscine", "Le garage"],
        answer: "L'école"
    },
    {
        question: "Si tu veux connaître le contenu d'un livre, que peux-tu faire ?",
        choices: ["Le lire", "Le cacher", "Le jeter"],
        answer: "Le lire"
    },
    {
        question: "Pourquoi faut-il écouter une consigne avant de commencer un exercice ?",
        choices: [
            "Pour comprendre ce qu'il faut faire",
            "Pour perdre du temps",
            "Pour éviter d'apprendre"
        ],
        answer: "Pour comprendre ce qu'il faut faire"
    },
    {
        question: "Quel comportement montre du respect envers un camarade ?",
        choices: [
            "L'écouter",
            "L'insulter",
            "Se moquer de lui"
        ],
        answer: "L'écouter"
    },
    {
        question: "Si tu ne comprends pas un exercice, que peux-tu faire ?",
        choices: [
            "Demander une explication",
            "Abandonner immédiatement",
            "Déchirer le cahier"
        ],
        answer: "Demander une explication"
    },
    {
        question: "Quel objet utilise-t-on pour transporter ses cahiers à l'école ?",
        choices: ["Un sac", "Une fourchette", "Une casserole"],
        answer: "Un sac"
    },
    {
        question: "Si tu fais une erreur dans un exercice, que peux-tu faire ?",
        choices: [
            "Chercher à comprendre ton erreur",
            "Arrêter d'apprendre",
            "Cacher la réponse"
        ],
        answer: "Chercher à comprendre ton erreur"
    },
    {
        question: "Pourquoi est-il important de faire des efforts régulièrement ?",
        choices: [
            "Pour progresser",
            "Pour oublier",
            "Pour ne jamais apprendre"
        ],
        answer: "Pour progresser"
    }
];


/* =========================================================
   7. LETTRES DISPONIBLES
   ========================================================= */

const READING_LETTERS = [
    "A", "B", "C", "D", "É", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"
];


/* =========================================================
   8. OUTILS GÉNÉRAUX
   ========================================================= */

function shuffle(array) {
    const copy = Array.isArray(array) ? [...array] : [];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}


function randomItem(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return null;
    }

    return array[Math.floor(Math.random() * array.length)];
}


function randomInt(min, max) {
    min = Math.ceil(Number(min) || 0);
    max = Math.floor(Number(max) || 0);

    if (max < min) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function normalizeLetter(value) {
    return String(value || "")
        .trim()
        .toUpperCase();
}


function firstLetter(word) {
    return String(word || "")
        .trim()
        .charAt(0)
        .toUpperCase();
}


function getDifficultyFromLevel(level) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    if (safeLevel <= 20) return "facile";
    if (safeLevel <= 40) return "moyen";
    if (safeLevel <= 70) return "avance";
    return "expert";
}


/* =========================================================
   9. HISTORIQUE DES QUESTIONS
   ========================================================= */

function getGeneratorHistory() {
    try {
        const raw = localStorage.getItem(GENERATOR_HISTORY_KEY);

        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn(
            "Historique générateur illisible :",
            error
        );

        return [];
    }
}


function saveGeneratorHistory(history) {
    try {
        localStorage.setItem(
            GENERATOR_HISTORY_KEY,
            JSON.stringify(history)
        );
    } catch (error) {
        console.warn(
            "Impossible de sauvegarder l'historique :",
            error
        );
    }
}


function questionSignature(question) {
    if (!question || typeof question !== "object") {
        return "";
    }

    const choices = Array.isArray(question.choices)
        ? [...question.choices].sort()
        : [];

    return JSON.stringify({
        skill: question.skill || "",
        type: question.type || "",
        level: question.level || 0,
        question: question.question || "",
        choices,
        answer: question.answer || ""
    });
}


function wasRecentlyUsed(question) {
    const signature = questionSignature(question);

    if (!signature) {
        return false;
    }

    const history = getGeneratorHistory();

    return history.includes(signature);
}


function rememberGeneratedQuestion(question) {
    const signature = questionSignature(question);

    if (!signature) {
        return;
    }

    let history = getGeneratorHistory();

    history = history.filter(item => item !== signature);

    history.push(signature);

    if (history.length > 100) {
        history = history.slice(-100);
    }

    saveGeneratorHistory(history);
}


function clearGeneratorHistory() {
    try {
        localStorage.removeItem(GENERATOR_HISTORY_KEY);
    } catch (error) {
        console.warn(
            "Impossible de supprimer l'historique :",
            error
        );
    }
}


/* =========================================================
   10. FINALISATION D'UNE QUESTION
   ========================================================= */

function finalizeGeneratedQuestion(
    question,
    skill,
    level,
    type = ""
) {
    if (!question || typeof question !== "object") {
        return null;
    }

    return {
        ...question,

        skill: skill || question.skill || "",
        level: Math.max(
            1,
            Math.min(100, Number(level) || 1)
        ),

        type: type || question.type || "",

        choices: Array.isArray(question.choices)
            ? [...question.choices]
            : []
    };
}


/* =========================================================
   11. VALIDATION INTERNE DU GÉNÉRATEUR
   =========================================================
   Cette validation ne remplace PAS verifier.js.
   Elle sert seulement à empêcher le générateur de fabriquer
   volontairement une question manifestement incorrecte.
   ========================================================= */

function generatorQuestionLooksValid(question) {
    if (!question || typeof question !== "object") {
        return false;
    }

    if (
        typeof question.question !== "string" ||
        question.question.trim() === ""
    ) {
        return false;
    }

    if (!Array.isArray(question.choices)) {
        return false;
    }

    if (question.choices.length < 3) {
        return false;
    }

    const normalizedChoices = question.choices.map(
        choice => String(choice).trim().toLowerCase()
    );

    if (
        new Set(normalizedChoices).size !==
        normalizedChoices.length
    ) {
        return false;
    }

    if (
        !question.choices.some(
            choice =>
                String(choice).trim() ===
                String(question.answer).trim()
        )
    ) {
        return false;
    }

    return true;
}


/* =========================================================
   12. GÉNÉRATION UNIQUE — SANS RÉCURSION
   =========================================================
   IMPORTANT :
   L'ancienne architecture pouvait appeler un générateur
   depuis lui-même et provoquer :
   Maximum call stack size exceeded

   Ici on utilise une boucle.
   ========================================================= */

function getUniqueQuestion(
    firstQuestion,
    generatorFunction,
    maxAttempts = 12
) {
    let question = firstQuestion;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {

        if (
            generatorQuestionLooksValid(question) &&
            !wasRecentlyUsed(question)
        ) {
            rememberGeneratedQuestion(question);

            return question;
        }

        if (typeof generatorFunction !== "function") {
            break;
        }

        question = generatorFunction();
    }

    /*
       Si toutes les tentatives sont des répétitions,
       on accepte une question structurellement correcte
       plutôt que de provoquer une boucle infinie.
    */

    if (generatorQuestionLooksValid(question)) {
        rememberGeneratedQuestion(question);

        return question;
    }

    return null;
}


/* =========================================================
   13. LECTURE — LETTRE → MOT
   ========================================================= */

function generateLetterWordQuestionWithLetter(
    letter,
    level = 1
) {
    const normalizedLetter = normalizeLetter(letter);

    const correctCandidates = READING_WORDS.filter(
        item =>
            normalizeLetter(item.letter) ===
                normalizedLetter &&
            firstLetter(item.word) ===
                normalizedLetter
    );

    if (correctCandidates.length === 0) {
        return generateLetterWordQuestion(level);
    }

    const answer = randomItem(correctCandidates);

    /*
       CORRECTION PRINCIPALE :

       Les mauvaises réponses DOIVENT commencer
       par une autre lettre.

       Avant :
       Chat
       Chaise
       Crayon

       Maintenant :
       Chat
       Livre
       Pomme
    */

    const wrongCandidates = READING_WORDS.filter(
        item =>
            item.word !== answer.word &&
            firstLetter(item.word) !== normalizedLetter
    );

    const groupedByFirstLetter = {};

    wrongCandidates.forEach(item => {
        const initial = firstLetter(item.word);

        if (!groupedByFirstLetter[initial]) {
            groupedByFirstLetter[initial] = [];
        }

        groupedByFirstLetter[initial].push(item);
    });

    const availableInitials = shuffle(
        Object.keys(groupedByFirstLetter)
    );

    const wrongChoices = [];

    /*
       On privilégie des mauvaises réponses avec
       des initiales différentes entre elles.
    */

    for (
        const initial of availableInitials
    ) {
        if (wrongChoices.length >= 2) {
            break;
        }

        const candidates =
            groupedByFirstLetter[initial];

        const selected = randomItem(candidates);

        if (selected) {
            wrongChoices.push(selected);
        }
    }

    /*
       Sécurité supplémentaire si jamais le nombre
       d'initiales disponibles était insuffisant.
    */

    if (wrongChoices.length < 2) {
        const backup = shuffle(
            wrongCandidates.filter(
                item =>
                    !wrongChoices.some(
                        wrong =>
                            wrong.word === item.word
                    )
            )
        );

        for (const item of backup) {
            if (wrongChoices.length >= 2) {
                break;
            }

            wrongChoices.push(item);
        }
    }

    if (wrongChoices.length < 2) {
        return null;
    }

    const choices = shuffle([
        answer.word,
        wrongChoices[0].word,
        wrongChoices[1].word
    ]);

    return finalizeGeneratedQuestion(
        {
            question:
                `Quel mot commence par la lettre ${normalizedLetter} ?`,

            choices,

            answer: answer.word,

            skill: "reading",

            type: "letter_word"
        },
        "reading",
        level,
        "letter_word"
    );
}


function buildLetterWordQuestion(level = 1) {
    const availableLetters = READING_LETTERS.filter(
        letter =>
            READING_WORDS.some(
                item =>
                    normalizeLetter(item.letter) ===
                    normalizeLetter(letter)
            )
    );

    const letter = randomItem(availableLetters);

    if (!letter) {
        return null;
    }

    return generateLetterWordQuestionWithLetter(
        letter,
        level
    );
}


function generateLetterWordQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    const firstQuestion =
        buildLetterWordQuestion(safeLevel);

    return getUniqueQuestion(
        firstQuestion,
        () => buildLetterWordQuestion(safeLevel)
    );
}


/* =========================================================
   14. LECTURE — EMOJI → MOT
   ========================================================= */

function buildEmojiWordQuestion(level = 1) {
    const item = randomItem(READING_WORDS);

    if (!item) {
        return null;
    }

    const wrongCandidates = shuffle(
        READING_WORDS.filter(
            candidate =>
                candidate.word !== item.word
        )
    );

    if (wrongCandidates.length < 2) {
        return null;
    }

    const choices = shuffle([
        item.word,
        wrongCandidates[0].word,
        wrongCandidates[1].word
    ]);

    return finalizeGeneratedQuestion(
        {
            question:
                `${item.emoji} Quel mot correspond à cette image ?`,

            choices,

            answer: item.word,

            skill: "reading",

            type: "emoji_word"
        },
        "reading",
        level,
        "emoji_word"
    );
}


function generateEmojiWordQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildEmojiWordQuestion(safeLevel),
        () => buildEmojiWordQuestion(safeLevel)
    );
}


/* =========================================================
   15. LECTURE — LETTRE MANQUANTE
   ========================================================= */

function buildMissingLetterQuestion(level = 1) {
    const item = randomItem(
        READING_WORDS.filter(
            candidate =>
                candidate.word.length >= 4
        )
    );

    if (!item) {
        return null;
    }

    const word = item.word;
    const position = randomInt(
        1,
        word.length - 2
    );

    const missingLetter = word.charAt(position);

    const displayedWord =
        word.substring(0, position) +
        "_" +
        word.substring(position + 1);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÉ".split("");

    const wrongLetters = shuffle(
        alphabet.filter(
            letter =>
                letter.toUpperCase() !==
                missingLetter.toUpperCase()
        )
    ).slice(0, 2);

    if (wrongLetters.length < 2) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `Quelle lettre manque dans le mot « ${displayedWord} » ?`,

            choices: shuffle([
                missingLetter.toUpperCase(),
                wrongLetters[0],
                wrongLetters[1]
            ]),

            answer: missingLetter.toUpperCase(),

            word,

            skill: "reading",

            type: "missing_letter"
        },
        "reading",
        level,
        "missing_letter"
    );
}


function generateMissingLetterQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildMissingLetterQuestion(safeLevel),
        () => buildMissingLetterQuestion(safeLevel)
    );
}


/* =========================================================
   16. LECTURE — PHRASE
   ========================================================= */

const READING_SENTENCES = [
    {
        sentence: "Mama lit un livre.",
        question: "Que fait Mama ?",
        choices: ["Elle lit", "Elle dort", "Elle court"],
        answer: "Elle lit"
    },
    {
        sentence: "Le petit garçon joue avec un ballon.",
        question: "Avec quoi joue le garçon ?",
        choices: ["Un ballon", "Un livre", "Une chaise"],
        answer: "Un ballon"
    },
    {
        sentence: "Awa mange une pomme.",
        question: "Que mange Awa ?",
        choices: ["Une pomme", "Une banane", "Une orange"],
        answer: "Une pomme"
    },
    {
        sentence: "Le chat dort sur le tapis.",
        question: "Où dort le chat ?",
        choices: ["Sur le tapis", "Dans la cuisine", "Dans le jardin"],
        answer: "Sur le tapis"
    },
    {
        sentence: "Moussa porte un sac bleu.",
        question: "De quelle couleur est le sac ?",
        choices: ["Bleu", "Vert", "Rouge"],
        answer: "Bleu"
    },
    {
        sentence: "Fatou arrose les fleurs.",
        question: "Que fait Fatou ?",
        choices: ["Elle arrose les fleurs", "Elle mange", "Elle dort"],
        answer: "Elle arrose les fleurs"
    },
    {
        sentence: "Le soleil brille dans le ciel.",
        question: "Qu'est-ce qui brille ?",
        choices: ["Le soleil", "La lune", "La pluie"],
        answer: "Le soleil"
    },
    {
        sentence: "Sidy ouvre son cahier.",
        question: "Qu'est-ce que Sidy ouvre ?",
        choices: ["Son cahier", "Sa porte", "Son sac"],
        answer: "Son cahier"
    },
    {
        sentence: "Maman prépare le repas.",
        question: "Que prépare Maman ?",
        choices: ["Le repas", "Un livre", "Une voiture"],
        answer: "Le repas"
    },
    {
        sentence: "Le chien court dans le jardin.",
        question: "Où court le chien ?",
        choices: ["Dans le jardin", "Dans la classe", "Sur le toit"],
        answer: "Dans le jardin"
    },
    {
        sentence: "Ibrahima regarde les étoiles.",
        question: "Que regarde Ibrahima ?",
        choices: ["Les étoiles", "Les poissons", "Les voitures"],
        answer: "Les étoiles"
    },
    {
        sentence: "La fille écrit avec un crayon.",
        question: "Avec quoi écrit-elle ?",
        choices: ["Un crayon", "Une cuillère", "Une chaussure"],
        answer: "Un crayon"
    },
    {
        sentence: "Le garçon boit de l'eau.",
        question: "Que boit le garçon ?",
        choices: ["De l'eau", "Du lait", "Du jus"],
        answer: "De l'eau"
    },
    {
        sentence: "Le bébé sourit à sa maman.",
        question: "À qui sourit le bébé ?",
        choices: ["À sa maman", "À son professeur", "Au chien"],
        answer: "À sa maman"
    },
    {
        sentence: "Le train arrive à la gare.",
        question: "Où arrive le train ?",
        choices: ["À la gare", "À l'école", "Au jardin"],
        answer: "À la gare"
    }
];


function buildSentenceQuestion(level = 1) {
    const item = randomItem(READING_SENTENCES);

    if (!item) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `${item.sentence}\n\n${item.question}`,

            choices: shuffle(item.choices),

            answer: item.answer,

            skill: "reading",

            type: "sentence"
        },
        "reading",
        level,
        "sentence"
    );
}


function generateSentenceQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildSentenceQuestion(safeLevel),
        () => buildSentenceQuestion(safeLevel)
    );
}


/* =========================================================
   17. LECTURE — COMPRÉHENSION
   ========================================================= */

function buildReadingComprehensionQuestion(level = 1) {
    const passage = randomItem(READING_PASSAGES);

    if (!passage) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `${passage.text}\n\n${passage.question}`,

            choices: shuffle(passage.choices),

            answer: passage.answer,

            skill: "reading",

            type: "reading_comprehension"
        },
        "reading",
        level,
        "reading_comprehension"
    );
}


function generateReadingComprehensionQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildReadingComprehensionQuestion(safeLevel),
        () => buildReadingComprehensionQuestion(safeLevel)
    );
}


/* =========================================================
   18. GÉNÉRATEUR PRINCIPAL DE LECTURE
   ========================================================= */

function buildReadingQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    if (safeLevel <= 20) {
        return generateLetterWordQuestionRaw(
            safeLevel
        );
    }

    if (safeLevel <= 40) {
        return buildEmojiWordQuestion(safeLevel);
    }

    if (safeLevel <= 60) {
        return buildMissingLetterQuestion(safeLevel);
    }

    if (safeLevel <= 80) {
        return buildSentenceQuestion(safeLevel);
    }

    return buildReadingComprehensionQuestion(
        safeLevel
    );
}


/*
   Version interne spéciale pour éviter que
   generateReadingQuestion() appelle à nouveau
   generateLetterWordQuestion(), ce qui recréerait
   une boucle.
*/

function generateLetterWordQuestionRaw(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    const availableLetters = READING_LETTERS.filter(
        letter =>
            READING_WORDS.some(
                item =>
                    normalizeLetter(item.letter) ===
                    normalizeLetter(letter)
            )
    );

    const letter = randomItem(availableLetters);

    if (!letter) {
        return null;
    }

    return generateLetterWordQuestionWithLetter(
        letter,
        safeLevel
    );
}


function generateReadingQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildReadingQuestion(safeLevel),
        () => buildReadingQuestion(safeLevel)
    );
}


/* =========================================================
   19. MÉMOIRE UTILISÉE PAR LE GÉNÉRATEUR
   ========================================================= */

function getGeneratorMemory() {
    try {
        if (
            typeof loadStudentMemory ===
            "function"
        ) {
            return loadStudentMemory();
        }
    } catch (error) {
        console.warn(
            "Impossible de lire la mémoire :",
            error
        );
    }

    return null;
}


function getRecentResultsForSkill(skill) {
    const memory = getGeneratorMemory();

    if (
        !memory ||
        !Array.isArray(memory.recentResults)
    ) {
        return [];
    }

    return memory.recentResults.filter(
        result =>
            result &&
            result.skill === skill
    );
}


/* =========================================================
   20. MATHS — VALEUR MAXIMALE
   ========================================================= */

function getAdditionMax(level) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    if (safeLevel <= 5) return 10;
    if (safeLevel <= 10) return 15;
    if (safeLevel <= 20) return 20;
    if (safeLevel <= 30) return 30;
    if (safeLevel <= 40) return 40;
    if (safeLevel <= 50) return 50;
    if (safeLevel <= 60) return 70;
    if (safeLevel <= 70) return 90;
    if (safeLevel <= 80) return 120;
    if (safeLevel <= 90) return 150;

    return 200;
}


function getSubtractionMax(level) {
    return getAdditionMax(level);
}


function getMultiplicationFactor(level) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    if (safeLevel <= 10) return 3;
    if (safeLevel <= 20) return 5;
    if (safeLevel <= 30) return 6;
    if (safeLevel <= 40) return 7;
    if (safeLevel <= 50) return 8;
    if (safeLevel <= 60) return 9;
    if (safeLevel <= 80) return 10;

    return 12;
}


/* =========================================================
   21. MAUVAISES RÉPONSES NUMÉRIQUES
   ========================================================= */

function generateWrongNumber(
    correct,
    min = 0,
    max = 200
) {
    const safeCorrect = Number(correct);

    const candidates = [
        safeCorrect + 1,
        safeCorrect - 1,
        safeCorrect + 2,
        safeCorrect - 2,
        safeCorrect + 5,
        safeCorrect - 5,
        safeCorrect + 10,
        safeCorrect - 10
    ].filter(
        value =>
            Number.isFinite(value) &&
            value >= min &&
            value <= max &&
            value !== safeCorrect
    );

    const unique = [
        ...new Set(candidates)
    ];

    if (unique.length > 0) {
        return randomItem(unique);
    }

    let fallback;

    do {
        fallback = randomInt(
            min,
            Math.max(min, max)
        );
    } while (
        fallback === safeCorrect &&
        max > min
    );

    return fallback;
}


function generateWrongNumbers(
    correct,
    count = 2,
    min = 0,
    max = 200
) {
    const result = [];
    const attemptsLimit = 50;

    let attempts = 0;

    while (
        result.length < count &&
        attempts < attemptsLimit
    ) {
        attempts++;

        const wrong = generateWrongNumber(
            correct,
            min,
            max
        );

        if (
            wrong !== correct &&
            !result.includes(wrong)
        ) {
            result.push(wrong);
        }
    }

    return result;
}


/* =========================================================
   22. ADDITION
   ========================================================= */

const ADDITION_STORIES = [
    {
        prefix: "Mama a",
        suffix: "pommes. Elle en reçoit encore"
    },
    {
        prefix: "Awa a",
        suffix: "bonbons. Son amie lui en donne encore"
    },
    {
        prefix: "Moussa a",
        suffix: "livres. Il reçoit encore"
    },
    {
        prefix: "Fatou a",
        suffix: "fleurs. Elle en ajoute encore"
    },
    {
        prefix: "Sidy a",
        suffix: "crayons. Son professeur lui en donne encore"
    }
];


function buildAdditionQuestion(level = 1) {
    const max = getAdditionMax(level);

    let a = randomInt(
        0,
        Math.max(1, Math.floor(max * 0.6))
    );

    let b = randomInt(
        0,
        Math.max(1, max - a)
    );

    const answer = a + b;

    const wrongs = generateWrongNumbers(
        answer,
        2,
        0,
        Math.max(max + 10, answer + 15)
    );

    if (wrongs.length < 2) {
        return null;
    }

    const story =
        randomItem(ADDITION_STORIES);

    const questionText =
        `${story.prefix} ${a} ${story.suffix} ${b}. Combien en a-t-elle maintenant ?`;

    return finalizeGeneratedQuestion(
        {
            question: questionText,

            choices: shuffle([
                String(answer),
                String(wrongs[0]),
                String(wrongs[1])
            ]),

            answer: String(answer),

            skill: "addition",

            type: "addition",

            operation: {
                a,
                b,
                operator: "+"
            }
        },
        "addition",
        level,
        "addition"
    );
}


function generateAdditionQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildAdditionQuestion(safeLevel),
        () => buildAdditionQuestion(safeLevel)
    );
}


/* =========================================================
   23. SOUSTRACTION
   ========================================================= */

const SUBTRACTION_STORIES = [
    {
        prefix: "Mama avait",
        suffix: "pommes. Elle en donne"
    },
    {
        prefix: "Awa avait",
        suffix: "bonbons. Elle en mange"
    },
    {
        prefix: "Moussa avait",
        suffix: "livres. Il en prête"
    },
    {
        prefix: "Fatou avait",
        suffix: "fleurs. Elle en offre"
    },
    {
        prefix: "Sidy avait",
        suffix: "crayons. Il en donne"
    }
];


function buildSubtractionQuestion(level = 1) {
    const max = getSubtractionMax(level);

    const a = randomInt(
        2,
        Math.max(2, max)
    );

    const b = randomInt(
        1,
        Math.max(1, a)
    );

    const answer = a - b;

    const wrongs = generateWrongNumbers(
        answer,
        2,
        0,
        Math.max(max + 10, answer + 15)
    );

    if (wrongs.length < 2) {
        return null;
    }

    const story =
        randomItem(SUBTRACTION_STORIES);

    const questionText =
        `${story.prefix} ${a} ${story.suffix} ${b}. Combien lui en reste-t-il ?`;

    return finalizeGeneratedQuestion(
        {
            question: questionText,

            choices: shuffle([
                String(answer),
                String(wrongs[0]),
                String(wrongs[1])
            ]),

            answer: String(answer),

            skill: "subtraction",

            type: "subtraction",

            operation: {
                a,
                b,
                operator: "-"
            }
        },
        "subtraction",
        level,
        "subtraction"
    );
}


function generateSubtractionQuestion(level = 1) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildSubtractionQuestion(safeLevel),
        () => buildSubtractionQuestion(safeLevel)
    );
}


/* =========================================================
   24. MULTIPLICATION
   ========================================================= */

function buildMultiplicationQuestion(level = 1) {
    const factorMax =
        getMultiplicationFactor(level);

    const a = randomInt(
        1,
        factorMax
    );

    const b = randomInt(
        1,
        factorMax
    );

    const answer = a * b;

    const wrongs = generateWrongNumbers(
        answer,
        2,
        0,
        Math.max(150, answer + 30)
    );

    if (wrongs.length < 2) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `Combien font ${a} × ${b} ?`,

            choices: shuffle([
                String(answer),
                String(wrongs[0]),
                String(wrongs[1])
            ]),

            answer: String(answer),

            skill: "multiplication",

            type: "multiplication",

            operation: {
                a,
                b,
                operator: "×"
            }
        },
        "multiplication",
        level,
        "multiplication"
    );
}


function generateMultiplicationQuestion(
    level = 1
) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildMultiplicationQuestion(safeLevel),
        () =>
            buildMultiplicationQuestion(
                safeLevel
            )
    );
}


/* =========================================================
   25. COMPRÉHENSION
   ========================================================= */

function buildComprehensionQuestion(level = 1) {
    const item =
        randomItem(COMPREHENSION_QUESTIONS);

    if (!item) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question: item.question,

            choices: shuffle(item.choices),

            answer: item.answer,

            skill: "comprehension",

            type: "comprehension"
        },
        "comprehension",
        level,
        "comprehension"
    );
}


function generateComprehensionQuestion(
    level = 1
) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    return getUniqueQuestion(
        buildComprehensionQuestion(
            safeLevel
        ),
        () =>
            buildComprehensionQuestion(
                safeLevel
            )
    );
}


/* =========================================================
   26. CHOIX DU TYPE D'EXERCICE
   ========================================================= */

function generateExerciseBySkill(
    skill,
    level = 1
) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    switch (skill) {

        case "reading":
            return generateReadingQuestion(
                safeLevel
            );

        case "addition":
            return generateAdditionQuestion(
                safeLevel
            );

        case "subtraction":
            return generateSubtractionQuestion(
                safeLevel
            );

        case "multiplication":
            return generateMultiplicationQuestion(
                safeLevel
            );

        case "comprehension":
            return generateComprehensionQuestion(
                safeLevel
            );

        default:
            return generateReadingQuestion(
                safeLevel
            );
    }
}


/* =========================================================
   27. CHOIX ADAPTATIF DES COMPÉTENCES
   ========================================================= */

function chooseSkillForSession(
    level = 1,
    index = 0,
    usedSkills = []
) {
    const defaultSkills = [
        "reading",
        "addition",
        "subtraction",
        "multiplication",
        "comprehension"
    ];

    /*
       On essaie d'utiliser l'analyseur si disponible.
       Il indique les compétences à travailler en priorité.
    */

    try {
        if (
            typeof getSkillsToPractice ===
            "function"
        ) {
            const priority =
                getSkillsToPractice();

            if (
                Array.isArray(priority) &&
                priority.length > 0
            ) {
                const priorityNames =
                    priority
                        .map(item => {
                            if (
                                typeof item ===
                                "string"
                            ) {
                                return item;
                            }

                            return item.skill;
                        })
                        .filter(skill =>
                            defaultSkills.includes(
                                skill
                            )
                        );

                const availablePriority =
                    priorityNames.filter(
                        skill =>
                            !usedSkills.includes(
                                skill
                            )
                    );

                if (
                    availablePriority.length > 0
                ) {
                    return availablePriority[0];
                }
            }
        }
    } catch (error) {
        console.warn(
            "Analyseur indisponible pour le choix adaptatif :",
            error
        );
    }

    /*
       Pour une session complète, on conserve les
       cinq compétences afin que chaque domaine
       soit observé.
    */

    const unused = defaultSkills.filter(
        skill =>
            !usedSkills.includes(skill)
    );

    if (unused.length > 0) {
        return unused[0];
    }

    return defaultSkills[
        index % defaultSkills.length
    ];
}


/* =========================================================
   28. GÉNÉRATION D'UNE SESSION DE 5 EXERCICES
   ========================================================= */

function generateLearningSession(
    level = 1
) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    const session = [];

    const usedSkills = [];

    /*
       Chaque session contient exactement 5 exercices.
    */

    for (
        let i = 0;
        i < SESSION_SIZE_GENERATOR;
        i++
    ) {

        const skill =
            chooseSkillForSession(
                safeLevel,
                i,
                usedSkills
            );

        let question = null;

        /*
           Plusieurs tentatives indépendantes.
           Aucune récursion.
        */

        for (
            let attempt = 0;
            attempt < 10;
            attempt++
        ) {
            question =
                generateExerciseBySkill(
                    skill,
                    safeLevel
                );

            if (
                question &&
                generatorQuestionLooksValid(
                    question
                )
            ) {
                break;
            }

            question = null;
        }

        /*
           Si un domaine particulier ne produit pas
           de question, on essaie un autre domaine.
        */

        if (!question) {

            const fallbackSkills =
                GENERATOR_SKILLS.filter(
                    candidate =>
                        candidate !== skill
                );

            for (
                const fallbackSkill
                of fallbackSkills
            ) {

                question =
                    generateExerciseBySkill(
                        fallbackSkill,
                        safeLevel
                    );

                if (
                    question &&
                    generatorQuestionLooksValid(
                        question
                    )
                ) {
                    break;
                }

                question = null;
            }
        }

        if (!question) {
            throw new Error(
                `Impossible de générer l'exercice ${i + 1}.`
            );
        }

        /*
           On ajoute le skill réellement généré.
        */

        usedSkills.push(
            question.skill || skill
        );

        session.push(question);
    }

    /*
       Sécurité finale :
       une session personnalisée doit toujours
       contenir exactement 5 exercices.
    */

    if (
        session.length !==
        SESSION_SIZE_GENERATOR
    ) {
        throw new Error(
            "La session doit contenir exactement 5 exercices."
        );
    }

    /*
       Dernière validation locale avant retour.
    */

    session.forEach(
        (question, index) => {

            if (
                !generatorQuestionLooksValid(
                    question
                )
            ) {
                throw new Error(
                    `Exercice ${index + 1} invalide.`
                );
            }

            /*
               Protection spéciale pour les exercices
               lettre → mot.
            */

            if (
                question.type ===
                "letter_word"
            ) {
                const match =
                    question.question.match(
                        /lettre\s+([A-ZÉ])/i
                    );

                if (match) {
                    const requestedLetter =
                        normalizeLetter(
                            match[1]
                        );

                    const correct =
                        firstLetter(
                            question.answer
                        );

                    if (
                        correct !==
                        requestedLetter
                    ) {
                        throw new Error(
                            `Exercice ${index + 1} invalide : la bonne réponse ne commence pas par la lettre demandée.`
                        );
                    }

                    const badChoice =
                        question.choices.find(
                            choice =>
                                String(
                                    choice
                                ) !==
                                String(
                                    question.answer
                                ) &&
                                firstLetter(
                                    choice
                                ) ===
                                requestedLetter
                        );

                    if (badChoice) {
                        throw new Error(
                            `Exercice ${index + 1} invalide : un mauvais choix commence aussi par la lettre demandée.`
                        );
                    }
                }
            }
        }
    );

    return session;
}


/* =========================================================
   29. QUESTION ADAPTATIVE SIMPLE
   ========================================================= */

function generateAdaptiveQuestion(
    level = 1,
    skill = null
) {
    const safeLevel = Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );

    let selectedSkill = skill;

    if (
        !GENERATOR_SKILLS.includes(
            selectedSkill
        )
    ) {
        selectedSkill =
            chooseSkillForSession(
                safeLevel,
                0,
                []
            );
    }

    const question =
        generateExerciseBySkill(
            selectedSkill,
            safeLevel
        );

    if (
        !question ||
        !generatorQuestionLooksValid(
            question
        )
    ) {
        throw new Error(
            "La maîtresse n'a pas réussi à préparer cette question."
        );
    }

    return question;
}


/* =========================================================
   30. COMPATIBILITÉ — MATHS
   ========================================================= */

function generateMathQuestion(
    level = 1
) {
    return generateAdditionQuestion(level);
}


function generatePlannedMathQuestion(
    level = 1
) {
    return generateAdditionQuestion(level);
}


/* =========================================================
   31. RESET
   ========================================================= */

function resetGeneratorHistory() {
    clearGeneratorHistory();
}


/* =========================================================
   32. INFORMATIONS POUR DEBUG
   ========================================================= */

function getGeneratorInfo() {
    return {
        version: "5.0",
        sessionSize: SESSION_SIZE_GENERATOR,
        skills: [...GENERATOR_SKILLS],
        historySize:
            getGeneratorHistory().length
    };
}


/* =========================================================
   33. EXPORTS GLOBAUX
   =========================================================
   Les fonctions sont volontairement exposées
   directement dans window afin que index.html,
   teacher.js et les autres fichiers puissent
   continuer à les utiliser.
   ========================================================= */

window.generateReadingQuestion =
    generateReadingQuestion;

window.generateLetterWordQuestion =
    generateLetterWordQuestion;

window.generateEmojiWordQuestion =
    generateEmojiWordQuestion;

window.generateMissingLetterQuestion =
    generateMissingLetterQuestion;

window.generateSentenceQuestion =
    generateSentenceQuestion;

window.generateReadingComprehensionQuestion =
    generateReadingComprehensionQuestion;

window.generateAdditionQuestion =
    generateAdditionQuestion;

window.generateSubtractionQuestion =
    generateSubtractionQuestion;

window.generateMultiplicationQuestion =
    generateMultiplicationQuestion;

window.generateComprehensionQuestion =
    generateComprehensionQuestion;

window.generateExerciseBySkill =
    generateExerciseBySkill;

window.generateLearningSession =
    generateLearningSession;

window.generateAdaptiveQuestion =
    generateAdaptiveQuestion;

window.generateMathQuestion =
    generateMathQuestion;

window.generatePlannedMathQuestion =
    generatePlannedMathQuestion;

window.chooseSkillForSession =
    chooseSkillForSession;

window.getGeneratorHistory =
    getGeneratorHistory;

window.clearGeneratorHistory =
    clearGeneratorHistory;

window.resetGeneratorHistory =
    resetGeneratorHistory;

window.getGeneratorInfo =
    getGeneratorInfo;


/* =========================================================
   34. DEBUG
   ========================================================= */

console.log(
    "✅ Mama Binta Generator v5 chargé.",
    getGeneratorInfo()
);
