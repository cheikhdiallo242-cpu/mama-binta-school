/* =========================================================
   MAMA BINTA — GÉNÉRATEUR D'EXERCICES
   Version 7 — générateur adaptatif
   =========================================================
   Rôle :
   - Générer Lecture
   - Générer Addition
   - Générer Soustraction
   - Générer Multiplication
   - Générer Compréhension
   - Générer les sessions personnalisées de 5 exercices
   - Adapter les sessions aux difficultés détectées
   - Éviter les répétitions
   - Ne jamais utiliser de récursion dangereuse
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
   1. BANQUE DE MOTS
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

const READING_LETTERS = [
    "A", "B", "C", "D", "É", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"
];

/* =========================================================
   2. COMPRÉHENSION
   ========================================================= */

const READING_PASSAGES = [
    {
        text: "Awa a un petit chat blanc. Chaque matin, elle lui donne de l'eau et un peu de nourriture.",
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
        text: "Fatou plante une petite graine dans le jardin. Elle l'arrose chaque jour.",
        question: "Que plante Fatou ?",
        choices: ["Une graine", "Une pierre", "Un ballon"],
        answer: "Une graine"
    },
    {
        text: "Sidy aime lire. Chaque soir, il prend un livre avant de dormir.",
        question: "Que fait Sidy avant de dormir ?",
        choices: ["Il lit", "Il court", "Il cuisine"],
        answer: "Il lit"
    },
    {
        text: "Maman prépare le repas dans la cuisine. Mama l'aide à mettre les assiettes sur la table.",
        question: "Où prépare-t-elle le repas ?",
        choices: ["Dans la cuisine", "Dans la cour", "Dans la voiture"],
        answer: "Dans la cuisine"
    },
    {
        text: "Oumar voit un oiseau dans un arbre. L'oiseau chante puis s'envole.",
        question: "Où est l'oiseau au début ?",
        choices: ["Dans un arbre", "Dans une maison", "Dans une voiture"],
        answer: "Dans un arbre"
    }
];

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
        question: "Une plante a besoin d'eau pour grandir. Que faut-il lui donner ?",
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
        question: "Pourquoi faut-il écouter une consigne avant de commencer ?",
        choices: [
            "Pour comprendre ce qu'il faut faire",
            "Pour perdre du temps",
            "Pour éviter d'apprendre"
        ],
        answer: "Pour comprendre ce qu'il faut faire"
    },
    {
        question: "Quel comportement montre du respect envers un camarade ?",
        choices: ["L'écouter", "L'insulter", "Se moquer de lui"],
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
        question: "Quel objet utilise-t-on pour transporter ses cahiers ?",
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
   3. PHRASES
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
    }
];

/* =========================================================
   4. OUTILS
   ========================================================= */

function clampLevel(level) {
    return Math.max(
        1,
        Math.min(100, Number(level) || 1)
    );
}

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

    return array[
        Math.floor(Math.random() * array.length)
    ];
}

