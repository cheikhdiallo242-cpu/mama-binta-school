// ===== AGENT MÉMOIRE DE MAMA BINTA =====

// Mémoire par défaut
const defaultMemory = {
    correct: 0,
    incorrect: 0,
    readingCorrect: 0,
    readingIncorrect: 0,
    mathsCorrect: 0,
    mathsIncorrect: 0
};


// ===== CHARGER LA MÉMOIRE =====

function loadStudentMemory() {

    try {

        const savedMemory =
            localStorage.getItem("mamaBintaMemory");

        if (savedMemory) {

            return {
                ...defaultMemory,
                ...JSON.parse(savedMemory)
            };
        }

    } catch (error) {

        console.log(
            "⚠️ Impossible de charger la mémoire.",
            error
        );
    }

    return {
        ...defaultMemory
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


    // ===== SAUVEGARDER =====

    saveStudentMemory();


    // ===== JOURNAL =====

    console.log(
        "🧠 Mémoire de Mama Binta :",
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
