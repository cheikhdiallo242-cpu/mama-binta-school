// =====================================================
// 🔎 AGENT ANALYSTE DE MAMA BINTA
// =====================================================
// Son rôle :
// analyser les erreurs ET les réussites,
// déterminer le niveau actuel,
// puis transmettre une recommandation
// au professeur et au générateur.
// =====================================================

function analyzeStudent() {

    const memory = getStudentMemory();

    if (!memory) {
        return {
            status: "inconnu",
            subject: null,
            difficulty: null,
            recommendation: null,
            message:
                "Je n'ai pas encore assez de données pour analyser la progression."
        };
    }


    // =================================================
    // 📊 DONNÉES
    // =================================================

    const total =
        memory.correct +
        memory.incorrect;

    const readingCorrect =
        memory.readingCorrect;

    const readingErrors =
        memory.readingIncorrect;

    const mathsCorrect =
        memory.mathsCorrect;

    const mathsErrors =
        memory.mathsIncorrect;


    // =================================================
    // 🟢 DÉBUT
    // =================================================

    if (total === 0) {

        return {
            status: "début",
            subject: null,
            difficulty: "normal",
            recommendation: null,

            message:
                "Mama Binta vient de commencer. " +
                "Continuons les exercices pour mieux connaître ses progrès.",

            readingCorrect: readingCorrect,
            readingErrors: readingErrors,
            mathsCorrect: mathsCorrect,
            mathsErrors: mathsErrors
        };
    }


    // =================================================
    // 🧮 MATHS PRIORITAIRES
    // =================================================

    if (mathsErrors > readingErrors) {

        let difficulty = "simple";

        let message =
            "🧠 L'analyste remarque que Mama Binta " +
            "a actuellement davantage d'erreurs en maths.";


        // ---------------------------------------------
        // 🔴 BEAUCOUP D'ERREURS
        // ---------------------------------------------

        if (mathsErrors >= 5) {

            difficulty = "tres_simple";

            message +=
                " Plusieurs erreurs ont été enregistrées. " +
                "Il vaut mieux revenir à des additions très simples " +
                "pour consolider les bases.";
        }


        // ---------------------------------------------
        // 🟡 QUELQUES ERREURS
        // ---------------------------------------------

        else if (mathsErrors >= 3) {

            difficulty = "simple";

            message +=
                " Quelques erreurs ont été enregistrées. " +
                "Le niveau doit rester simple.";
        }


        // ---------------------------------------------
        // 🟢 PEU D'ERREURS
        // ---------------------------------------------

        else {

            difficulty = "normal";

            message +=
                " Les difficultés restent limitées. " +
                "Le niveau normal peut être conservé.";
        }


        return {
            status: "attention",
            subject: "Maths",
            difficulty: difficulty,

            recommendation: {
                subject: "Maths",
                action: "entrainer",
                level: difficulty,
                message:
                    "Adapter les exercices de maths au niveau actuel."
            },

            message: message,

            readingCorrect: readingCorrect,
            readingErrors: readingErrors,
            mathsCorrect: mathsCorrect,
            mathsErrors: mathsErrors
        };
    }


    // =================================================
    // 📖 LECTURE PRIORITAIRE
    // =================================================

    if (readingErrors > mathsErrors) {

        let difficulty = "simple";

        let message =
            "🧠 L'analyste remarque que Mama Binta " +
            "a actuellement davantage d'erreurs en lecture.";


        if (readingErrors >= 5) {

            difficulty = "tres_simple";

            message +=
                " Plusieurs erreurs ont été enregistrées. " +
                "Il vaut mieux revenir à des exercices très simples " +
                "pour consolider les bases.";
        }


        else if (readingErrors >= 3) {

            difficulty = "simple";

            message +=
                " Quelques erreurs ont été enregistrées. " +
                "Le niveau doit rester simple.";
        }


        else {

            difficulty = "normal";

            message +=
                " Les difficultés restent limitées. " +
                "Le niveau normal peut être conservé.";
        }


        return {
            status: "attention",
            subject: "Lecture",
            difficulty: difficulty,

            recommendation: {
                subject: "Lecture",
                action: "entrainer",
                level: difficulty,
                message:
                    "Adapter les exercices de lecture au niveau actuel."
            },

            message: message,

            readingCorrect: readingCorrect,
            readingErrors: readingErrors,
            mathsCorrect: mathsCorrect,
            mathsErrors: mathsErrors
        };
    }


    // =================================================
    // 🌟 BEAUCOUP DE RÉUSSITES EN MATHS
    // =================================================

    if (
        mathsCorrect >= 5 &&
        mathsCorrect > mathsErrors
    ) {

        return {
            status: "progression",
            subject: "Maths",
            difficulty: "difficile",

            recommendation: {
                subject: "Maths",
                action: "progresser",
                level: "difficile",
                message:
                    "Mama Binta réussit bien les maths. " +
                    "Augmenter progressivement la difficulté."
            },

            message:
                "🌟 L'analyste remarque que Mama Binta " +
                "réussit actuellement bien les maths. " +
                "Il recommande d'augmenter progressivement " +
                "la difficulté des exercices.",

            readingCorrect: readingCorrect,
            readingErrors: readingErrors,
            mathsCorrect: mathsCorrect,
            mathsErrors: mathsErrors
        };
    }


    // =================================================
    // 🌟 BEAUCOUP DE RÉUSSITES EN LECTURE
    // =================================================

    if (
        readingCorrect >= 5 &&
        readingCorrect > readingErrors
    ) {

        return {
            status: "progression",
            subject: "Lecture",
            difficulty: "difficile",

            recommendation: {
                subject: "Lecture",
                action: "progresser",
                level: "difficile",
                message:
                    "Mama Binta réussit bien la lecture. " +
                    "Augmenter progressivement la difficulté."
            },

            message:
                "🌟 L'analyste remarque que Mama Binta " +
                "réussit actuellement bien la lecture. " +
                "Il recommande d'augmenter progressivement " +
                "la difficulté des exercices.",

            readingCorrect: readingCorrect,
            readingErrors: readingErrors,
            mathsCorrect: mathsCorrect,
            mathsErrors: mathsErrors
        };
    }


    // =================================================
    // ⚖️ SITUATION ÉQUILIBRÉE
    // =================================================

    return {
        status: "équilibre",
        subject: null,
        difficulty: "normal",

        recommendation: {
            subject: "Général",
            action: "continuer",
            level: "normal",
            message:
                "Continuer les exercices normalement."
        },

        message:
            "🧠 L'analyste ne détecte pas de difficulté " +
            "particulière entre la lecture et les maths.",

        readingCorrect: readingCorrect,
        readingErrors: readingErrors,
        mathsCorrect: mathsCorrect,
        mathsErrors: mathsErrors
    };
}
