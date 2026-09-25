/*
==========================================================
🎯 MAMA BINTA — PLANIFICATEUR PÉDAGOGIQUE
==========================================================

Rôle :
- gérer les niveaux 1 → 100
- décider : progresser / consolider / renforcer / régresser
- analyser les sessions de 5 exercices
- tenir compte des 5 compétences
- ne jamais sauter de niveau

IMPORTANT :
Le Planificateur est le seul agent qui décide
de la progression pédagogique.

Il ne génère pas les questions.
Il ne corrige pas les réponses.
Il n'explique pas les erreurs.

Architecture :

🧠 Mémoire
      ↓
🔎 Analyste
      ↓
🎯 Planificateur
      ↓
🤖 Générateur

Compétences :

📖 Lecture
➕ Addition
➖ Soustraction
✖️ Multiplication
🧠 Compréhension
==========================================================
*/


// ========================================================
// 📚 CONFIGURATION GÉNÉRALE
// ========================================================

const MAX_PEDAGOGICAL_LEVEL = 100;

const SESSION_SIZE = 5;

const MIN_LEVEL = 1;


// ========================================================
// 💾 CLÉS DE STOCKAGE
// ========================================================

const PEDAGOGICAL_LEVEL_KEY =
    "mamaBintaPedagogicalLevel";

const PEDAGOGICAL_HISTORY_KEY =
    "mamaBintaPedagogicalHistory";


// ========================================================
// 🎯 COMPÉTENCES
// ========================================================

const PLANNER_SKILLS = [
    "reading",
    "addition",
    "subtraction",
    "multiplication",
    "comprehension"
];


// ========================================================
// 🛠️ OUTILS
// ========================================================

function plannerClampLevel(level) {

    const number =
        parseInt(level);

    if (isNaN(number)) {
        return MIN_LEVEL;
    }

    return Math.max(
        MIN_LEVEL,
        Math.min(
            MAX_PEDAGOGICAL_LEVEL,
            number
        )
    );
}


// ========================================================
// 💾 NIVEAU ACTUEL
// ========================================================

function getPedagogicalLevel() {

    try {

        const saved =
            localStorage.getItem(
                PEDAGOGICAL_LEVEL_KEY
            );

        if (saved !== null) {

            return plannerClampLevel(saved);
        }

    } catch (error) {

        console.log(
            "⚠️ Impossible de récupérer le niveau pédagogique.",
            error
        );
    }

    return MIN_LEVEL;
}


// ========================================================
// 💾 SAUVEGARDER LE NIVEAU
// ========================================================

function savePedagogicalLevel(level) {

    const safeLevel =
        plannerClampLevel(level);

    try {

        localStorage.setItem(
            PEDAGOGICAL_LEVEL_KEY,
            String(safeLevel)
        );

    } catch (error) {

        console.log(
            "⚠️ Impossible de sauvegarder le niveau pédagogique.",
            error
        );
    }

    if (
        typeof rememberLevel === "function"
    ) {

        rememberLevel(
            safeLevel
        );
    }

    return safeLevel;
}


// ========================================================
// 📚 INFORMATIONS D'UN NIVEAU
// ========================================================

function getPedagogicalLevelInfo(level) {

    const safeLevel =
        plannerClampLevel(level);

    return {

        level: safeLevel,

        sessionSize:
            SESSION_SIZE,

        isFirstLevel:
            safeLevel === MIN_LEVEL,

        isFinalLevel:
            safeLevel === MAX_PEDAGOGICAL_LEVEL
    };
}


// ========================================================
// 📊 RÉCUPÉRER L'ANALYSE
// ========================================================

function plannerGetAnalysis() {

    if (
        typeof analyzeStudent === "function"
    ) {

        return analyzeStudent();
    }

    return null;
}


// ========================================================
// 🧠 RÉCUPÉRER LA SESSION COURANTE
// ========================================================

function plannerGetCurrentSession() {

    if (
        typeof getCurrentLearningSession === "function"
    ) {

        return getCurrentLearningSession();
    }

    return null;
}


