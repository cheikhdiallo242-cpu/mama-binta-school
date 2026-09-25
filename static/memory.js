// =====================================================
// 🧠 AGENT MÉMOIRE DE MAMA BINTA
// =====================================================
//
// RÔLE :
// La mémoire est la base de données pédagogique locale
// de Mama Binta.
//
// Elle enregistre :
// - les réponses
// - les erreurs
// - les matières
// - les compétences
// - les séries de réussites
// - les difficultés
// - les séances
// - les scores
// - les niveaux atteints
//
// IMPORTANT :
// La mémoire enregistre les faits.
// Elle ne décide PAS seule du niveau.
//
// Les décisions seront prises plus tard par :
// 🔎 Analyste
// 🎯 Planificateur
//
// =====================================================


// =====================================================
// 💾 CLÉ DE STOCKAGE
// =====================================================

const MEMORY_STORAGE_KEY =
    "mamaBintaMemory";


// =====================================================
// 🎯 STRUCTURE D'UNE COMPÉTENCE
// =====================================================

function createSkillMemory() {

    return {

        correct: 0,

        incorrect: 0,

        total: 0,

        currentCorrectStreak: 0,

        currentIncorrectStreak: 0,

        bestCorrectStreak: 0,

        lastResults: []

    };

}


// =====================================================
// 🧠 MÉMOIRE PAR DÉFAUT
// =====================================================
//
// Cette structure constitue maintenant la mémoire
// complète de Mama Binta.
//
// =====================================================

const defaultMemory = {

    // -------------------------------------------------
    // 📊 STATISTIQUES GÉNÉRALES
    // -------------------------------------------------

    correct: 0,

    incorrect: 0,

    totalQuestions: 0,


    // -------------------------------------------------
    // 📖 ANCIENNES STATISTIQUES DE LECTURE
    // -------------------------------------------------

    readingCorrect: 0,

    readingIncorrect: 0,


    // -------------------------------------------------
    // 🧮 ANCIENNES STATISTIQUES DE MATHS
    // -------------------------------------------------

    mathsCorrect: 0,

    mathsIncorrect: 0,


    // -------------------------------------------------
    // 🔥 SÉRIES GÉNÉRALES
    // -------------------------------------------------

    currentCorrectStreak: 0,

    currentIncorrectStreak: 0,

    bestCorrectStreak: 0,


    // -------------------------------------------------
    // 🔥 SÉRIES MATHS
    // -------------------------------------------------

    mathsCorrectStreak: 0,

    mathsIncorrectStreak: 0,


    // -------------------------------------------------
    // 🔥 SÉRIES LECTURE
    // -------------------------------------------------

    readingCorrectStreak: 0,

    readingIncorrectStreak: 0,


    // -------------------------------------------------
    // 🧮 ANCIENNES INFORMATIONS MATHS
    // -------------------------------------------------

    mathsHighestCorrectSum: 0,

    mathsLowestIncorrectSum: null,


    // -------------------------------------------------
    // 📚 COMPÉTENCES
    // -------------------------------------------------
    //
    // Chaque compétence possède maintenant sa propre
    // mémoire.
    //

    skills: {

        reading:
            createSkillMemory(),

        addition:
            createSkillMemory(),

        subtraction:
            createSkillMemory(),

        multiplication:
            createSkillMemory(),

        comprehension:
            createSkillMemory()

    },


    // -------------------------------------------------
    // 🕐 RÉSULTATS RÉCENTS
    // -------------------------------------------------
    //
    // On conserve les derniers résultats pour permettre
    // à l'analyste d'observer les tendances.
    //

    recentResults: [],


    // -------------------------------------------------
    // ❌ ERREURS
    // -------------------------------------------------

    mistakes: [],


    // -------------------------------------------------
    // 🎯 NIVEAU PÉDAGOGIQUE OBSERVÉ
    // -------------------------------------------------
    //
    // Cette information est informative.
    // Le vrai contrôle du niveau appartiendra au
    // planificateur.
    //

    currentLevel: 1,

    highestLevelReached: 1,


    // -------------------------------------------------
    // 🤖 SÉANCES
    // -------------------------------------------------

    sessions: {

        total: 0,

        completed: 0,

        successful: 0,

        recent: []

    },


    // -------------------------------------------------
    // 🎯 SÉANCE ACTUELLE
    // -------------------------------------------------
    //
    // Une séance du mode personnalisé contient
    // normalement 5 exercices.
    //

    currentSession: null

};


