// =====================================================
// 🔎 AGENT ANALYSTE DE MAMA BINTA
// =====================================================
// Son rôle :
// analyser la mémoire de l'élève,
// détecter les difficultés,
// et transmettre une recommandation
// au professeur.
// =====================================================


function analyzeStudent() {

    // Récupérer la mémoire actuelle
    const memory = getStudentMemory();


    // Sécurité
    if (!memory) {

        return {

            status: "inconnu",

            subject: null,

            recommendation: null,

            message:
                "Je n'ai pas encore assez de données pour analyser la progression."

        };
    }


    // =================================================
    // NOMBRE TOTAL DE RÉPONSES
    // =================================================

    const total =
        memory.correct +
        memory.incorrect;


    // =================================================
    // AUCUNE DONNÉE
    // =================================================

    if (total === 0) {

        return {

            status: "début",

            subject: null,

            recommendation: null,

            message:
                "Mama Binta vient de commencer. " +
                "Continuons les exercices pour mieux connaître ses progrès."

        };
    }


    // =================================================
    // RÉCUPÉRER LES ERREURS
    // =================================================

    const readingErrors =
        memory.readingIncorrect;

    const mathsErrors =
        memory.mathsIncorrect;


    // =================================================
    // PLUS D'ERREURS EN MATHS
    // =================================================

    if (mathsErrors > readingErrors) {

        return {

            status: "attention",

            subject: "Maths",

            recommendation: {

                subject: "Maths",

                action: "entrainer",

                level: "simple",

                message:
                    "Proposer davantage d'exercices simples de maths."
            },

            message:
                "🧠 L'analyste remarque que Mama Binta " +
                "a actuellement davantage d'erreurs en maths. " +
                "Il recommande au professeur de proposer " +
                "davantage d'exercices simples de maths.",

            readingErrors: readingErrors,

            mathsErrors: mathsErrors

        };
    }


    // =================================================
    // PLUS D'ERREURS EN LECTURE
    // =================================================

    if (readingErrors > mathsErrors) {

        return {

            status: "attention",

            subject: "Lecture",

            recommendation: {

                subject: "Lecture",

                action: "entrainer",

                level: "simple",

                message:
                    "Proposer davantage d'exercices simples de lecture."
            },

            message:
                "🧠 L'analyste remarque que Mama Binta " +
                "a actuellement davantage d'erreurs en lecture. " +
                "Il recommande au professeur de proposer " +
                "davantage d'exercices simples de lecture.",

            readingErrors: readingErrors,

            mathsErrors: mathsErrors

        };
    }


    // =================================================
    // ÉQUILIBRE
    // =================================================

    return {

        status: "équilibre",

        subject: null,

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

        readingErrors: readingErrors,

        mathsErrors: mathsErrors

    };
}