// ========================================================
// 📈 CALCULER LE SCORE
// ========================================================

function calculateSessionScore(session) {

    if (!session) {
        return 0;
    }

    return Number(
        session.correct
    ) || 0;
}


// ========================================================
// ⭐ ÉTOILES
// ========================================================

function getSessionStars(score) {

    const safeScore =
        Math.max(
            0,
            Math.min(
                SESSION_SIZE,
                Number(score) || 0
            )
        );

    return "⭐".repeat(
        safeScore
    );
}


// ========================================================
// 📊 ÉTAT D'UNE SESSION
// ========================================================

function getSessionDecision(score) {

    switch (score) {

        case 5:

            return {
                action: "progresser",
                status: "excellent",
                stars: "⭐⭐⭐⭐⭐"
            };


        case 4:

            return {
                action: "progresser",
                status: "réussite",
                stars: "⭐⭐⭐⭐"
            };


        case 3:

            return {
                action: "consolider",
                status: "consolidation",
                stars: "⭐⭐⭐"
            };


        case 2:

            return {
                action: "renforcer",
                status: "difficulte",
                stars: "⭐⭐"
            };


        case 1:

            return {
                action: "renforcer",
                status: "grande_difficulte",
                stars: "⭐"
            };


        default:

            return {
                action: "renforcer",
                status: "a_reprendre",
                stars: ""
            };
    }
}


// ========================================================
// 🔎 ANALYSER LES FAIBLESSES
// ========================================================

function getPlannerWeakSkills() {

    const analysis =
        plannerGetAnalysis();

    if (
        !analysis ||
        !Array.isArray(
            analysis.skillsToPractice
        )
    ) {

        return [];
    }

    return analysis.skillsToPractice;
}


// ========================================================
// 🧠 DÉTERMINER LA PRIORITÉ
// ========================================================

function getPlannerPriority() {

    const weakSkills =
        getPlannerWeakSkills();

    if (
        weakSkills.length === 0
    ) {

        return PLANNER_SKILLS.slice();
    }

    const ordered =
        weakSkills.slice();

    PLANNER_SKILLS.forEach(skill => {

        if (
            !ordered.includes(skill)
        ) {

            ordered.push(skill);
        }

    });

    return ordered;
}


// ========================================================
// 🔴 HISTORIQUE DES SESSIONS
// ========================================================

function getPlannerHistory() {

    try {

        const raw =
            localStorage.getItem(
                PEDAGOGICAL_HISTORY_KEY
            );

        if (!raw) {
            return [];
        }

        const history =
            JSON.parse(raw);

        return Array.isArray(history)
            ? history
            : [];

    } catch (error) {

        console.log(
            "⚠️ Impossible de lire l'historique pédagogique.",
            error
        );

        return [];
    }
}


// ========================================================
// 💾 SAUVEGARDER UNE DÉCISION DE SESSION
// ========================================================

function savePlannerSessionResult(
    level,
    score,
    decision,
    skillResults = []
) {

    const history =
        getPlannerHistory();

    history.push({

        level,

        score,

        stars:
            getSessionStars(score),

        action:
            decision.action,

        status:
            decision.status,

        skillResults,

        date:
            new Date().toISOString()
    });


    // On conserve uniquement les 20 dernières sessions.

    const limitedHistory =
        history.slice(-20);


    try {

        localStorage.setItem(
            PEDAGOGICAL_HISTORY_KEY,
            JSON.stringify(
                limitedHistory
            )
        );

    } catch (error) {

        console.log(
            "⚠️ Impossible de sauvegarder l'historique pédagogique.",
            error
        );
    }
}


// ========================================================
// 📊 DERNIÈRES SESSIONS D'UN NIVEAU
// ========================================================

function getRecentLevelSessions(
    level,
    number = 3
) {

    const history =
        getPlannerHistory();

    return history
        .filter(
            session =>
                session.level === level
        )
        .slice(-number);
}


// ========================================================
// 📉 DIFFICULTÉ PERSISTANTE
// ========================================================