// =====================================================
// 🧹 NORMALISATION D'UNE COMPÉTENCE
// =====================================================

function normalizeSkillMemory(
    savedSkill
) {

    const skill = {

        ...createSkillMemory(),

        ...(savedSkill || {})

    };


    if (
        !Array.isArray(
            skill.lastResults
        )
    ) {

        skill.lastResults = [];

    }


    return skill;

}


// =====================================================
// 🧹 NORMALISATION DE LA MÉMOIRE
// =====================================================
//
// Permet de conserver les anciennes données déjà
// enregistrées dans le navigateur.
//
// =====================================================

function normalizeMemory(
    memory
) {

    const normalized = {

        ...defaultMemory,

        ...(memory || {})

    };


    // -------------------------------------------------
    // LISTES
    // -------------------------------------------------

    if (
        !Array.isArray(
            normalized.recentResults
        )
    ) {

        normalized.recentResults = [];

    }


    if (
        !Array.isArray(
            normalized.mistakes
        )
    ) {

        normalized.mistakes = [];

    }


    // -------------------------------------------------
    // COMPÉTENCES
    // -------------------------------------------------

    normalized.skills = {

        reading:
            normalizeSkillMemory(
                normalized.skills?.reading
            ),

        addition:
            normalizeSkillMemory(
                normalized.skills?.addition
            ),

        subtraction:
            normalizeSkillMemory(
                normalized.skills?.subtraction
            ),

        multiplication:
            normalizeSkillMemory(
                normalized.skills?.multiplication
            ),

        comprehension:
            normalizeSkillMemory(
                normalized.skills?.comprehension
            )

    };


    // -------------------------------------------------
    // SÉANCES
    // -------------------------------------------------

    normalized.sessions = {

        total:
            Number(
                normalized.sessions?.total || 0
            ),

        completed:
            Number(
                normalized.sessions?.completed || 0
            ),

        successful:
            Number(
                normalized.sessions?.successful || 0
            ),

        recent:
            Array.isArray(
                normalized.sessions?.recent
            )
                ? normalized.sessions.recent
                : []

    };


    // -------------------------------------------------
    // NIVEAUX
    // -------------------------------------------------

    normalized.currentLevel =
        Number(
            normalized.currentLevel || 1
        );


    normalized.highestLevelReached =
        Number(
            normalized.highestLevelReached ||
            normalized.currentLevel ||
            1
        );


    // -------------------------------------------------
    // SÉANCE ACTUELLE
    // -------------------------------------------------

    if (
        normalized.currentSession !== null &&
        typeof normalized.currentSession !== "object"
    ) {

        normalized.currentSession = null;

    }


    return normalized;

}


// =====================================================
// 📥 CHARGER LA MÉMOIRE
// =====================================================

function loadStudentMemory() {

    try {

        const savedMemory =
            localStorage.getItem(
                MEMORY_STORAGE_KEY
            );


        if (
            savedMemory
        ) {

            const parsedMemory =
                JSON.parse(
                    savedMemory
                );


            return normalizeMemory(
                parsedMemory
            );

        }

    } catch (error) {

        console.error(
            "⚠️ Impossible de charger la mémoire de Mama Binta.",
            error
        );

    }


    return normalizeMemory(
        defaultMemory
    );

}


// =====================================================
// 🧠 MÉMOIRE ACTIVE
// =====================================================

let studentMemory =
    loadStudentMemory();


// =====================================================
// 💾 SAUVEGARDER LA MÉMOIRE
// =====================================================

function saveStudentMemory() {

    try {

        localStorage.setItem(

            MEMORY_STORAGE_KEY,

            JSON.stringify(
                studentMemory
            )

        );

    } catch (error) {

        console.error(
            "⚠️ Impossible de sauvegarder la mémoire.",
            error
        );

    }

}


// =====================================================
// 🔎 IDENTIFIER LA COMPÉTENCE
// =====================================================
//
// Cette fonction permet aux autres agents de parler
// le même langage.
//
// =====================================================

