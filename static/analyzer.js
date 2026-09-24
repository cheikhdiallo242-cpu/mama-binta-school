// =====================================================
// 🔎 AGENT ANALYSTE DE MAMA BINTA
// =====================================================
// L'analyste observe :
// - les résultats récents
// - les séries de réussites
// - les séries d'erreurs
// - les résultats par matière
//
// Son objectif : déterminer le niveau actuel
// de Mama Binta et conseiller les autres agents.
// =====================================================

function analyzeStudent() {

    const memory =
        getStudentMemory();


    // =================================================
    // 🛑 MÉMOIRE INDISPONIBLE
    // =================================================

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
    // 📊 DONNÉES GÉNÉRALES
    // =================================================

    const total =
        memory.correct +
        memory.incorrect;


    const recentResults =
        Array.isArray(
            memory.recentResults
        )
            ? memory.recentResults
            : [];


    const recentMaths =
        recentResults.filter(
            result =>
                result.subject === "Maths"
        );


    const recentReading =
        recentResults.filter(
            result =>
                result.subject === "Lecture"
        );


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
                "Continuons les exercices pour mieux connaître ses progrès."
        };
    }


    // =================================================
    // 🔎 ANALYSER LES RÉSULTATS RÉCENTS
    // =================================================

    function countRecentErrors(results) {

        return results.filter(
            result =>
                result.correct === false
        ).length;
    }


    function countRecentCorrect(results) {

        return results.filter(
            result =>
                result.correct === true
        ).length;
    }


    const recentMathsErrors =
        countRecentErrors(
            recentMaths
        );


    const recentMathsCorrect =
        countRecentCorrect(
            recentMaths
        );


    const recentReadingErrors =
        countRecentErrors(
            recentReading
        );


    const recentReadingCorrect =
        countRecentCorrect(
            recentReading
        );


    // =================================================
    // 🔥 SÉRIES
    // =================================================

    const mathsCorrectStreak =
        memory.mathsCorrectStreak || 0;


    const mathsIncorrectStreak =
        memory.mathsIncorrectStreak || 0;


    const readingCorrectStreak =
        memory.readingCorrectStreak || 0;


    const readingIncorrectStreak =
        memory.readingIncorrectStreak || 0;


    // =================================================
    // 🧮 MATHS : ERREURS RÉCENTES
    // =================================================

    if (
        recentMathsErrors >= 3 ||
        mathsIncorrectStreak >= 3
    ) {

        return {

            status: "attention",

            subject: "Maths",

            difficulty: "tres_simple",

            recommendation: {

                subject: "Maths",

                action: "entrainer",

                level: "tres_simple",

                message:
                    "Ralentir et proposer des additions très simples."
            },

            message:
                "🔎 L'analyste observe plusieurs erreurs récentes " +
                "en maths. " +
                "Il recommande de revenir temporairement " +
                "à des additions très simples.",

            recentMathsCorrect:
                recentMathsCorrect,

            recentMathsErrors:
                recentMathsErrors
        };
    }


    // =================================================
    // 🧮 MATHS : PROGRESSION
    // =================================================

    if (
        mathsCorrectStreak >= 5 ||
        (
            recentMaths.length >= 4 &&
            recentMathsCorrect >= 4
        )
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
                    "Mama Binta réussit plusieurs exercices de maths. " +
                    "Augmenter progressivement la difficulté."
            },

            message:
                "🌟 L'analyste observe une bonne série " +
                "de réussites en maths. " +
                "Il recommande d'augmenter progressivement " +
                "la difficulté.",

            recentMathsCorrect:
                recentMathsCorrect,

            recentMathsErrors:
                recentMathsErrors
        };
    }


    // =================================================
    // 🧮 MATHS : QUELQUES ERREURS
    // =================================================

    if (
        recentMathsErrors > 0 ||
        memory.mathsIncorrect > memory.mathsCorrect
    ) {

        return {

            status: "attention",

            subject: "Maths",

            difficulty: "simple",

            recommendation: {

                subject: "Maths",

                action: "entrainer",

                level: "simple",

                message:
                    "Continuer avec des exercices simples de maths."
            },

            message:
                "🧠 L'analyste recommande de continuer " +
                "avec des exercices simples de maths " +
                "afin de consolider les bases.",

            recentMathsCorrect:
                recentMathsCorrect,

            recentMathsErrors:
                recentMathsErrors
        };
    }


    // =================================================
    // 📖 LECTURE : ERREURS RÉCENTES
    // =================================================

    if (
        recentReadingErrors >= 3 ||
        readingIncorrectStreak >= 3
    ) {

        return {

            status: "attention",

            subject: "Lecture",

            difficulty: "tres_simple",

            recommendation: {

                subject: "Lecture",

                action: "entrainer",

                level: "tres_simple",

                message:
                    "Ralentir et proposer des exercices de lecture simples."
            },

            message:
                "🔎 L'analyste observe plusieurs erreurs récentes " +
                "en lecture. " +
                "Il recommande de revenir temporairement " +
                "à des exercices très simples.",

            recentReadingCorrect:
                recentReadingCorrect,

            recentReadingErrors:
                recentReadingErrors
        };
    }


    // =================================================
    // 📖 LECTURE : PROGRESSION
    // =================================================

    if (
        readingCorrectStreak >= 5 ||
        (
            recentReading.length >= 4 &&
            recentReadingCorrect >= 4
        )
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
                    "Mama Binta réussit plusieurs exercices de lecture. " +
                    "Augmenter progressivement la difficulté."
            },

            message:
                "🌟 L'analyste observe une bonne série " +
                "de réussites en lecture. " +
                "Il recommande d'augmenter progressivement " +
                "la difficulté.",

            recentReadingCorrect:
                recentReadingCorrect,

            recentReadingErrors:
                recentReadingErrors
        };
    }


    // =================================================
    // 📖 LECTURE : QUELQUES ERREURS
    // =================================================

    if (
        recentReadingErrors > 0 ||
        memory.readingIncorrect >
        memory.readingCorrect
    ) {

        return {

            status: "attention",

            subject: "Lecture",

            difficulty: "simple",

            recommendation: {

                subject: "Lecture",

                action: "entrainer",

                level: "simple",

                message:
                    "Continuer avec des exercices simples de lecture."
            },

            message:
                "🧠 L'analyste recommande de continuer " +
                "avec des exercices simples de lecture " +
                "afin de consolider les bases.",

            recentReadingCorrect:
                recentReadingCorrect,

            recentReadingErrors:
                recentReadingErrors
        };
    }


    // =================================================
    // ⚖️ ÉQUILIBRE
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
            "particulière actuellement. " +
            "Mama Binta peut continuer normalement."
    };
}
