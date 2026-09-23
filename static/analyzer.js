// =====================================================
// 🔎 AGENT ANALYSTE DE MAMA BINTA
// =====================================================
// Son rôle :
// analyser la mémoire de l'élève,
// détecter les difficultés précises,
// et transmettre une recommandation
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

    const total =
        memory.correct +
        memory.incorrect;

    // ==========================================
    // 🟢 AUCUNE DONNÉE
    // ==========================================

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

    const readingErrors =
        memory.readingIncorrect;

    const mathsErrors =
        memory.mathsIncorrect;

    // ==========================================
    // 🧮 DIFFICULTÉ EN MATHS
    // ==========================================

    if (mathsErrors > readingErrors) {

        let difficulty = "simple";
        let message =
            "🧠 L'analyste remarque que Mama Binta " +
            "a actuellement davantage d'erreurs en maths.";

        if (mathsErrors >= 5) {

            difficulty = "tres_simple";

            message +=
                " Plusieurs erreurs ont été enregistrées. " +
                "Il vaut mieux revenir à des additions très simples " +
                "pour consolider les bases.";

        } else if (mathsErrors >= 3) {

            difficulty = "simple";

            message +=
                " L'analyste recommande de continuer avec " +
                "des exercices simples de maths.";

        } else {

            difficulty = "normal";

            message +=
                " Les difficultés restent légères. " +
                "On peut continuer avec des exercices normaux.";
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
            readingErrors: readingErrors,
            mathsErrors: mathsErrors
        };
    }

    // ==========================================
    // 📖 DIFFICULTÉ EN LECTURE
    // ==========================================

    if (readingErrors > mathsErrors) {

        let difficulty = "simple";

        let message =
            "🧠 L'analyste remarque que Mama Binta " +
            "a actuellement davantage d'erreurs en lecture.";

        if (readingErrors >= 5) {

            difficulty = "tres_simple";

            message +=
                " Plusieurs erreurs ont été enregistrées. " +
                "Il vaut mieux revenir à des mots très simples " +
                "pour consolider les bases.";

        } else if (readingErrors >= 3) {

            difficulty = "simple";

            message +=
                " L'analyste recommande de continuer avec " +
                "des exercices simples de lecture.";

        } else {

            difficulty = "normal";

            message +=
                " Les difficultés restent légères. " +
                "On peut continuer avec des exercices normaux.";
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
            readingErrors: readingErrors,
            mathsErrors: mathsErrors
        };
    }

    // ==========================================
    // ⚖️ DIFFICULTÉS ÉQUIVALENTES
    // ==========================================

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
        readingErrors: readingErrors,
        mathsErrors: mathsErrors
    };
}
