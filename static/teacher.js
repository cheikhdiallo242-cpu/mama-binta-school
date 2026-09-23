// ===== AGENT PROFESSEUR DE MAMA BINTA =====

function teacherExplain(questionData, studentAnswer) {

    // Sécurité : vérifier que les informations existent
    if (!questionData || !studentAnswer) {
        return {
            message: "Regardons la question ensemble 😊",
            speech: "Regardons la question ensemble."
        };
    }

    // La réponse est correcte
    if (studentAnswer === questionData.answer) {

        return {
            message: "Bravo Mama Binta 🎉 Tu as trouvé la bonne réponse !",
            speech: "Bravo Mama Binta ! Tu as trouvé la bonne réponse !"
        };
    }

    // Réponse incorrecte
    const question = questionData.question;
    const correctAnswer = questionData.answer;

    // ----- LECTURE : lettre initiale -----

    if (question.startsWith("Quel mot commence par la lettre")) {

        const match = question.match(
            /lettre ([A-ZÉÈÊËÀÂÎÏÔÙÛÜÇ])/
        );

        if (match) {

            const letter = match[1];

            function firstLetter(word) {
                return word
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .charAt(0)
                    .toUpperCase();
            }

            const studentLetter = firstLetter(studentAnswer);
            const correctLetter = firstLetter(correctAnswer);

            return {
                message:
                    "Ce n'est pas la bonne réponse 😊\n\n" +
                    studentAnswer + " commence par la lettre " +
                    studentLetter + ".\n\n" +
                    "La bonne réponse est " +
                    correctAnswer + ", qui commence par la lettre " +
                    correctLetter + ".\n\n" +
                    "Regarde bien la première lettre et essaie encore ! 📚",

                speech:
                    "Ce n'est pas la bonne réponse. " +
                    studentAnswer + " commence par la lettre " +
                    studentLetter + ". " +
                    "La bonne réponse est " +
                    correctAnswer + ", qui commence par la lettre " +
                    correctLetter + ". " +
                    "Regarde bien la première lettre et essaie encore."
            };
        }
    }

    // ----- MATHS -----

    if (question.startsWith("Combien font")) {

        return {
            message:
                "Ce n'est pas la bonne réponse 😊\n\n" +
                "La bonne réponse est " +
                correctAnswer +
                ".\n\n" +
                "Prenons notre temps et essayons de comprendre le calcul. 🧮",

            speech:
                "Ce n'est pas la bonne réponse. " +
                "La bonne réponse est " +
                correctAnswer +
                ". Prenons notre temps et essayons de comprendre le calcul."
        };
    }

    // ----- EXPLICATION PAR DÉFAUT -----

    return {
        message:
            "Ce n'est pas la bonne réponse 😊\n\n" +
            "La bonne réponse est " +
            correctAnswer +
            ".\n\n" +
            "Regardons la question encore une fois ensemble. 📚",

        speech:
            "Ce n'est pas la bonne réponse. " +
            "La bonne réponse est " +
            correctAnswer +
            ". Regardons la question encore une fois ensemble."
    };
}
