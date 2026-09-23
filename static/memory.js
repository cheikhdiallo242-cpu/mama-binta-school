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

    // Compteur général

    if (correct) {
        studentMemory.correct++;
    } else {
        studentMemory.incorrect++;
    }


    // Lecture

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


    // Maths

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


    console.log(
        "🧠 Mémoire de Mama Binta :",
        studentMemory
    );
}


// ===== LIRE LA MÉMOIRE =====

function getStudentMemory() {

    return studentMemory;
}
