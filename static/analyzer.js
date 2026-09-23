// =====================================================
// 🔎 AGENT ANALYSTE DE MAMA BINTA
// =====================================================
// Son rôle : analyser la mémoire de l'élève
// et détecter les matières qui nécessitent
// davantage d'entraînement.
// =====================================================


function analyzeStudent() {

    // Récupérer la mémoire actuelle
    const memory = getStudentMemory();


    // Sécurité
    if (!memory) {

        return {

            status: "inconnu",

            message:
                "Je n'ai pas encore assez de données pour analyser la progression.",

            subject: null

        };
    }


    // Nombre total de réponses
    const total =
        memory.correct +
        memory.incorrect;


    // Si l'élève n'a encore rien fait
    if (total === 0) {

        return {

            status: "début",

            message:
                "Mama Binta vient de commencer. " +
                "Continuons les exercices pour mieux connaître ses progrès.",

            subject: null

        };
    }


    // =================================================
    // CALCUL DES ERREURS
    // =================================================

    const readingErrors =
        memory.readingIncorrect;

    const mathsErrors =
        memory.mathsIncorrect;


    // =================================================
    // DÉTECTION DE LA MATIÈRE AVEC LE PLUS D'ERREURS
    // =================================================

    if (mathsErrors > readingErrors) {

        return {

            status: "attention",

            subject: "Maths",

            message:
                "🧠 L'analyste remarque que Mama Binta " +
                "a actuellement davantage d'erreurs en maths. " +
                "Il serait utile de lui proposer davantage " +
                "d'exercices de maths.",

            readingErrors: readingErrors,

            mathsErrors: mathsErrors

        };
    }


    if (readingErrors > mathsErrors) {

        return {

            status: "attention",

            subject: "Lecture",

            message:
                "🧠 L'analyste remarque que Mama Binta " +
                "a actuellement davantage d'erreurs en lecture. " +
                "Il serait utile de lui proposer davantage " +
                "d'exercices de lecture.",

            readingErrors: readingErrors,

            mathsErrors: mathsErrors

        };
    }


    // =================================================
    // ÉGALITÉ
    // =================================================

    return {

        status: "équilibre",

        subject: null,

        message:
            "🧠 L'analyste ne détecte pas de difficulté " +
            "particulière entre la lecture et les maths.",

        readingErrors: readingErrors,

        mathsErrors: mathsErrors

    };
}