function identifySkill(
    questionData
) {

    if (
        !questionData
    ) {

        return "other";

    }


    // -------------------------------------------------
    // COMPÉTENCE FOURNIE DIRECTEMENT
    // -------------------------------------------------

    if (
        typeof questionData.skill === "string"
    ) {

        const allowedSkills = [

            "reading",

            "addition",

            "subtraction",

            "multiplication",

            "comprehension"

        ];


        if (
            allowedSkills.includes(
                questionData.skill
            )
        ) {

            return questionData.skill;

        }

    }


    // -------------------------------------------------
    // LECTURE
    // -------------------------------------------------

    if (
        questionData.question &&
        questionData.question.startsWith(
            "Quel mot commence par la lettre"
        )
    ) {

        return "reading";

    }


    // -------------------------------------------------
    // ADDITION
    // -------------------------------------------------

    if (
        questionData.question &&
        questionData.question.startsWith(
            "Combien font"
        ) &&
        questionData.question.includes(
            " + "
        )
    ) {

        return "addition";

    }


    // -------------------------------------------------
    // SOUSTRACTION
    // -------------------------------------------------

    if (
        questionData.question &&
        questionData.question.startsWith(
            "Combien font"
        ) &&
        questionData.question.includes(
            " - "
        )
    ) {

        return "subtraction";

    }


    // -------------------------------------------------
    // MULTIPLICATION
    // -------------------------------------------------

    if (
        questionData.question &&
        (
            questionData.question.includes(
                " × "
            ) ||
            questionData.question.includes(
                " x "
            ) ||
            questionData.question.includes(
                " * "
            )
        )
    ) {

        return "multiplication";

    }


    // -------------------------------------------------
    // COMPRÉHENSION
    // -------------------------------------------------

    if (
        questionData.type ===
        "comprehension"
    ) {

        return "comprehension";

    }


    return "other";

}


// =====================================================
// 🏷️ NOM DE COMPÉTENCE
// =====================================================

function getSkillName(
    skill
) {

    const names = {

        reading:
            "Lecture",

        addition:
            "Addition",

        subtraction:
            "Soustraction",

        multiplication:
            "Multiplication",

        comprehension:
            "Compréhension",

        other:
            "Autre"

    };


    return (
        names[skill] ||
        "Autre"
    );

}


// =====================================================
// 🧠 ENREGISTRER UNE RÉPONSE
// =====================================================
//
// C'est l'une des fonctions les plus importantes
// du système.
//
// Elle enregistre les faits.
// Elle ne décide PAS si Mama Binta monte de niveau.
//
// =====================================================

