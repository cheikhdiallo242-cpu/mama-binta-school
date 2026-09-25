/*
==========================================================
🧠 MAMA BINTA — ANALYSTE
==========================================================

Rôle :
- Lire les données de la mémoire
- Analyser les 5 compétences
- Identifier forces et difficultés
- Observer les tendances récentes
- Donner des informations au Planificateur

IMPORTANT :
L'Analyste NE décide PAS du niveau.
Le Planificateur prendra cette décision.

Compétences :
📖 reading
➕ addition
➖ subtraction
✖️ multiplication
🧠 comprehension
==========================================================
*/

const ANALYZER_SKILLS = [
    "reading",
    "addition",
    "subtraction",
    "multiplication",
    "comprehension"
];

const ANALYZER_LABELS = {
    reading: "📖 Lecture",
    addition: "➕ Addition",
    subtraction: "➖ Soustraction",
    multiplication: "✖️ Multiplication",
    comprehension: "🧠 Compréhension"
};


/* =========================================================
   OUTILS
========================================================= */

function analyzerClamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


function analyzerGetMemory() {
    if (typeof loadStudentMemory === "function") {
        return loadStudentMemory();
    }

    if (typeof getStudentMemory === "function") {
        return getStudentMemory();
    }

    return null;
}


/* =========================================================
   ANALYSE D'UNE COMPÉTENCE
========================================================= */

function analyzeSkill(skill) {

    const memory = analyzerGetMemory();

    if (!memory) {
        return {
            skill,
            label: ANALYZER_LABELS[skill] || skill,
            accuracy: 0,
            total: 0,
            correct: 0,
            incorrect: 0,
            status: "unknown",
            trend: "unknown",
            recentAccuracy: 0,
            difficulty: "unknown"
        };
    }

    const data =
        memory.skills &&
        memory.skills[skill]
            ? memory.skills[skill]
            : null;

    if (!data) {
        return {
            skill,
            label: ANALYZER_LABELS[skill] || skill,
            accuracy: 0,
            total: 0,
            correct: 0,
            incorrect: 0,
            status: "unknown",
            trend: "unknown",
            recentAccuracy: 0,
            difficulty: "unknown"
        };
    }

    const total = Number(data.total) || 0;
    const correct = Number(data.correct) || 0;
    const incorrect = Number(data.incorrect) || 0;

    const accuracy =
        total > 0
            ? Math.round((correct / total) * 100)
            : 0;


    /* -----------------------------------------------------
       Résultats récents
    ----------------------------------------------------- */

    let recentResults = [];

    if (Array.isArray(memory.recentResults)) {

        recentResults = memory.recentResults
            .filter(result => result.skill === skill)
            .slice(-5);
    }

    const recentTotal = recentResults.length;

    const recentCorrect = recentResults.filter(
        result => result.correct === true
    ).length;

    const recentAccuracy =
        recentTotal > 0
            ? Math.round((recentCorrect / recentTotal) * 100)
            : 0;


    /* -----------------------------------------------------
       Statut général
    ----------------------------------------------------- */

    let status = "insufficient_data";

    if (total >= 3) {

        if (accuracy >= 80) {
            status = "strong";
        }
        else if (accuracy >= 60) {
            status = "developing";
        }
        else {
            status = "needs_support";
        }
    }


    /* -----------------------------------------------------
       Difficulté
    ----------------------------------------------------- */

    let difficulty = "unknown";

    if (total >= 3) {

        if (accuracy >= 80) {
            difficulty = "low";
        }
        else if (accuracy >= 60) {
            difficulty = "medium";
        }
        else {
            difficulty = "high";
        }
    }


    /* -----------------------------------------------------
       Tendance récente
    ----------------------------------------------------- */

    let trend = "stable";

    if (recentTotal >= 3) {

        if (recentAccuracy >= 80) {
            trend = "improving";
        }
        else if (recentAccuracy <= 40) {
            trend = "declining";
        }
    }


    /* -----------------------------------------------------
       Streak
    ----------------------------------------------------- */

    const currentCorrectStreak =
        Number(data.currentCorrectStreak) || 0;

    const currentIncorrectStreak =
        Number(data.currentIncorrectStreak) || 0;


    return {

        skill,

        label:
            ANALYZER_LABELS[skill] ||
            skill,

        total,

        correct,

        incorrect,

        accuracy,

        recentTotal,

        recentCorrect,

        recentAccuracy,

        status,

        difficulty,

        trend,

        currentCorrectStreak,

        currentIncorrectStreak
    };
}


/* =========================================================
   ANALYSE DE TOUTES LES COMPÉTENCES
========================================================= */

