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

    // ----------------------------------------------------
    // 📡 PRIORITÉ À L'ANALYSE REÇUE PAR LE BUS
    // ----------------------------------------------------

    const receivedAnalysis =
        plannerGetReceivedAnalysis();

    if (receivedAnalysis) {
        return receivedAnalysis;
    }

    // ----------------------------------------------------
    // 🔄 COMPATIBILITÉ AVEC L'ANCIEN FONCTIONNEMENT
    // ----------------------------------------------------

    if (
        typeof analyzeStudent ===
        "function"
    ) {

        return analyzeStudent();
    }

    return null;
}
// ========================================================
// 📡 RÉCEPTION DE L'ANALYSEUR PAR LE BUS
// ========================================================

const PLANNER_ANALYSIS_KEY =
    "mamaBintaPlannerLastAnalysis";

let plannerLastAnalyzerMessage = null;


// --------------------------------------------------------
// 💾 RÉCUPÉRER LA DERNIÈRE ANALYSE REÇUE
// --------------------------------------------------------

function plannerGetReceivedAnalysis() {

    if (
        plannerLastAnalyzerMessage &&
        plannerLastAnalyzerMessage.data
    ) {

        return plannerLastAnalyzerMessage.data;
    }


    try {

        const saved =
            localStorage.getItem(
                PLANNER_ANALYSIS_KEY
            );

        if (!saved) {
            return null;
        }

        return JSON.parse(saved);

    } catch (error) {

        console.log(
            "⚠️ Impossible de récupérer l'analyse reçue du Bus.",
            error
        );

        return null;
    }
}


// --------------------------------------------------------
// 📡 RECEVOIR UN MESSAGE DE L'ANALYSEUR
// --------------------------------------------------------

function plannerReceiveAgentMessage(message) {

    if (!message) {
        return;
    }


    if (
        message.from !== "analyzer" ||
        message.to !== "planner" ||
        message.type !== "analysis_result"
    ) {

        return;
    }


    plannerLastAnalyzerMessage =
        message;


    try {

        localStorage.setItem(
            PLANNER_ANALYSIS_KEY,
            JSON.stringify(
                message.data || {}
            )
        );

    } catch (error) {

        console.log(
            "⚠️ Impossible de mémoriser l'analyse reçue.",
            error
        );
    }


    console.log(
        "📡 Planificateur ← Bus ← Analyseur : analyse reçue.",
        message.data
    );


    // ----------------------------------------------------
    // 📡 ACCUSÉ DE RÉCEPTION
    // ----------------------------------------------------

    if (
        typeof agentSendMessage ===
        "function"
    ) {

        agentSendMessage(
            "planner",
            "analyzer",
            "analysis_received",
            {
                analysisMessageId:
                    message.id || null,

                receivedAt:
                    new Date().toISOString(),

                skillsToPractice:
                    message.data &&
                    Array.isArray(
                        message.data.skillsToPractice
                    )
                        ? message.data.skillsToPractice
                        : []
            },
            "Le Planificateur a reçu et mémorisé l'analyse.",
            "human"
        );
    }


    console.log(
        "📡 Planificateur → Bus → Analyseur : accusé de réception envoyé."
    );
}


// --------------------------------------------------------
// 👂 ÉCOUTER LE BUS
// --------------------------------------------------------