function rememberAnswer(
    questionData,
    studentAnswer
) {

    if (
        !questionData ||
        studentAnswer === undefined ||
        studentAnswer === null
    ) {

        return;

    }


    const correct =
        String(studentAnswer) ===
        String(questionData.answer);


    const skill =
        identifySkill(
            questionData
        );


    const now =
        new Date().toISOString();


    // -------------------------------------------------
    // 📊 STATISTIQUES GÉNÉRALES
    // -------------------------------------------------

    studentMemory.totalQuestions++;


    if (
        correct
    ) {

        studentMemory.correct++;

        studentMemory.currentCorrectStreak++;

        studentMemory.currentIncorrectStreak = 0;


        if (
            studentMemory.currentCorrectStreak >
            studentMemory.bestCorrectStreak
        ) {

            studentMemory.bestCorrectStreak =
                studentMemory.currentCorrectStreak;

        }

    } else {

        studentMemory.incorrect++;

        studentMemory.currentIncorrectStreak++;

        studentMemory.currentCorrectStreak = 0;

    }


    // -------------------------------------------------
    // 🧠 STATISTIQUES DE LA COMPÉTENCE
    // -------------------------------------------------

    if (
        studentMemory.skills[skill]
    ) {

        const skillMemory =
            studentMemory.skills[skill];


        skillMemory.total++;


        if (
            correct
        ) {

            skillMemory.correct++;

            skillMemory.currentCorrectStreak++;

            skillMemory.currentIncorrectStreak = 0;


            if (
                skillMemory.currentCorrectStreak >
                skillMemory.bestCorrectStreak
            ) {

                skillMemory.bestCorrectStreak =
                    skillMemory.currentCorrectStreak;

            }

        } else {

            skillMemory.incorrect++;

            skillMemory.currentIncorrectStreak++;

            skillMemory.currentCorrectStreak = 0;

        }


        skillMemory.lastResults.push({

            correct:
                correct,

            question:
                questionData.question,

            studentAnswer:
                String(studentAnswer),

            correctAnswer:
                String(questionData.answer),

            date:
                now

        });


        // Conserver les 10 derniers résultats
        // de cette compétence.

        if (
            skillMemory.lastResults.length > 10
        ) {

            skillMemory.lastResults =
                skillMemory.lastResults.slice(-10);

        }

    }


    // -------------------------------------------------
    // 📖 COMPATIBILITÉ LECTURE
    // -------------------------------------------------

    if (
        skill === "reading"
    ) {

        if (
            correct
        ) {

            studentMemory.readingCorrect++;

            studentMemory.readingCorrectStreak++;

            studentMemory.readingIncorrectStreak = 0;

        } else {

            studentMemory.readingIncorrect++;

            studentMemory.readingIncorrectStreak++;

            studentMemory.readingCorrectStreak = 0;

        }

    }


    // -------------------------------------------------
    // 🧮 COMPATIBILITÉ MATHS
    // -------------------------------------------------

    if (
        skill === "addition" ||
        skill === "subtraction" ||
        skill === "multiplication"
    ) {

        if (
            correct
        ) {

            studentMemory.mathsCorrect++;

            studentMemory.mathsCorrectStreak++;

            studentMemory.mathsIncorrectStreak = 0;

        } else {

            studentMemory.mathsIncorrect++;

            studentMemory.mathsIncorrectStreak++;

            studentMemory.mathsCorrectStreak = 0;

        }

    }


    // -------------------------------------------------
    // 🧮 INFORMATIONS ADDITION
    // -------------------------------------------------

    if (
        skill === "addition"
    ) {

        const match =
            questionData.question
                ? questionData.question.match(
                    /(\d+)\s*\+\s*(\d+)/
                )
                : null;


        if (
            match
        ) {

            const a =
                parseInt(
                    match[1]
                );


            const b =
                parseInt(
                    match[2]
                );


            const sum =
                a + b;


            if (
                correct &&
                sum >
                studentMemory.mathsHighestCorrectSum
            ) {

                studentMemory.mathsHighestCorrectSum =
                    sum;

            }


            if (
                !correct &&
                (
                    studentMemory.mathsLowestIncorrectSum === null ||
                    sum <
                    studentMemory.mathsLowestIncorrectSum
                )
            ) {

                studentMemory.mathsLowestIncorrectSum =
                    sum;

            }

        }

    }


    // -------------------------------------------------
    // 🕐 RÉSULTAT RÉCENT
    // -------------------------------------------------

    const result = {

        skill:
            skill,

        subject:
            getSkillName(
                skill
            ),

        correct:
            correct,

        question:
            questionData.question,

        studentAnswer:
            String(studentAnswer),

        correctAnswer:
            String(questionData.answer),

        level:
            questionData.level ||
            studentMemory.currentLevel ||
            1,

        sessionId:
            questionData.sessionId ||
            null,

        date:
            now

    };


    studentMemory.recentResults.push(
        result
    );


    // Conserver les 20 derniers résultats
    // globaux.

    if (
        studentMemory.recentResults.length > 20
    ) {

        studentMemory.recentResults =
            studentMemory.recentResults.slice(-20);

    }


    // -------------------------------------------------
    // ❌ ERREUR
    // -------------------------------------------------

    if (
        !correct
    ) {

        const mistake = {

            skill:
                skill,

            subject:
                getSkillName(
                    skill
                ),

            question:
                questionData.question,

            studentAnswer:
                String(studentAnswer),

            correctAnswer:
                String(questionData.answer),

            level:
                questionData.level ||
                studentMemory.currentLevel ||
                1,

            sessionId:
                questionData.sessionId ||
                null,

            date:
                now

        };


        studentMemory.mistakes.push(
            mistake
        );


        // Conserver les 30 dernières erreurs.

        if (
            studentMemory.mistakes.length > 30
        ) {

            studentMemory.mistakes =
                studentMemory.mistakes.slice(-30);

        }


        console.log(
            "❌ Erreur mémorisée :",
            mistake
        );

    }


    // -------------------------------------------------
    // 💾 SAUVEGARDE
    // -------------------------------------------------

    saveStudentMemory();


    console.log(
        "🧠 Réponse mémorisée :",
        result
    );

}


// =====================================================
// 📊 OBTENIR LA MÉMOIRE
// =====================================================

function getStudentMemory() {

    return studentMemory;

}


// =====================================================
// 🧠 OBTENIR UNE COMPÉTENCE
// =====================================================

