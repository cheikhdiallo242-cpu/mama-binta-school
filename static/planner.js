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
- fonctionner avec la structure actuelle de memory.js

IMPORTANT :
Le Planificateur est le seul agent qui décide
de la progression pédagogique.

Il ne génère pas les questions.
Il ne corrige pas les réponses.
Il n'explique pas les erreurs.

Compétences :
📖 Lecture
➕ Addition
➖ Soustraction
✖️ Multiplication
🧠 Compréhension
==========================================================
*/


// ========================================================
// 📚 CONFIGURATION
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

    const number = parseInt(level);

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

    // La mémoire conserve également le niveau observé.
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

        level:
            safeLevel,

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
// 🔄 NORMALISER UNE SESSION
// ========================================================
//
// memory.js utilise actuellement :
// - totalExercises
// - completedExercises
// - correctAnswers
// - incorrectAnswers
// - score
// - completedAt
//
// L'ancien planner utilisait :
// - total
// - correct
// - completed
//
// Cette fonction permet aux deux architectures
// de communiquer correctement.
// ========================================================

function normalizePlannerSession(session) {

    if (!session) {
        return null;
    }

    const completedExercises =
        Number(
            session.completedExercises ??
            session.total ??
            0
        );

    const totalExercises =
        Number(
            session.totalExercises ??
            SESSION_SIZE
        );

    const correctAnswers =
        Number(
            session.correctAnswers ??
            session.correct ??
            session.score ??
            0
        );

    const incorrectAnswers =
        Number(
            session.incorrectAnswers ??
            Math.max(
                0,
                completedExercises - correctAnswers
            )
        );

    const score =
        Number(
            session.score ??
            correctAnswers
        );

    /*
    Une session est considérée terminée si :
    - memory.js possède completedAt
    OU
    - les 5 exercices ont été réalisés.
    */
    const completed =
        Boolean(
            session.completedAt
        ) ||
        completedExercises >= totalExercises;

    return {

        ...session,

        total:
            totalExercises,

        correct:
            correctAnswers,

        incorrect:
            incorrectAnswers,

        completedExercises:
            completedExercises,

        totalExercises:
            totalExercises,

        correctAnswers:
            correctAnswers,

        incorrectAnswers:
            incorrectAnswers,

        score:
            score,

        completed:
            completed
    };
}


// ========================================================
// 📈 CALCULER LE SCORE
// ========================================================