function randomInt(min, max) {
    min = Math.ceil(Number(min) || 0);
    max = Math.floor(Number(max) || 0);

    if (max < min) {
        [min, max] = [max, min];
    }

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

function normalizeLetter(value) {
    return String(value || "")
        .trim()
        .toUpperCase();
}

function firstLetter(value) {
    return String(value || "")
        .trim()
        .charAt(0)
        .toUpperCase();
}

/* =========================================================
   5. HISTORIQUE
   ========================================================= */

function getGeneratorHistory() {
    try {
        const raw = localStorage.getItem(
            GENERATOR_HISTORY_KEY
        );

        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);

        return Array.isArray(parsed)
            ? parsed
            : [];
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
    if (!question) {
        return "";
    }

    return JSON.stringify({
        skill: question.skill || "",
        type: question.type || "",
        level: question.level || 0,
        question: question.question || "",
        choices: Array.isArray(question.choices)
            ? [...question.choices].sort()
            : [],
        answer: question.answer || ""
    });
}

function wasRecentlyUsed(question) {
    const signature = questionSignature(question);

    if (!signature) {
        return false;
    }

    return getGeneratorHistory().includes(
        signature
    );
}

function rememberGeneratedQuestion(question) {
    const signature = questionSignature(question);

    if (!signature) {
        return;
    }

    let history = getGeneratorHistory();

    history = history.filter(
        item => item !== signature
    );

    history.push(signature);

    if (history.length > 100) {
        history = history.slice(-100);
    }

    saveGeneratorHistory(history);
}

function clearGeneratorHistory() {
    try {
        localStorage.removeItem(
            GENERATOR_HISTORY_KEY
        );
    } catch (error) {
        console.warn(
            "Impossible de supprimer l'historique :",
            error
        );
    }
}

/* =========================================================
   6. FINALISATION + VALIDATION INTERNE
   ========================================================= */

function finalizeGeneratedQuestion(
    question,
    skill,
    level,
    type
) {
    if (!question) {
        return null;
    }

    return {
        ...question,
        skill,
        level: clampLevel(level),
        type: type || question.type || "",
        choices: Array.isArray(question.choices)
            ? [...question.choices]
            : []
    };
}

function generatorQuestionLooksValid(question) {
    if (!question) {
        return false;
    }

    if (
        typeof question.question !== "string" ||
        question.question.trim() === ""
    ) {
        return false;
    }

    if (
        !Array.isArray(question.choices) ||
        question.choices.length < 3
    ) {
        return false;
    }

    const normalized = question.choices.map(
        value =>
            String(value)
                .trim()
                .toLowerCase()
    );

    if (
        new Set(normalized).size !==
        normalized.length
    ) {
        return false;
    }

    return question.choices.some(
        choice =>
            String(choice).trim() ===
            String(question.answer).trim()
    );
}

/*
   IMPORTANT :
   Cette fonction utilise uniquement une boucle.
   Aucun générateur ne s'appelle lui-même.
*/
function getUniqueQuestion(
    firstQuestion,
    generatorFunction,
    maxAttempts = 12
) {
    let question = firstQuestion;

    for (
        let attempt = 0;
        attempt < maxAttempts;
        attempt++
    ) {
        if (
            generatorQuestionLooksValid(question) &&
            !wasRecentlyUsed(question)
        ) {
            rememberGeneratedQuestion(question);
            return question;
        }

        if (
            typeof generatorFunction !==
            "function"
        ) {
            break;
        }

        question = generatorFunction();
    }

    if (
        generatorQuestionLooksValid(question)
    ) {
        rememberGeneratedQuestion(question);
        return question;
    }

    return null;
}

/* =========================================================
   7. LECTURE — LETTRE → MOT
   ========================================================= */

function buildLetterWordQuestion(level = 1) {
    const availableLetters =
        READING_LETTERS.filter(letter =>
            READING_WORDS.some(
                item =>
                    normalizeLetter(item.letter) ===
                    normalizeLetter(letter)
            )
        );

    const letter =
        randomItem(availableLetters);

    if (!letter) {
        return null;
    }

    const correctCandidates =
        READING_WORDS.filter(
            item =>
                normalizeLetter(item.letter) ===
                    normalizeLetter(letter) &&
                firstLetter(item.word) ===
                    normalizeLetter(letter)
        );

    if (
        correctCandidates.length === 0
    ) {
        return null;
    }

    const answer =
        randomItem(correctCandidates);

    const wrongCandidates =
        READING_WORDS.filter(
            item =>
                item.word !== answer.word &&
                firstLetter(item.word) !==
                    normalizeLetter(letter)
        );

    if (
        wrongCandidates.length < 2
    ) {
        return null;
    }

    const groups = {};

    wrongCandidates.forEach(item => {
        const initial =
            firstLetter(item.word);

        if (!groups[initial]) {
            groups[initial] = [];
        }

        groups[initial].push(item);
    });

    const initials =
        shuffle(Object.keys(groups));

    const wrongChoices = [];

    for (const initial of initials) {
        if (wrongChoices.length >= 2) {
            break;
        }

        const item =
            randomItem(groups[initial]);

        if (item) {
            wrongChoices.push(item);
        }
    }

    if (wrongChoices.length < 2) {
        const backup =
            shuffle(wrongCandidates);

        for (const item of backup) {
            if (
                wrongChoices.some(
                    selected =>
                        selected.word ===
                        item.word
                )
            ) {
                continue;
            }

            wrongChoices.push(item);

            if (
                wrongChoices.length >= 2
            ) {
                break;
            }
        }
    }

    if (wrongChoices.length < 2) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `Quel mot commence par la lettre ${letter} ?`,

            choices: shuffle([
                answer.word,
                wrongChoices[0].word,
                wrongChoices[1].word
            ]),

            answer: answer.word
        },
        "reading",
        level,
        "letter_word"
    );
}

function generateLetterWordQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildLetterWordQuestion(
            safeLevel
        ),
        () =>
            buildLetterWordQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   8. LECTURE — EMOJI → MOT
   ========================================================= */

function buildEmojiWordQuestion(
    level = 1
) {
    const item =
        randomItem(READING_WORDS);

    if (!item) {
        return null;
    }

    const wrong =
        shuffle(
            READING_WORDS.filter(
                candidate =>
                    candidate.word !==
                    item.word
            )
        ).slice(0, 2);

    if (wrong.length < 2) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `${item.emoji} Quel mot correspond à cette image ?`,

            choices: shuffle([
                item.word,
                wrong[0].word,
                wrong[1].word
            ]),

            answer: item.word
        },
        "reading",
        level,
        "emoji_word"
    );
}

function generateEmojiWordQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildEmojiWordQuestion(
            safeLevel
        ),
        () =>
            buildEmojiWordQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   9. LECTURE — LETTRE MANQUANTE
   ========================================================= */

function buildMissingLetterQuestion(
    level = 1
) {
    const candidates =
        READING_WORDS.filter(
            item =>
                item.word.length >= 4
        );

    const item =
        randomItem(candidates);

    if (!item) {
        return null;
    }

    const position =
        randomInt(
            1,
            item.word.length - 2
        );

    const missingLetter =
        item.word.charAt(position);

    const displayed =
        item.word.substring(
            0,
            position
        ) +
        "_" +
        item.word.substring(
            position + 1
        );

    const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZÉ"
            .split("");

    const wrongLetters =
        shuffle(
            alphabet.filter(
                letter =>
                    letter.toUpperCase() !==
                    missingLetter.toUpperCase()
            )
        ).slice(0, 2);

    if (
        wrongLetters.length < 2
    ) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `Quelle lettre manque dans le mot « ${displayed} » ?`,

            choices: shuffle([
                missingLetter.toUpperCase(),
                wrongLetters[0],
                wrongLetters[1]
            ]),

            answer:
                missingLetter.toUpperCase(),

            word: item.word
        },
        "reading",
        level,
        "missing_letter"
    );
}

function generateMissingLetterQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildMissingLetterQuestion(
            safeLevel
        ),
        () =>
            buildMissingLetterQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   10. LECTURE — PHRASE
   ========================================================= */

function buildSentenceQuestion(
    level = 1
) {
    const item =
        randomItem(
            READING_SENTENCES
        );

    if (!item) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `${item.sentence}\n\n${item.question}`,

            choices: shuffle(
                item.choices
            ),

            answer: item.answer
        },
        "reading",
        level,
        "sentence"
    );
}

function generateSentenceQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildSentenceQuestion(
            safeLevel
        ),
        () =>
            buildSentenceQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   11. LECTURE — COMPRÉHENSION
   ========================================================= */

function buildReadingComprehensionQuestion(
    level = 1
) {
    const passage =
        randomItem(
            READING_PASSAGES
        );

    if (!passage) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `${passage.text}\n\n${passage.question}`,

            choices: shuffle(
                passage.choices
            ),

            answer: passage.answer
        },
        "reading",
        level,
        "reading_comprehension"
    );
}

function generateReadingComprehensionQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildReadingComprehensionQuestion(
            safeLevel
        ),
        () =>
            buildReadingComprehensionQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   12. GÉNÉRATEUR PRINCIPAL DE LECTURE
   ========================================================= */

function buildReadingQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    if (safeLevel <= 20) {
        return buildLetterWordQuestion(
            safeLevel
        );
    }

    if (safeLevel <= 40) {
        return buildEmojiWordQuestion(
            safeLevel
        );
    }

    if (safeLevel <= 60) {
        return buildMissingLetterQuestion(
            safeLevel
        );
    }

    if (safeLevel <= 80) {
        return buildSentenceQuestion(
            safeLevel
        );
    }

    return buildReadingComprehensionQuestion(
        safeLevel
    );
}

function generateReadingQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildReadingQuestion(
            safeLevel
        ),
        () =>
            buildReadingQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   13. MÉMOIRE POUR LE GÉNÉRATEUR
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
            "Mémoire indisponible :",
            error
        );
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
            result &&
            result.skill === skill
    );
}

/* =========================================================
   14. MATHS — NIVEAU
   ========================================================= */

function getAdditionMax(level) {
    const safeLevel =
        clampLevel(level);

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
    const safeLevel =
        clampLevel(level);

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
   15. MAUVAISES RÉPONSES MATHÉMATIQUES
   ========================================================= */

function generateWrongNumbers(
    correct,
    count = 2,
    min = 0,
    max = 200
) {
    const result = [];
    const candidates = [
        Number(correct) + 1,
        Number(correct) - 1,
        Number(correct) + 2,
        Number(correct) - 2,
        Number(correct) + 5,
        Number(correct) - 5,
        Number(correct) + 10,
        Number(correct) - 10
    ];

    for (
        const value of shuffle(
            candidates
        )
    ) {
        if (
            Number.isFinite(value) &&
            value >= min &&
            value <= max &&
            value !== Number(correct) &&
            !result.includes(value)
        ) {
            result.push(value);
        }

        if (
            result.length >= count
        ) {
            break;
        }
    }

    let attempts = 0;

    while (
        result.length < count &&
        attempts < 50
    ) {
        attempts++;

        const value =
            randomInt(
                min,
                max
            );

        if (
            value !==
                Number(correct) &&
            !result.includes(value)
        ) {
            result.push(value);
        }
    }

    return result;
}

/* =========================================================
   16. ADDITION
   ========================================================= */

function buildAdditionQuestion(
    level = 1
) {
    const max =
        getAdditionMax(level);

    const a =
        randomInt(
            0,
            Math.max(
                1,
                Math.floor(
                    max * 0.6
                )
            )
        );

    const b =
        randomInt(
            0,
            Math.max(
                1,
                max - a
            )
        );

    const answer = a + b;

    const wrongs =
        generateWrongNumbers(
            answer,
            2,
            0,
            Math.max(
                max + 10,
                answer + 15
            )
        );

    if (
        wrongs.length < 2
    ) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `Combien font ${a} + ${b} ?`,

            choices: shuffle([
                String(answer),
                String(wrongs[0]),
                String(wrongs[1])
            ]),

            answer: String(answer),

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

function generateAdditionQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildAdditionQuestion(
            safeLevel
        ),
        () =>
            buildAdditionQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   17. SOUSTRACTION
   ========================================================= */

function buildSubtractionQuestion(
    level = 1
) {
    const max =
        getSubtractionMax(level);

    const a =
        randomInt(
            1,
            Math.max(
                2,
                max
            )
        );

    const b =
        randomInt(
            0,
            a
        );

    const answer =
        a - b;

    const wrongs =
        generateWrongNumbers(
            answer,
            2,
            0,
            Math.max(
                max + 10,
                answer + 15
            )
        );

    if (
        wrongs.length < 2
    ) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question:
                `Combien font ${a} − ${b} ?`,

            choices: shuffle([
                String(answer),
                String(wrongs[0]),
                String(wrongs[1])
            ]),

            answer: String(answer),

            operation: {
                a,
                b,
                operator: "−"
            }
        },
        "subtraction",
        level,
        "subtraction"
    );
}

function generateSubtractionQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildSubtractionQuestion(
            safeLevel
        ),
        () =>
            buildSubtractionQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   18. MULTIPLICATION
   ========================================================= */