function getSkillMemory(
    skill
) {

    if (
        !studentMemory.skills[skill]
    ) {

        return null;

    }


    return studentMemory.skills[skill];

}


// =====================================================
// 📈 RÉSULTATS D'UNE COMPÉTENCE
// =====================================================

function getSkillResults(
    skill
) {

    const skillMemory =
        getSkillMemory(
            skill
        );


    if (
        !skillMemory
    ) {

        return [];

    }


    return skillMemory.lastResults;

}


// =====================================================
// ❌ OBTENIR LES ERREURS
// =====================================================

function getMistakes() {

    return studentMemory.mistakes;

}


// =====================================================
// 🤖 COMMENCER UNE SÉANCE
// =====================================================
//
// Le planificateur pourra utiliser cette fonction
// pour créer une séance de 5 exercices.
//
// =====================================================

function startLearningSession(
    level = 1
) {

    const sessionId =

        "session-" +
        Date.now();


    studentMemory.sessions.total++;


    studentMemory.currentSession = {

        id:
            sessionId,

        level:
            Number(level),

        totalExercises:
            5,

        completedExercises:
            0,

        correctAnswers:
            0,

        incorrectAnswers:
            0,

        score:
            0,

        startedAt:
            new Date().toISOString(),

        completedAt:
            null,

        results:
            []

    };


    saveStudentMemory();


    return studentMemory.currentSession;

}


// =====================================================
// 📝 ENREGISTRER UN EXERCICE DE SÉANCE
// =====================================================

function recordSessionExercise(
    questionData,
    studentAnswer
) {

    const session =
        studentMemory.currentSession;


    if (
        !session
    ) {

        return;

    }


    const correct =
        String(studentAnswer) ===
        String(questionData.answer);


    session.completedExercises++;


    if (
        correct
    ) {

        session.correctAnswers++;

        session.score++;

    } else {

        session.incorrectAnswers++;

    }


    session.results.push({

        skill:
            identifySkill(
                questionData
            ),

        question:
            questionData.question,

        correct:
            correct,

        studentAnswer:
            String(studentAnswer),

        correctAnswer:
            String(questionData.answer)

    });


    // Éviter de dépasser 5 exercices.

    if (
        session.completedExercises >=
        session.totalExercises
    ) {

        completeLearningSession();

    }


    saveStudentMemory();

}


// =====================================================
// 🏁 TERMINER UNE SÉANCE
// =====================================================

function completeLearningSession() {

    const session =
        studentMemory.currentSession;


    if (
        !session
    ) {

        return null;

    }


    if (
        session.completedAt
    ) {

        return session;

    }


    session.completedAt =
        new Date().toISOString();


    studentMemory.sessions.completed++;


    // Une séance réussie signifie ici
    // au moins 4 bonnes réponses sur 5.
    //
    // Le planificateur gardera la décision
    // pédagogique finale.

    if (
        session.score >= 4
    ) {

        studentMemory.sessions.successful++;

    }


    studentMemory.sessions.recent.push({

        id:
            session.id,

        level:
            session.level,

        score:
            session.score,

        correct:
            session.correctAnswers,

        incorrect:
            session.incorrectAnswers,

        completedAt:
            session.completedAt

    });


    if (
        studentMemory.sessions.recent.length > 10
    ) {

        studentMemory.sessions.recent =
            studentMemory.sessions.recent.slice(-10);

    }


    saveStudentMemory();


    return session;

}


// =====================================================
// 📊 OBTENIR LA SÉANCE ACTUELLE
// =====================================================

function getCurrentLearningSession() {

    return studentMemory.currentSession;

}


// =====================================================
// 🎯 ENREGISTRER UN NIVEAU OBSERVÉ
// =====================================================
//
// Le planificateur pourra utiliser cette fonction.
// La mémoire ne décide pas elle-même du passage.
// =====================================================

function rememberLevel(
    level
) {

    const safeLevel =
        Math.max(
            1,
            Math.min(
                100,
                Number(level)
            )
        );


    studentMemory.currentLevel =
        safeLevel;


    if (
        safeLevel >
        studentMemory.highestLevelReached
    ) {

        studentMemory.highestLevelReached =
            safeLevel;

    }


    saveStudentMemory();

}


// =====================================================
// 📊 RAPPORT GLOBAL
// =====================================================

