// ===== AGENT MÉMOIRE DE MAMA BINTA =====

let studentMemory = {
    correct: 0,
    incorrect: 0,
    readingCorrect: 0,
    readingIncorrect: 0,
    mathsCorrect: 0,
    mathsIncorrect: 0
};


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


    // ===== JOURNAL DE LA MÉMOIRE =====

    console.log(
        "🧠 Mémoire de Mama Binta :",
        studentMemory
    );
}


// ===== LIRE LA MÉMOIRE =====

function getStudentMemory() {

    return studentMemory;
}


// ===== AFFICHER LA PROGRESSION =====

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