function buildMultiplicationQuestion(
    level = 1
) {
    const factorMax =
        getMultiplicationFactor(
            level
        );

    const a =
        randomInt(
            1,
            factorMax
        );

    const b =
        randomInt(
            1,
            factorMax
        );

    const answer =
        a * b;

    const wrongs =
        generateWrongNumbers(
            answer,
            2,
            0,
            Math.max(
                150,
                answer + 30
            )
        );

    if (
        wrongs.length < 2
    ) {
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
    const safeLevel =
        clampLevel(level);

    return getUniqueQuestion(
        buildMultiplicationQuestion(
            safeLevel
        ),
        () =>
            buildMultiplicationQuestion(
                safeLevel
            )
    );
}

/* =========================================================
   19. COMPRÉHENSION
   ========================================================= */

function buildComprehensionQuestion(
    level = 1
) {
    const item =
        randomItem(
            COMPREHENSION_QUESTIONS
        );

    if (!item) {
        return null;
    }

    return finalizeGeneratedQuestion(
        {
            question: item.question,
            choices: shuffle(
                item.choices
            ),
            answer: item.answer
        },
        "comprehension",
        level,
        "comprehension"
    );
}

function generateComprehensionQuestion(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

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
   20. ANALYSE ADAPTATIVE DES COMPÉTENCES
   ========================================================= */

/*
   Cette fonction lit directement l'analyseur.

   Priorités :

   🔴 needs_support / declining
      = difficulté importante

   🟠 developing
      = compétence en développement

   🟢 strong
      = compétence forte

   ⚪ insufficient_data
      = pas assez de données
*/

function getAdaptiveSkillAnalysis() {

    const analysis = [];

    for (
        const skill of GENERATOR_SKILLS
    ) {

        let result = null;

        try {

            if (
                typeof analyzeSkill ===
                "function"
            ) {
                result =
                    analyzeSkill(skill);
            }

        } catch (error) {

            console.warn(
                `Analyse indisponible pour ${skill} :`,
                error
            );
        }

        if (!result) {

            analysis.push({
                skill,
                status:
                    "insufficient_data",
                difficulty:
                    "unknown",
                trend:
                    "stable",
                accuracy:
                    null,
                priority:
                    0
            });

            continue;
        }

        let priority = 0;

        /*
           Une difficulté persistante ou une baisse
           de résultats reçoit la priorité maximale.
        */
        if (
            result.status ===
            "needs_support"
        ) {
            priority = 100;
        }

        else if (
            result.trend ===
            "declining"
        ) {
            priority = 90;
        }

        else if (
            result.difficulty ===
            "high"
        ) {
            priority = 85;
        }

        else if (
            result.status ===
            "developing"
        ) {
            priority = 60;
        }

        else if (
            result.difficulty ===
            "medium"
        ) {
            priority = 50;
        }

        else if (
            result.status ===
            "strong"
        ) {
            priority = 10;
        }

        analysis.push({

            skill,

            status:
                result.status ||
                "insufficient_data",

            difficulty:
                result.difficulty ||
                "unknown",

            trend:
                result.trend ||
                "stable",

            accuracy:
                typeof result.accuracy ===
                "number"
                    ? result.accuracy
                    : null,

            priority
        });
    }

    /*
       Les plus faibles viennent en premier.
       En cas d'égalité, l'ordre original
       des compétences est conservé.
    */
    analysis.sort(
        (a, b) =>
            b.priority -
            a.priority
    );

    return analysis;
}


/*
   Retourne les compétences réellement prioritaires.
*/
function getAdaptivePrioritySkills() {

    const analysis =
        getAdaptiveSkillAnalysis();

    return analysis
        .filter(
            item =>
                item.priority >= 50
        )
        .map(
            item =>
                item.skill
        );
}


/*
   Trouve la compétence la plus faible.
*/
function getPrimaryWeakSkill() {

    const analysis =
        getAdaptiveSkillAnalysis();

    const weak =
        analysis.filter(
            item =>
                item.priority >= 85
        );

    if (
        weak.length === 0
    ) {
        return null;
    }

    return weak[0].skill;
}


/*
   Calcule combien de fois une compétence
   peut apparaître dans une session.

   Maximum volontaire :
   3 exercices pour la faiblesse principale.

   Cela évite de transformer une session
   de 5 exercices en session monotone.
*/
function getSkillSessionQuota(
    skill,
    analysis
) {

    const item =
        analysis.find(
            entry =>
                entry.skill === skill
        );

    if (!item) {
        return 1;
    }

    if (
        item.priority >= 85
    ) {
        return 3;
    }

    if (
        item.priority >= 50
    ) {
        return 2;
    }

    return 1;
}


/*
   Sélection intelligente d'une compétence.

   Contrairement à l'ancienne version :
   une compétence prioritaire peut maintenant
   revenir plusieurs fois dans la même session.

   usedSkills devient volontairement un historique
   des compétences déjà utilisées.
*/
function chooseSkillForSession(
    level = 1,
    index = 0,
    usedSkills = []
) {

    const defaultSkills =
        [...GENERATOR_SKILLS];

    const analysis =
        getAdaptiveSkillAnalysis();

    /*
       Compter les utilisations actuelles.
    */
    const usage = {};

    defaultSkills.forEach(
        skill => {
            usage[skill] = 0;
        }
    );

    usedSkills.forEach(
        skill => {

            if (
                Object.prototype.hasOwnProperty.call(
                    usage,
                    skill
                )
            ) {
                usage[skill]++;
            }
        }
    );


    /*
       =====================================================
       CAS 1
       Une faiblesse importante existe.
       =====================================================
    */

    const primaryWeak =
        getPrimaryWeakSkill();

    if (
        primaryWeak &&
        usage[primaryWeak] < 3
    ) {

        /*
           On réserve les positions 1, 3 et 5
           à la faiblesse principale lorsque possible.
        */
        const preferredIndexes = [
            0,
            2,
            4
        ];

        if (
            preferredIndexes.includes(
                index
            )
        ) {
            return primaryWeak;
        }
    }


    /*
       =====================================================
       CAS 2
       Une deuxième compétence est en difficulté
       ou en développement.
       =====================================================
    */

    const candidates =
        analysis.filter(
            item =>
                item.skill !==
                    primaryWeak &&
                usage[item.skill] <
                    getSkillSessionQuota(
                        item.skill,
                        analysis
                    )
        );


    /*
       Parmi les compétences restantes,
       choisir celle qui possède la plus grande priorité.
    */
    if (
        candidates.length > 0
    ) {

        /*
           On favorise d'abord les compétences
           les plus faibles.
        */
        candidates.sort(
            (a, b) => {

                if (
                    b.priority !==
                    a.priority
                ) {
                    return (
                        b.priority -
                        a.priority
                    );
                }

                /*
                   À priorité égale, favoriser
                   celle qui a été la moins utilisée.
                */
                return (
                    usage[a.skill] -
                    usage[b.skill]
                );
            }
        );

        /*
           Pour éviter que deux compétences faibles
           soient toujours dans le même ordre,
           une petite variation est possible
           lorsque leurs priorités sont proches.
        */
        const top =
            candidates.filter(
                candidate =>
                    candidate.priority ===
                    candidates[0].priority
            );

        if (
            top.length > 1
        ) {
            return randomItem(
                top
            ).skill;
        }

        return candidates[0].skill;
    }


    /*
       =====================================================
       CAS 3
       Plus aucune priorité disponible.
       Répartition normale.
       =====================================================
    */

    const unused =
        defaultSkills.filter(
            skill =>
                usage[skill] === 0
        );

    if (
        unused.length > 0
    ) {
        return unused[0];
    }


    /*
       Toutes les compétences ont déjà été utilisées.
       On choisit celle qui a été la moins utilisée.
    */
    const minimumUsage =
        Math.min(
            ...defaultSkills.map(
                skill =>
                    usage[skill]
            )
        );

    const leastUsed =
        defaultSkills.filter(
            skill =>
                usage[skill] ===
                minimumUsage
        );

    return randomItem(
        leastUsed
    );
}

/* =========================================================
   21. GÉNÉRATION PAR COMPÉTENCE
   ========================================================= */

function generateExerciseBySkill(
    skill,
    level = 1
) {
    const safeLevel =
        clampLevel(level);

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
   22. SESSION PERSONNALISÉE DE 5 EXERCICES
   ========================================================= */

function generateLearningSession(
    level = 1
) {
    const safeLevel =
        clampLevel(level);

    const session = [];
    const usedSkills = [];

    /*
       Analyse effectuée une fois au début
       de la session.

       Ainsi la composition des 5 exercices
       reste cohérente pendant toute la session.
    */
    const adaptiveAnalysis =
        getAdaptiveSkillAnalysis();

    console.log(
        "🧠 Analyse adaptative de la session :",
        adaptiveAnalysis
    );


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
           Pas de récursion.
           On fait simplement plusieurs essais.
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
           Sécurité :
           si une compétence ne fonctionne pas,
           on essaie les autres compétences.
        */
        if (!question) {

            for (
                const fallbackSkill
                of GENERATOR_SKILLS
            ) {

                if (
                    fallbackSkill ===
                    skill
                ) {
                    continue;
                }

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
           Vérification spéciale Lecture
           avant même l'arrivée dans verifier.js.
        */
        if (
            question.type ===
            "letter_word"
        ) {

            const match =
                question.question.match(
                    /lettre\s+([A-Za-zÀ-ÿ])/i
                );

            if (match) {

                const requested =
                    normalizeLetter(
                        match[1]
                    );

                if (
                    firstLetter(
                        question.answer
                    ) !== requested
                ) {

                    throw new Error(
                        `Exercice ${i + 1} invalide : la réponse ne correspond pas à la lettre demandée.`
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
                                requested
                    );

                if (badChoice) {

                    throw new Error(
                        `Exercice ${i + 1} invalide : un mauvais choix commence aussi par la lettre demandée.`
                    );
                }
            }
        }


        /*
           On ajoute la compétence à l'historique
           même lorsqu'elle revient plusieurs fois.

           C'est volontaire :
           le nouveau système doit pouvoir
           renforcer une faiblesse.
        */
        usedSkills.push(
            question.skill
        );

        session.push(
            question
        );
    }


    if (
        session.length !==
        SESSION_SIZE_GENERATOR
    ) {

        throw new Error(
            "La session doit contenir exactement 5 exercices."
        );
    }


    /*
       Petit diagnostic utile dans la console.
    */
    console.log(
        "🎯 Composition de la session personnalisée :",
        session.map(
            question =>
                question.skill
        )
    );


    return session;
}

/* =========================================================
   23. QUESTION ADAPTATIVE
   ========================================================= */

function generateAdaptiveQuestion(
    level = 1,
    skill = null
) {
    const safeLevel =
        clampLevel(level);

    let selectedSkill =
        skill;

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
   24. COMPATIBILITÉ ANCIENNES FONCTIONS
   ========================================================= */

function generateMathQuestion(
    level = 1
) {
    return generateAdditionQuestion(
        level
    );
}

function generatePlannedMathQuestion(
    level = 1
) {
    return generateAdditionQuestion(
        level
    );
}

function resetGeneratorHistory() {
    clearGeneratorHistory();
}

function getGeneratorInfo() {
    return {
        version: "7.0",
        sessionSize:
            SESSION_SIZE_GENERATOR,
        skills: [
            ...GENERATOR_SKILLS
        ],
        historySize:
            getGeneratorHistory().length
    };
}

/* =========================================================
   25. EXPORTS
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

window.getAdaptiveSkillAnalysis =
    getAdaptiveSkillAnalysis;

window.getAdaptivePrioritySkills =
    getAdaptivePrioritySkills;

window.getPrimaryWeakSkill =
    getPrimaryWeakSkill;

/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "✅ Mama Binta Generator v7 chargé."
);

console.log(
    "🧠 Adaptation aux compétences : active"
);

console.log(
    "🎯 Maximum par compétence prioritaire : 3"
);

console.log(
    "📝 Exercices par session :",
    SESSION_SIZE_GENERATOR
);

console.log(
    "📚 Compétences :",
    GENERATOR_SKILLS
);

console.log(
    "📊 Analyse adaptative :",
    getAdaptiveSkillAnalysis()
);
