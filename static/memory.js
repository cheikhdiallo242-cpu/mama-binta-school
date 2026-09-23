// =====================================================
// 🧠 AGENT MÉMOIRE DE MAMA BINTA
// =====================================================
// La mémoire enregistre :
// - les bonnes réponses
// - les erreurs
// - les matières
// - les derniers résultats
// - les séries de réussites
// - les séries d'erreurs
// =====================================================

const defaultMemory = {

    correct: 0,
    incorrect: 0,

    readingCorrect: 0,
    readingIncorrect: 0,

    mathsCorrect: 0,
    mathsIncorrect: 0,

    // Derniers résultats
    recentResults: [],

    // Série actuelle
    currentCorrectStreak: 0,
    currentIncorrectStreak: 0,

    // Séries spécifiques aux maths
    mathsCorrectStreak: 0,
    mathsIncorrectStreak: 0,

    // Séries spécifiques à la lecture
    readingCorrectStreak: 0,
    readingIncorrectStreak: 0,

    mistakes: []
};


// =====================================================
// 📥 CHARGER LA MÉMOIRE
// =====================================================

function loadStudentMemory() {

    try {

        const savedMemory =
            localStorage.getItem(
                "mamaBintaMemory"
            );

        if (savedMemory) {

            const memory =
                JSON.parse(savedMemory);

            return {

                ...defaultMemory,

                ...memory,

                recentResults:
                    Array.isArray(
                        memory.recentResults
                    )
                        ? memory.recentResults
                        : [],

                mistakes:
                    Array.isArray(
                        memory.mistakes
                    )
                        ? memory.mistakes
                        : []
            };
        }

    } catch (error) {

        console.log(
            "⚠️ Impossible de charger la mémoire.",
            error
        );
    }


    return {
        ...defaultMemory,
        recentResults: [],
        mistakes: []
    };
}


let studentMemory =
    loadStudentMemory();


// =====================================================
// 💾 SAUVEGARDER
// =====================================================

function saveStudentMemory() {

    try {

        localStorage.setItem(
            "mamaBintaMemory",
            JSON.stringify(
                studentMemory
            )
        );

    } catch (error) {

        console.log(
            "⚠️ Impossible de sauvegarder la mémoire.",
            error
        );
    }
}


// =====================================================
// 🧠 ENREGISTRER UNE RÉPONSE
// =====================================================

function rememberAnswer(
    questionData,
    studentAnswer
) {

    if (
        !questionData ||
        !studentAnswer
    ) {
        return;
    }


    // -----------------------------------------
    // Vérifier la réponse
    // -----------------------------------------

    const correct =
        studentAnswer ===
        questionData.answer;


    // -----------------------------------------
    // Matière
    // -----------------------------------------

    let subject =
        "Autre";


    if (
        questionData.question.startsWith(
            "Quel mot commence par la lettre"
        )
    ) {

        subject =
            "Lecture";

    } else if (
        questionData.question.startsWith(
            "Combien font"
        )
    ) {

        subject =
            "Maths";
    }


    // =================================================
    // 📊 STATISTIQUES GÉNÉRALES
    // =================================================

    if (correct) {

        studentMemory.correct++;

        studentMemory.currentCorrectStreak++;

        studentMemory.currentIncorrectStreak = 0;

    } else {

        studentMemory.incorrect++;

        studentMemory.currentIncorrectStreak++;

        studentMemory.currentCorrectStreak = 0;
    }


    // =================================================
    // 🧮 MATHS
    // =================================================

    if (subject === "Maths") {

        if (correct) {

            studentMemory.mathsCorrect++;

            studentMemory.mathsCorrectStreak++;

            studentMemory.mathsIncorrectStreak = 0;

        } else {

            studentMemory.mathsIncorrect++;

            studentMemory.mathsIncorrectStreak++;

            studentMemory.mathsCorrectStreak = 0;
        }
    }


    // =================================================
    // 📖 LECTURE
    // =================================================

    if (subject === "Lecture") {

        if (correct) {

            studentMemory.readingCorrect++;

            studentMemory.readingCorrectStreak++;

            studentMemory.readingIncorrectStreak = 0;

        } else {

            studentMemory.readingIncorrect++;

            studentMemory.readingIncorrectStreak++;

            studentMemory.readingCorrectStreak = 0;
        }
    }


    // =================================================
    // 🕐 RÉSULTATS RÉCENTS
    // =================================================

    studentMemory.recentResults.push({

        subject: subject,

        correct: correct,

        question:
            questionData.question,

        studentAnswer:
            studentAnswer,

        correctAnswer:
            questionData.answer,

        date:
            new Date().toISOString()
    });


    // Garder seulement les 10 derniers résultats

    if (
        studentMemory.recentResults.length > 10
    ) {

        studentMemory.recentResults =
            studentMemory.recentResults.slice(-10);
    }


    // =================================================
    // ❌ ENREGISTRER L'ERREUR
    // =================================================

    if (!correct) {

        const mistake = {

            subject: subject,

            question:
                questionData.question,

            studentAnswer:
                studentAnswer,

            correctAnswer:
                questionData.answer,

            date:
                new Date().toISOString()
        };


        studentMemory.mistakes.push(
            mistake
        );


        console.log(
            "❌ Nouvelle erreur mémorisée :",
            mistake
        );
    }


    // =================================================
    // 💾 SAUVEGARDER
    // =================================================

    saveStudentMemory();


    console.log(
        "🧠 Mémoire de Mama Binta :",
        studentMemory
    );
}


// =====================================================
// 📤 RÉCUPÉRER LA MÉMOIRE
// =====================================================

function getStudentMemory() {

    return studentMemory;
}


// =====================================================
// 📊 RAPPORT
// =====================================================

function getMemoryReport() {

    return {

        general:
            "✅ Bonnes réponses : " +
            studentMemory.correct +
            "\n❌ Erreurs : " +
            studentMemory.incorrect,

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

        streak:
            "🔥 Série actuelle : " +
            studentMemory.currentCorrectStreak +
            " réussite(s) consécutive(s)",

        recent:
            "🕐 Résultats récents : " +
            studentMemory.recentResults.length
    };
}


// =====================================================
// ❌ RÉCUPÉRER LES ERREURS
// =====================================================

function getMistakes() {

    return studentMemory.mistakes;
}


// =====================================================
// 🔄 RÉINITIALISER
// =====================================================

function resetStudentMemory() {

    const confirmation =
        confirm(
            "⚠️ Veux-tu vraiment remettre la progression de Mama Binta à zéro ?\n\n" +
            "Les scores, les séries et les erreurs mémorisées seront supprimés."
        );


    if (!confirmation) {
        return;
    }


    studentMemory = {

        ...defaultMemory,

        recentResults: [],

        mistakes: []
    };


    saveStudentMemory();


    alert(
        "✅ La progression de Mama Binta a été remise à zéro !"
    );


    location.reload();
}
