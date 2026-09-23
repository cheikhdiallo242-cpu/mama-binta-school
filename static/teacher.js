// =====================================================
// 👩🏾‍🏫 AGENT PROFESSEUR DE MAMA BINTA
// =====================================================
// Le professeur reçoit maintenant la recommandation
// de l'agent analyste et adapte son encouragement.
// =====================================================


// =====================================================
// 🔎 RÉCUPÉRER LA RECOMMANDATION DE L'ANALYSTE
// =====================================================

function teacherGetRecommendation() {

    if (typeof analyzeStudent !== "function") {
        return null;
    }

    const analysis = analyzeStudent();

    return analysis.recommendation || null;
}


// =====================================================
// 👩🏾‍🏫 ADAPTATION DU PROFESSEUR
// =====================================================

function teacherAdaptation() {

    const recommendation =
        teacherGetRecommendation();


    if (!recommendation) {

        return {

            message: "",

            speech: ""
        };
    }


    // ================================================
    // DIFFICULTÉ EN MATHS
    // ================================================

    if (
        recommendation.subject === "Maths" &&
        recommendation.action === "entrainer"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "On va encore nous entraîner un peu en maths. " +
                "Ne t'inquiète pas, Mama Binta. " +
                "Avec un peu de pratique, tu vas progresser ! 💪🏾🧮",

            speech:
                "On va encore nous entraîner un peu en maths. " +
                "Ne t'inquiète pas Mama Binta. " +
                "Avec un peu de pratique, tu vas progresser."
        };
    }


    // ================================================
    // DIFFICULTÉ EN LECTURE
    // ================================================

    if (
        recommendation.subject === "Lecture" &&
        recommendation.action === "entrainer"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "On va encore pratiquer un peu la lecture. " +
                "Regarde bien les premières lettres et prends ton temps. " +
                "Tu vas progresser ! 💪🏾📖",

            speech:
                "On va encore pratiquer un peu la lecture. " +
                "Regarde bien les premières lettres et prends ton temps. " +
                "Tu vas progresser."
        };
    }


    // ================================================
    // TOUT VA BIEN
    // ================================================

    if (
        recommendation.action === "continuer"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "Très bien ! Continue tes exercices normalement. " +
                "Chaque exercice te fait progresser. 🌟",

            speech:
                "Très bien ! Continue tes exercices normalement. " +
                "Chaque exercice te fait progresser."
        };
    }


    return {

        message: "",

        speech: ""
    };
}


// =====================================================
// 👩🏾‍🏫 EXPLICATION D'UNE RÉPONSE
// =====================================================

function teacherExplain(questionData, studentAnswer) {

    // Sécurité
    if (!questionData || !studentAnswer) {

        return {

            message:
                "Regardons la question ensemble 😊",

            speech:
                "Regardons la question ensemble."
        };
    }


    // =================================================
    // BONNE RÉPONSE
    // =================================================

    if (studentAnswer === questionData.answer) {

        return {

            message:
                "Bravo Mama Binta 🎉\n\n" +
                "Tu as trouvé la bonne réponse ! 👏🏾",

            speech:
                "Bravo Mama Binta ! Tu as trouvé la bonne réponse !"
        };
    }


    const question =
        questionData.question;

    const correctAnswer =
        questionData.answer;


    // Récupérer l'adaptation du professeur
    // après analyse de la mémoire.
    const adaptation =
        teacherAdaptation();


    // =================================================
    // LECTURE
    // =================================================

    if (
        question.startsWith(
            "Quel mot commence par la lettre"
        )
    ) {

        const match =
            question.match(
                /lettre ([A-ZÉÈÊËÀÂÎÏÔÙÛÜÇ])/
            );


        if (match) {

            const letter =
                match[1];


            function firstLetter(word) {

                return word
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .charAt(0)
                    .toUpperCase();
            }


            const studentLetter =
                firstLetter(studentAnswer);

            const correctLetter =
                firstLetter(correctAnswer);


            return {

                message:
                    "Ce n'est pas la bonne réponse 😊\n\n" +
                    studentAnswer +
                    " commence par la lettre " +
                    studentLetter +
                    ".\n\n" +
                    "La bonne réponse est " +
                    correctAnswer +
                    ", qui commence par la lettre " +
                    correctLetter +
                    ".\n\n" +
                    "Regarde bien la première lettre et essaie encore ! 📚" +
                    adaptation.message,

                speech:
                    "Ce n'est pas la bonne réponse. " +
                    studentAnswer +
                    " commence par la lettre " +
                    studentLetter +
                    ". " +
                    "La bonne réponse est " +
                    correctAnswer +
                    ", qui commence par la lettre " +
                    correctLetter +
                    ". " +
                    "Regarde bien la première lettre et essaie encore." +
                    adaptation.speech
            };
        }
    }


    // =================================================
    // MATHS
    // =================================================

    if (
        question.startsWith(
            "Combien font"
        )
    ) {

        const match =
            question.match(
                /Combien font (\d+) \+ (\d+)/
            );


        if (match) {

            const a =
                parseInt(match[1]);

            const b =
                parseInt(match[2]);


            let steps = [];


            for (
                let i = 1;
                i <= b;
                i++
            ) {

                steps.push(
                    a + i
                );
            }


            const explanation =
                a +
                " + " +
                b +
                " signifie que nous ajoutons " +
                b +
                " à " +
                a +
                ".\n\n" +
                "On compte : " +
                a +
                ", " +
                steps.join(", ") +
                ".\n\n" +
                "Donc la bonne réponse est " +
                correctAnswer +
                ". 🧮";


            const speech =
                "Ce n'est pas la bonne réponse. " +
                a +
                " plus " +
                b +
                " signifie que nous ajoutons " +
                b +
                " à " +
                a +
                ". " +
                "On compte : " +
                a +
                ", " +
                steps.join(", ") +
                ". " +
                "Donc la bonne réponse est " +
                correctAnswer +
                ".";


            return {

                message:
                    explanation +
                    adaptation.message,

                speech:
                    speech +
                    adaptation.speech
            };
        }
    }


    // =================================================
    // EXPLICATION PAR DÉFAUT
    // =================================================

    return {

        message:
            "Ce n'est pas la bonne réponse 😊\n\n" +
            "La bonne réponse est " +
            correctAnswer +
            ".\n\n" +
            "Regardons la question encore une fois ensemble. 📚" +
            adaptation.message,

        speech:
            "Ce n'est pas la bonne réponse. " +
            "La bonne réponse est " +
            correctAnswer +
            ". " +
            "Regardons la question encore une fois ensemble." +
            adaptation.speech
    };
}