if (
    typeof listenToAgentMessages ===
    "function"
) {

    listenToAgentMessages(
        plannerReceiveAgentMessage
    );

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
// 🧠 ANALYSER LES ERREURS RÉCENTES
// ========================================================

function getPlannerMistakePriority() {

    const analysis =
        plannerGetAnalysis();

    if (
        !analysis ||
        !analysis.mistakesBySkill
    ) {

        return [];
    }

    const mistakesBySkill =
        analysis.mistakesBySkill;

    const priorities = [];

    PLANNER_SKILLS.forEach(
        skill => {

            const mistakes =
                Array.isArray(
                    mistakesBySkill[skill]
                )
                    ? mistakesBySkill[skill]
                    : [];

            if (
                mistakes.length === 0
            ) {
                return;
            }

            priorities.push({
                skill:
                    skill,

                mistakes:
                    mistakes.length
            });

        }
    );

    priorities.sort(
        (a, b) =>
            b.mistakes -
            a.mistakes
    );

    return priorities.map(
        item =>
            item.skill
    );
}


// ========================================================
// 🎯 CIBLES PÉDAGOGIQUES PAR COMPÉTENCE
// ========================================================

function getPlannerSkillTargets() {

    const analysis =
        plannerGetAnalysis();

    if (
        !analysis ||
        !analysis.mistakesBySkill
    ) {
        return [];
    }

    const targets = [];

    PLANNER_SKILLS.forEach(
        skill => {

            const mistakes =
                Array.isArray(
                    analysis.mistakesBySkill[skill]
                )
                    ? analysis.mistakesBySkill[skill]
                    : [];

            if (
                mistakes.length === 0
            ) {
                return;
            }

            const recentMistakes =
                mistakes.slice(-5);

            const levels =
                recentMistakes
                    .map(
                        mistake =>
                            plannerClampLevel(
                                mistake.level
                            )
                    );

            const latestMistake =
                recentMistakes[
                    recentMistakes.length - 1
                ];

            targets.push({

                skill,

                mistakeCount:
                    mistakes.length,

                recentMistakes,

                levels,

                latestLevel:
                    latestMistake
                        ? plannerClampLevel(
                            latestMistake.level
                        )
                        : null,

                priority:
                    mistakes.length
            });
        }
    );

    targets.sort(
        (a, b) =>
            b.priority -
            a.priority
    );

    return targets;
}

// ========================================================
// 🧠 ÉVALUATION DES COMPÉTENCES PAR LE PLANIFICATEUR
// ========================================================
//
// Rôle :
// - Observer l'état de chaque compétence
// - Utiliser les informations fournies par l'Analyseur
// - Identifier les compétences solides, fragiles ou faibles
// - Donner une base plus précise au Planificateur
//
// IMPORTANT :
// Cette fonction NE change PAS le niveau.
// Elle NE modifie PAS la mémoire.
// Elle NE décide PAS seule de progresser ou régresser.
// Elle prépare simplement une évaluation pédagogique.
//
// ========================================================

function getPlannerSkillAssessment(analysis) {

    if (!analysis || !analysis.skills) {
        console.warn("⚠️ Planificateur : aucune donnée de compétence disponible.");
        return {};
    }

    const assessment = {};

    Object.keys(analysis.skills).forEach(skill => {

        const data = analysis.skills[skill] || {};

        const accuracy = Number(data.accuracy || 0);
        const trend = data.trend || "stable";

        let state = "à surveiller";
        let priority = "normale";

        // ------------------------------------------------
        // 🟢 COMPÉTENCE SOLIDE
        // ------------------------------------------------
        if (accuracy >= 80 && trend !== "negative") {
            state = "solide";
            priority = "faible";
        }

        // ------------------------------------------------
        // 🟡 COMPÉTENCE FRAGILE
        // ------------------------------------------------
        else if (accuracy >= 60) {
            state = "fragile";
            priority = "moyenne";
        }

        // ------------------------------------------------
        // 🔴 COMPÉTENCE FAIBLE
        // ------------------------------------------------
        else {
            state = "faible";
            priority = "élevée";
        }

        // Une tendance négative augmente toujours
        // l'attention portée à la compétence.
        if (trend === "negative") {
            priority = "élevée";
        }

        assessment[skill] = {
            accuracy,
            trend,
            state,
            priority
        };
    });

    console.log(
        "🧠 Planificateur — Évaluation des compétences :",
        assessment
    );

    return assessment;
}

// ========================================================
// 🧠 DÉTERMINER LA PRIORITÉ
// ========================================================

function getPlannerPriority() {

    const weakSkills =
        getPlannerWeakSkills();

    const mistakePriority =
        getPlannerMistakePriority();

    const ordered = [];

    function addSkill(skill) {

        if (
            PLANNER_SKILLS.includes(skill) &&
            !ordered.includes(skill)
        ) {

            ordered.push(skill);
        }
    }

    /*
    --------------------------------------------------------
    1️⃣ COMPÉTENCES FAIBLES + ERREURS RÉCENTES
    --------------------------------------------------------
    Une compétence qui est déjà identifiée comme faible
    ET qui présente aussi des erreurs récentes devient
    prioritaire.
    */

    mistakePriority.forEach(
        skill => {

            if (
                weakSkills.includes(skill)
            ) {

                addSkill(skill);
            }
        }
    );

    /*
    --------------------------------------------------------
    2️⃣ AUTRES COMPÉTENCES FAIBLES
    --------------------------------------------------------
    */

    weakSkills.forEach(
        skill => {

            addSkill(skill);

        }
    );

    /*
    --------------------------------------------------------
    3️⃣ ERREURS RÉCENTES
    --------------------------------------------------------
    Une erreur récente peut attirer l'attention même si
    la compétence n'est pas encore classée "faible".
    */

    mistakePriority.forEach(
        skill => {

            addSkill(skill);

        }
    );

    /*
    --------------------------------------------------------
    4️⃣ COMPLÉTER AVEC LES AUTRES COMPÉTENCES
    --------------------------------------------------------
    */

    PLANNER_SKILLS.forEach(
        skill => {

            addSkill(skill);

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

function canRegress(level, score) {
    const safeLevel =
        plannerClampLevel(level);

    const safeScore =
        Number(score) || 0;

    if (
        safeLevel <= MIN_LEVEL
    ) {
        return false;
    }

    // Une session à 4/5 ou 5/5 ne peut jamais
    // provoquer une régression, même si des difficultés
    // anciennes existent dans l'historique.
    if (
        safeScore > 2
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

    const skillAssessment =
    getPlannerSkillAssessment(
        analysis
    );
    
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

                skillAssessment,

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

    alreadyApplied.skillAssessment =
        skillAssessment;

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
            skillAssessment,
           
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
             currentLevel,
             score
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
            skillAssessment,
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
                skillAssessment,
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
            skillAssessment,
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
            skillAssessment,
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
    
        skillAssessment,
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

// 📡 ENVOYER LE PLAN AU GÉNÉRATEUR

// ========================================================

const PLANNER_GENERATOR_PLAN_KEY =

    "mamaBintaPlannerLastGeneratorPlan";

let plannerLastPublishedPlanSignature =

    null;

function publishLearningPlanToGenerator(

    plan

) {

    if (

        !plan ||

        typeof agentSendMessage !==

        "function"

    ) {

        return null;

    }

    /*

       ----------------------------------------------------

       🔐 Éviter d'envoyer exactement le même plan

       plusieurs fois inutilement.

       ----------------------------------------------------

    */

    let signature = "";

    try {

        signature =

            JSON.stringify({

                level:

                    plan.level,

                sessionSize:

                    plan.sessionSize,

                priority:

                    plan.priority,

                analysis:

                    plan.analysis,
                skillAssessment:
                   plan.skillAssessment

            });

    } catch (error) {

        console.warn(

            "⚠️ Impossible de créer la signature du plan.",

            error

        );

        signature =

            String(

                Date.now()

            );

    }

    if (

        signature ===

        plannerLastPublishedPlanSignature

    ) {

        return null;

    }

    plannerLastPublishedPlanSignature =

        signature;

    /*

       ----------------------------------------------------

       💾 Conserver le dernier plan envoyé

       ----------------------------------------------------

    */

    try {

        localStorage.setItem(

            PLANNER_GENERATOR_PLAN_KEY,

            JSON.stringify(

                plan

            )

        );

    } catch (error) {

        console.warn(

            "⚠️ Impossible de mémoriser le plan envoyé au Générateur.",

            error

        );

    }

    /*

       ----------------------------------------------------

       📡 VRAIE COMMUNICATION AGENT → BUS → AGENT

       ----------------------------------------------------

    */

    const message =

        agentSendMessage(

            "planner",

            "generator",

            "learning_plan",

            {

                level:

                    plan.level,

                maxLevel:

                    plan.maxLevel,

                sessionSize:

                    plan.sessionSize,

                priority:

                    Array.isArray(

                        plan.priority

                    )

                        ? plan.priority

                        : [],

                analysis:
    plan.analysis || null,

skillAssessment:
    plan.skillAssessment || null,

levelInfo:
    plan.levelInfo || null

            },

            "Le Planificateur a envoyé le plan pédagogique au Générateur.",

            "human"

        );

    console.log(

        "📡 Planificateur → Bus → Générateur : plan envoyé.",

        message

    );

    return message;

}

// ========================================================

// 📋 PLAN COMPLET — LECTURE + PUBLICATION

// ========================================================

function getLearningPlan() {

    const level =

        getPedagogicalLevel();

    const analysis =

        plannerGetAnalysis();

    const skillAssessment =

        getPlannerSkillAssessment(

            analysis

        );

    const priority =

        getPlannerPriority();

    const plan = {

        level,

        maxLevel:

            MAX_PEDAGOGICAL_LEVEL,

        sessionSize:

            SESSION_SIZE,

        priority,

        analysis,

        skillAssessment,

        levelInfo:

            getPedagogicalLevelInfo(

                level

            )

    };

    /*

       ====================================================

       📡 PUBLICATION VERS LE GÉNÉRATEUR

       ====================================================

       Le Planificateur ne se contente plus de

       retourner son plan.

       Il le transmet réellement au Bus des agents.

       Le Générateur pourra ensuite écouter ce message.

    */

    publishLearningPlanToGenerator(

        plan

    );

    return plan;

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