function getMemoryReport() {

    const total =
        studentMemory.totalQuestions;


    const percentage =

        total === 0

            ? 0

            : Math.round(
                (
                    studentMemory.correct /
                    total
                ) *
                100
            );


    return {

        general:

            "✅ Bonnes réponses : " +
            studentMemory.correct +

            "\n❌ Erreurs : " +
            studentMemory.incorrect +

            "\n📊 Total : " +
            total +

            "\n🎯 Réussite : " +
            percentage +
            "%",


        reading:

            "📖 Lecture : " +
            studentMemory.readingCorrect +
            " bonne(s) réponse(s) / " +
            studentMemory.readingIncorrect +
            " erreur(s)",


        maths:

            "🧮 Maths : " +
            studentMemory.mathsCorrect +
            " bonne(s) réponse(s) / " +
            studentMemory.mathsIncorrect +
            " erreur(s)",


        skills: {

            reading:
                studentMemory.skills.reading,

            addition:
                studentMemory.skills.addition,

            subtraction:
                studentMemory.skills.subtraction,

            multiplication:
                studentMemory.skills.multiplication,

            comprehension:
                studentMemory.skills.comprehension

        },


        mathsLevel:

            "📈 Plus grande addition réussie : " +
            studentMemory.mathsHighestCorrectSum,


        mathsDifficulty:

            studentMemory.mathsLowestIncorrectSum === null

                ? "🔎 Aucune difficulté détectée."

                : "⚠️ Première difficulté observée autour de : " +
                  studentMemory.mathsLowestIncorrectSum,


        currentLevel:

            "🎯 Niveau mémorisé : " +
            studentMemory.currentLevel,


        highestLevel:

            "🏆 Niveau le plus élevé atteint : " +
            studentMemory.highestLevelReached,


        streak:

            "🔥 Série actuelle : " +
            studentMemory.currentCorrectStreak +
            " réussite(s) consécutive(s)",


        bestStreak:

            "⭐ Meilleure série : " +
            studentMemory.bestCorrectStreak,


        sessions:

            "🤖 Séances terminées : " +
            studentMemory.sessions.completed

    };

}


// =====================================================
// 🔄 RÉINITIALISER LA MÉMOIRE
// =====================================================
//
// Cette fonction remet toute la progression
// pédagogique à zéro.
//
// IMPORTANT :
// Le planificateur devra également remettre son propre
// niveau à zéro lorsqu'il sera adapté à la nouvelle
// architecture.
// =====================================================

function resetStudentMemory() {

    const confirmation =

        confirm(

            "⚠️ Veux-tu vraiment remettre " +
            "la progression de Mama Binta à zéro ?\n\n" +

            "Les scores, les erreurs, les séries " +
            "et les séances seront supprimés."

        );


    if (
        !confirmation
    ) {

        return;

    }


    studentMemory =
        normalizeMemory(
            defaultMemory
        );


    saveStudentMemory();


    // Le niveau du planificateur actuel
    // sera également réinitialisé si la fonction
    // existe déjà.

    if (
        typeof resetMathPlan ===
        "function"
    ) {

        resetMathPlan();

    }


    alert(

        "✅ La progression de Mama Binta " +
        "a été remise à zéro !"

    );


    location.reload();

}


// =====================================================
// 🔍 OUTILS POUR LES AUTRES AGENTS
// =====================================================

function getRecentResults(
    limit = 10
) {

    return studentMemory.recentResults.slice(
        -Math.max(
            1,
            Number(limit)
        )
    );

}


function getRecentSkillResults(
    skill,
    limit = 10
) {

    const results =
        studentMemory.recentResults.filter(
            result =>
                result.skill === skill
        );


    return results.slice(
        -Math.max(
            1,
            Number(limit)
        )
    );

}


function getSkillAccuracy(
    skill
) {

    const skillMemory =
        getSkillMemory(
            skill
        );


    if (
        !skillMemory ||
        skillMemory.total === 0
    ) {

        return null;

    }


    return Math.round(

        (
            skillMemory.correct /
            skillMemory.total
        ) *
        100

    );

}


// =====================================================
// 🚀 INITIALISATION
// =====================================================

console.log(
    "🧠 Mémoire de Mama Binta chargée."
);

console.log(
    "📊 Questions enregistrées :",
    studentMemory.totalQuestions
);

console.log(
    "🎯 Niveau mémorisé :",
    studentMemory.currentLevel
);

console.log(
    "🏆 Niveau maximum atteint :",
    studentMemory.highestLevelReached
);