function hasPersistentDifficulty(level) {

    const recent =
        getRecentLevelSessions(
            level,
            3
        );


    // Une seule mauvaise session ne suffit PAS.

    if (
        recent.length < 2
    ) {

        return false;
    }


    /*
    Pour régresser, il faut au moins deux
    sessions récentes difficiles.

    Exemple :

    Session 1 → 2/5
    Session 2 → 1/5

    → difficulté persistante.

    Une seule session à 1/5
    ne provoque donc pas immédiatement
    une régression.
    */

    const difficultSessions =
        recent.filter(
            session =>
                Number(session.score) <= 2
        );


    return (
        difficultSessions.length >= 2
    );
}


// ========================================================
// 📈 PROGRESSION POSSIBLE
// ========================================================

function canProgressFromSession(score) {

    return (
        score === 5 ||
        score === 4
    );
}


// ========================================================
// 📉 RÉGRESSION POSSIBLE
// ========================================================

function canRegress(
    level
) {

    if (
        level <= MIN_LEVEL
    ) {

        return false;
    }

    return hasPersistentDifficulty(
        level
    );
}


// ========================================================
// 🎯 PLANIFIER LE NIVEAU
// ========================================================

function planLearningLevel() {

    const currentLevel =
        getPedagogicalLevel();


    const currentSession =
        plannerGetCurrentSession();


    const analysis =
        plannerGetAnalysis();


    const priority =
        getPlannerPriority();


    // ====================================================
    // 🌱 PREMIER NIVEAU
    // ====================================================

    if (!currentSession) {

        return {

            level:
                currentLevel,

            action:
                "apprendre",

            status:
                "en_attente",

            sessionSize:
                SESSION_SIZE,

            priority,

            message:
                "🎯 Mama Binta est prête pour une nouvelle session de 5 exercices."
        };
    }


    // ====================================================
    // 📊 SESSION EN COURS
    // ====================================================

    if (
        !currentSession.completed
    ) {

        const score =
            calculateSessionScore(
                currentSession
            );

        return {

            level:
                currentLevel,

            action:
                "continuer_session",

            status:
                "session_en_cours",

            score,

            remaining:
                SESSION_SIZE -
                (
                    Number(
                        currentSession.total
                    ) || 0
                ),

            priority,

            message:
                "🧠 La session est en cours. Continuons les exercices."
        };
    }


    // ====================================================
    // ⭐ SESSION TERMINÉE
    // ====================================================

    const score =
        calculateSessionScore(
            currentSession
        );


    const decision =
        getSessionDecision(
            score
        );


    // ====================================================
    // 📉 DIFFICULTÉ PERSISTANTE
    // ====================================================

    if (
        canRegress(
            currentLevel
        )
    ) {

        const previousLevel =
            Math.max(
                MIN_LEVEL,
                currentLevel - 1
            );


        savePedagogicalLevel(
            previousLevel
        );


        return {

            level:
                previousLevel,

            previousLevel:
                currentLevel,

            action:
                "regresser",

            status:
                "regression",

            score,

            stars:
                getSessionStars(
                    score
                ),

            priority,

            message:
                "🧠 Cette difficulté se répète. " +
                "Nous allons revenir temporairement au niveau " +
                previousLevel +
                " pour renforcer les bases."
        };
    }


    // ====================================================
    // 📈 PROGRESSION
    // ====================================================

    if (
        canProgressFromSession(
            score
        )
    ) {

        if (
            currentLevel <
            MAX_PEDAGOGICAL_LEVEL
        ) {

            const nextLevel =
                currentLevel + 1;


            savePedagogicalLevel(
                nextLevel
            );


            return {

                level:
                    nextLevel,

                previousLevel:
                    currentLevel,

                action:
                    "progresser",

                status:
                    "progression",

                score,

                stars:
                    getSessionStars(
                        score
                    ),

                priority,

                message:
                    "🌟 Bravo ! Mama Binta a réussi " +
                    score +
                    "/5. " +
                    "Nous pouvons passer progressivement au niveau " +
                    nextLevel +
                    "."
            };
        }


        // Niveau 100 atteint.

        return {

            level:
                MAX_PEDAGOGICAL_LEVEL,

            action:
                "maitriser",

            status:
                "niveau_maximum",

            score,

            stars:
                getSessionStars(
                    score
                ),

            priority,

            message:
                "🏆 Mama Binta est arrivée au niveau 100. " +
                "Nous allons maintenant renforcer et approfondir ses compétences."
        };
    }


    // ====================================================
    // 🧩 CONSOLIDATION
    // ====================================================

    if (
        score === 3
    ) {

        return {

            level:
                currentLevel,

            action:
                "consolider",

            status:
                "consolidation",

            score,

            stars:
                getSessionStars(
                    score
                ),

            priority,

            message:
                "🧠 Mama Binta a réussi 3/5. " +
                "Nous allons rester au niveau " +
                currentLevel +
                " et renforcer les compétences qui ont posé problème."
        };
    }


    // ====================================================
    // 🔧 RENFORCEMENT
    // ====================================================

    return {

        level:
            currentLevel,

        action:
            "renforcer",

        status:
            "renforcement",

        score,

        stars:
            getSessionStars(
                score
            ),

        priority,

        message:
            "💪 Nous allons rester au niveau " +
            currentLevel +
            " et travailler davantage les compétences difficiles."
    };
}