function calculateSessionScore(session) {

    const normalized =
        normalizePlannerSession(session);

    if (!normalized) {
        return 0;
    }

    return Math.max(
        0,
        Math.min(
            SESSION_SIZE,
            Number(normalized.score) || 0
        )
    );
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
// 📊 DÉCISION SELON LE SCORE
// ========================================================

function getSessionDecision(score) {

    const safeScore =
        Math.max(
            0,
            Math.min(
                SESSION_SIZE,
                Number(score) || 0
            )
        );

    switch (safeScore) {

        case 5:

            return {

                action:
                    "progresser",

                status:
                    "excellent",

                stars:
                    "⭐⭐⭐⭐⭐"
            };


        case 4:

            return {

                action:
                    "progresser",

                status:
                    "réussite",

                stars:
                    "⭐⭐⭐⭐"
            };


        case 3:

            return {

                action:
                    "consolider",

                status:
                    "consolidation",

                stars:
                    "⭐⭐⭐"
            };


        case 2:

            return {

                action:
                    "renforcer",

                status:
                    "difficulte",

                stars:
                    "⭐⭐"
            };


        case 1:

            return {

                action:
                    "renforcer",

                status:
                    "grande_difficulte",

                stars:
                    "⭐"
            };


        default:

            return {

                action:
                    "renforcer",

                status:
                    "a_reprendre",

                stars:
                    ""
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

    PLANNER_SKILLS.forEach(
        skill => {

            if (
                !ordered.includes(skill)
            ) {

                ordered.push(skill);
            }
        }
    );

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
    skillResults = [],
    sessionId = null
) {

    const history =
        getPlannerHistory();

    /*
    Évite d'enregistrer deux fois exactement
    la même session.
    */
    if (
        sessionId &&
        history.some(
            item =>
                item.sessionId === sessionId
        )
    ) {

        return history;
    }

    history.push({

        sessionId:

            sessionId,

        level:

            plannerClampLevel(level),

        score:

            Number(score) || 0,

        stars:

            getSessionStars(score),

        action:

            decision?.action ||
            "renforcer",

        status:

            decision?.status ||
            "renforcement",

        skillResults:

            Array.isArray(skillResults)
                ? skillResults
                : [],

        date:

            new Date().toISOString()
    });


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


    return limitedHistory;
}


// ========================================================
// 📊 DERNIÈRES SESSIONS D'UN NIVEAU
// ========================================================

function getRecentLevelSessions(
    level,
    number = 3
) {

    const safeLevel =
        plannerClampLevel(level);

    const history =
        getPlannerHistory();

    return history

        .filter(
            session =>
                plannerClampLevel(
                    session.level
                ) === safeLevel
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

    /*
    Une seule mauvaise session
    ne provoque jamais une régression.
    */
    if (
        recent.length < 2
    ) {

        return false;
    }

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

    const safeScore =
        Number(score) || 0;

    return (
        safeScore === 5 ||
        safeScore === 4
    );
}


// ========================================================
// 📉 RÉGRESSION POSSIBLE
// ========================================================

function canRegress(level) {

    const safeLevel =
        plannerClampLevel(level);

    if (
        safeLevel <= MIN_LEVEL
    ) {

        return false;
    }

    return hasPersistentDifficulty(
        safeLevel
    );
}


// ========================================================
// 🧠 MARQUER UNE DÉCISION COMME APPLIQUÉE
// ========================================================
//
// Très important.
//
// Après une session terminée, plusieurs parties de
// l'application peuvent demander le plan pédagogique.
//
// Sans cette protection :
//
// session 4/5
// → niveau 2
// → un autre appel
// → niveau 3
// → un autre appel
// → niveau 4
//
// Ce serait faux.
//
// Une session ne doit faire progresser Mama Binta
// qu'une seule fois.
// ========================================================

function markPlannerDecisionApplied(
    session,
    plan
) {

    if (!session) {
        return;
    }

    session.plannerDecisionApplied =
        true;

    session.plannerDecision = {

        action:
            plan.action,

        status:
            plan.status,

        level:
            plan.level,

        previousLevel:
            plan.previousLevel,

        score:
            plan.score,

        stars:
            plan.stars,

        appliedAt:
            new Date().toISOString()
    };


    /*
    La session est stockée dans memory.js.
    On sauvegarde si la fonction existe.
    */
    if (
        typeof saveStudentMemory === "function"
    ) {

        saveStudentMemory();
    }
}


// ========================================================
// 🔁 RÉCUPÉRER UNE DÉCISION DÉJÀ APPLIQUÉE
// ========================================================

function getAlreadyAppliedPlan(
    session,
    currentLevel,
    priority
) {

    if (
        !session ||
        !session.plannerDecisionApplied ||
        !session.plannerDecision
    ) {

        return null;
    }

    const saved =
        session.plannerDecision;

    return {

        level:
            plannerClampLevel(
                saved.level ??
                currentLevel
            ),

        previousLevel:
            saved.previousLevel,

        action:
            saved.action ||
            "renforcer",

        status:
            saved.status ||
            "renforcement",

        score:
            Number(
                saved.score
            ) || 0,

        stars:
            saved.stars ||
            getSessionStars(
                saved.score
            ),

        priority:

            priority,

        alreadyApplied:
            true,

        message:
            "✅ La décision de cette session a déjà été appliquée."
    };
}


// ========================================================
// 🎯 PLANIFIER LE NIVEAU
// ========================================================

function planLearningLevel() {

    const currentLevel =
        getPedagogicalLevel();

    const rawSession =
        plannerGetCurrentSession();

    const currentSession =
        normalizePlannerSession(
            rawSession
        );

    const analysis =
        plannerGetAnalysis();

    const priority =
        getPlannerPriority();


    // ====================================================
    // 🌱 AUCUNE SESSION
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

            analysis,

            message:
                "🎯 Mama Binta est prête pour une nouvelle session de 5 exercices."
        };
    }


    // ====================================================
    // 🔒 SESSION DÉJÀ TRAITÉE
    // ====================================================

    const alreadyApplied =
        getAlreadyAppliedPlan(
            currentSession,
            currentLevel,
            priority
        );

    if (alreadyApplied) {

        return alreadyApplied;
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

        const completedExercises =
            Number(
                currentSession.completedExercises
            ) || 0;

        return {

            level:
                currentLevel,

            action:
                "continuer_session",

            status:
                "session_en_cours",

            score,

            completedExercises,

            remaining:
                Math.max(
                    0,
                    SESSION_SIZE -
                    completedExercises
                ),

            priority,

            analysis,

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

        const safePreviousLevel =
            savePedagogicalLevel(
                previousLevel
            );

        const plan = {

            level:
                safePreviousLevel,

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

            analysis,

            message:
                "🧠 Cette difficulté se répète. " +
                "Nous allons revenir temporairement au niveau " +
                safePreviousLevel +
                " pour renforcer les bases."
        };


        markPlannerDecisionApplied(
            currentSession,
            plan
        );


        return plan;
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

            const safeNextLevel =
                savePedagogicalLevel(
                    nextLevel
                );

            const plan = {

                level:
                    safeNextLevel,

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

                analysis,

                message:
                    "🌟 Bravo ! Mama Binta a réussi " +
                    score +
                    "/5. " +
                    "Nous passons maintenant progressivement au niveau " +
                    safeNextLevel +
                    "."
            };


            markPlannerDecisionApplied(
                currentSession,
                plan
            );


            return plan;
        }


        // Niveau 100 atteint.

        const plan = {

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

            analysis,

            message:
                "🏆 Mama Binta est arrivée au niveau 100. " +
                "Nous allons maintenant renforcer et approfondir ses compétences."
        };


        markPlannerDecisionApplied(
            currentSession,
            plan
        );


        return plan;
    }


    // ====================================================
    // 🧩 CONSOLIDATION
    // ====================================================

    if (
        score === 3
    ) {

        const plan = {

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

            analysis,

            message:
                "🧠 Mama Binta a réussi 3/5. " +
                "Nous allons rester au niveau " +
                currentLevel +
                " et renforcer les compétences qui ont posé problème."
        };


        markPlannerDecisionApplied(
            currentSession,
            plan
        );


        return plan;
    }


    // ====================================================
    // 🔧 RENFORCEMENT
    // ====================================================

    const plan = {

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

        analysis,

        message:
            "💪 Nous allons rester au niveau " +
            currentLevel +
            " et travailler davantage les compétences difficiles."
    };


    markPlannerDecisionApplied(
        currentSession,
        plan
    );


    return plan;
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
// 📋 PLAN COMPLET — LECTURE SEULE
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

console.log(
    "🔗 Compatible avec la mémoire actuelle :",
    "oui"
);

console.log(
    "🔒 Protection contre les doubles progressions :",
    "active"
);