function analyzeAllSkills() {

    const analysis = {};

    ANALYZER_SKILLS.forEach(skill => {
        analysis[skill] = analyzeSkill(skill);
    });

    return analysis;
}


/* =========================================================
   IDENTIFIER LES FORCES
========================================================= */

function getStrongSkills() {

    const analysis = analyzeAllSkills();

    return ANALYZER_SKILLS.filter(skill => {

        return (
            analysis[skill].status === "strong"
        );

    });
}


/* =========================================================
   IDENTIFIER LES DIFFICULTÉS
========================================================= */

function getWeakSkills() {

    const analysis = analyzeAllSkills();

    return ANALYZER_SKILLS.filter(skill => {

        return (
            analysis[skill].status === "needs_support"
        );

    });
}


/* =========================================================
   IDENTIFIER LES COMPÉTENCES À RENFORCER
========================================================= */

function getSkillsToPractice() {

    const analysis = analyzeAllSkills();

    return ANALYZER_SKILLS
        .filter(skill => {

            const data = analysis[skill];

            return (
                data.status === "needs_support" ||
                data.trend === "declining"
            );

        })
        .sort((a, b) => {

            const accuracyA =
                analysis[a].accuracy;

            const accuracyB =
                analysis[b].accuracy;

            return accuracyA - accuracyB;
        });
}


/* =========================================================
   ANALYSE DE LA SESSION RÉCENTE
========================================================= */

function analyzeRecentSession() {

    const memory = analyzerGetMemory();

    if (!memory || !Array.isArray(memory.recentResults)) {

        return {
            total: 0,
            correct: 0,
            incorrect: 0,
            accuracy: 0
        };
    }

    const results =
        memory.recentResults.slice(-5);

    const total = results.length;

    const correct =
        results.filter(
            result => result.correct === true
        ).length;

    const incorrect =
        total - correct;

    const accuracy =
        total > 0
            ? Math.round((correct / total) * 100)
            : 0;

    return {
        total,
        correct,
        incorrect,
        accuracy
    };
}


/* =========================================================
   ANALYSE GÉNÉRALE
========================================================= */

function analyzeStudent() {

    const memory = analyzerGetMemory();

    const skills = analyzeAllSkills();

    const strongSkills = getStrongSkills();

    const weakSkills = getWeakSkills();

    const skillsToPractice =
        getSkillsToPractice();

    const recentSession =
        analyzeRecentSession();


    let overallAccuracy = 0;

    if (memory) {

        const total =
            Number(memory.total) || 0;

        const correct =
            Number(memory.correct) || 0;

        if (total > 0) {

            overallAccuracy =
                Math.round(
                    (correct / total) * 100
                );
        }
    }


    return {

        overallAccuracy,

        skills,

        strongSkills,

        weakSkills,

        skillsToPractice,

        recentSession,

        currentLevel:
            memory &&
            Number(memory.currentLevel)
                ? Number(memory.currentLevel)
                : 1,

        highestLevelReached:
            memory &&
            Number(memory.highestLevelReached)
                ? Number(memory.highestLevelReached)
                : 1
    };
}


/* =========================================================
   MESSAGE HUMAIN
========================================================= */

function getAnalyzerMessage() {

    const analysis =
        analyzeStudent();

    const weak =
        analysis.skillsToPractice;

    if (weak.length === 0) {

        return "Mama Binta montre une progression équilibrée. 🌟";
    }

    const firstSkill = weak[0];

    const label =
        ANALYZER_LABELS[firstSkill] ||
        firstSkill;

    return (
        label +
        " est actuellement la compétence " +
        "qui mérite le plus d'attention."
    );
}


/* =========================================================
   RAPPORT POUR L'INTERFACE
========================================================= */

function getAnalysisReport() {

    const analysis =
        analyzeStudent();

    return {

        niveau:
            analysis.currentLevel,

        meilleurNiveau:
            analysis.highestLevelReached,

        precision:
            analysis.overallAccuracy,

        pointsForts:
            analysis.strongSkills.map(
                skill =>
                    ANALYZER_LABELS[skill]
            ),

        difficultes:
            analysis.weakSkills.map(
                skill =>
                    ANALYZER_LABELS[skill]
            ),

        aRenforcer:
            analysis.skillsToPractice.map(
                skill =>
                    ANALYZER_LABELS[skill]
            ),

        sessionRecente:
            analysis.recentSession
    };
}


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "🧠 Analyste Mama Binta chargé."
);

console.log(
    "Compétences analysées :",
    ANALYZER_SKILLS
);