// ========================================================
// 🚀 DÉMARRER UNE NOUVELLE SESSION
// ========================================================

function startPlannedLearningSession() {

    const level =
        getPedagogicalLevel();


    if (
        typeof startLearningSession !== "function"
    ) {

        console.log(
            "⚠️ startLearningSession() est indisponible."
        );

        return null;
    }


    return startLearningSession(
        level
    );
}


// ========================================================
// 📋 PLAN COMPLET
// ========================================================

function getLearningPlan() {

    const level =
        getPedagogicalLevel();

    const analysis =
        plannerGetAnalysis();

    const priority =
        getPlannerPriority();

    return {

        level,

        maxLevel:
            MAX_PEDAGOGICAL_LEVEL,

        sessionSize:
            SESSION_SIZE,

        priority,

        analysis,

        levelInfo:
            getPedagogicalLevelInfo(
                level
            )
    };
}


// ========================================================
// 🔄 RÉINITIALISATION
// ========================================================

function resetLearningPlan() {

    try {

        localStorage.removeItem(
            PEDAGOGICAL_LEVEL_KEY
        );

        localStorage.removeItem(
            PEDAGOGICAL_HISTORY_KEY
        );

    } catch (error) {

        console.log(
            "⚠️ Impossible de réinitialiser le planificateur.",
            error
        );
    }


    savePedagogicalLevel(
        MIN_LEVEL
    );


    console.log(
        "🔄 Planificateur pédagogique remis au niveau 1."
    );
}


// ========================================================
// 🔄 COMPATIBILITÉ AVEC L'ANCIENNE INTERFACE
// ========================================================
//
// L'ancien index.html utilisait getMathPlan()
// et resetMathPlan().
//
// On garde ces fonctions temporairement pour
// éviter de casser l'application avant la refonte
// de index.html.
//
// Elles seront progressivement remplacées par
// getLearningPlan() et planLearningLevel().
// ========================================================

function getMathPlan() {

    const plan =
        planLearningLevel();

    return {

        level:
            plan.level,

        minSum:
            1,

        maxSum:
            plan.level * 10,

        status:
            plan.status,

        action:
            plan.action,

        previousLevel:
            plan.previousLevel,

        message:
            plan.message,

        score:
            plan.score,

        stars:
            plan.stars
    };
}


function resetMathPlan() {

    resetLearningPlan();
}


// ========================================================
// 🧪 DIAGNOSTIC
// ========================================================

console.log(
    "🎯 Planificateur pédagogique Mama Binta chargé."
);

console.log(
    "📚 Niveaux disponibles : 1 →",
    MAX_PEDAGOGICAL_LEVEL
);

console.log(
    "📝 Exercices par session :",
    SESSION_SIZE
);
