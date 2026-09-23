// ===== AGENT MÉMOIRE DE MAMA BINTA =====

// Mémoire par défaut
const defaultMemory = {
    correct: 0,
    incorrect: 0,
    readingCorrect: 0,
    readingIncorrect: 0,
    mathsCorrect: 0,
    mathsIncorrect: 0,
    mistakes: []
};


// ===== CHARGER LA MÉMOIRE =====

function loadStudentMemory() {

    try {

        const savedMemory =
            localStorage.getItem("mamaBintaMemory");

        if (savedMemory) {

            const memory = JSON.parse(savedMemory);

            return {
                ...defaultMemory,
                ...memory,

                mistakes: Array.isArray(memory.mistakes)
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
        mistakes: []
    };
}


// ===== MÉMOIRE DE MAMA BINTA =====

let studentMemory = loadStudentMemory();


// ===== SAUVEGARDER LA MÉMOIRE =====

function saveStudentMemory() {

    try {

        localStorage.setItem(
            "mamaBintaMemory",
            JSON.stringify(studentMemory)
        );

    } catch (error) {

        console.log(
            "⚠️ Impossible de sauvegarder la mémoire.",
            error
        );
    }
}


// ===== ENREGISTRER UNE RÉPONSE =====

function rememberAnswer(questionData, studentAnswer) {

    if (!questionData || !studentAnswer) {
        return;
    }

    const correct =
        studentAnswer === questionData.answer;


    // ===== COMPTEUR GÉNÉRAL =====

    if (correct) {

        studentMemory.correct++;

    } else {

        studentMemory.incorrect++;
    }


    // ===== LECTURE =====

    if (
        questionData.question.startsWith(
            "Quel mot commence par la lettre"
        )
    ) {

        if (correct) {

            studentMemory.readingCorrect++;

        } else {

            studentMemory.readingIncorrect++;

        }
    }


    // ===== MATHS =====

    if (
        questionData.question.startsWith(
            "Combien font"
        )
    ) {

        if (correct) {

            studentMemory.mathsCorrect++;

        } else {

            studentMemory.mathsIncorrect++;

        }
    }


    // ===== MÉMORISER L'ERREUR =====

    if (!correct) {

        let subject = "Autre";

        if (
            questionData.question.startsWith(
                "Quel mot commence par la lettre"
            )
        ) {

            subject = "Lecture";

        } else if (
            questionData.question.startsWith(
                "Combien font"
            )
        ) {

            subject = "Maths";
        }


        const mistake = {

            subject: subject,

            question: questionData.question,

            studentAnswer: studentAnswer,

            correctAnswer: questionData.answer,

            date: new Date().toISOString()
        };


        studentMemory.mistakes.push(mistake);


        console.log(
            "❌ Nouvelle erreur mémorisée :",
            mistake
        );
    }


    // ===== SAUVEGARDER =====

    saveStudentMemory();


    // ===== JOURNAL =====

    console.log(
        "🧠 Mémoire complète de Mama Binta :",
        studentMemory
    );
}


// ===== LIRE LA MÉMOIRE =====

function getStudentMemory() {

    return studentMemory;
}


// ===== RAPPORT DE PROGRESSION =====

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
            " erreur(s)"
    };
}


// ===== LIRE LES ERREURS =====

function getMistakes() {

    return studentMemory.mistakes;
}


// ===== REMETTRE LA PROGRESSION À ZÉRO =====

function resetStudentMemory() {

    const confirmation = confirm(
        "⚠️ Veux-tu vraiment remettre la progression de Mama Binta à zéro ?\n\n" +
        "Les scores et les erreurs mémorisées seront supprimés."
    );

    if (!confirmation) {

        return;
    }


    // Nouvelle mémoire vide
    studentMemory = {
        ...defaultMemory,
        mistakes: []
    };


    // Sauvegarder la nouvelle mémoire
    saveStudentMemory();


    // Message de confirmation
    alert(
        "✅ La progression de Mama Binta a été remise à zéro !"
    );


    // Recharger l'application
    location.reload();
}
