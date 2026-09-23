// =====================================================
// 👩🏾‍🏫 AGENT PROFESSEUR DE MAMA BINTA
// =====================================================
// Le professeur peut maintenant recevoir
// la recommandation de l'agent analyste.
// =====================================================


function teacherGetRecommendation() {

    // Vérifier que l'analyste existe
    if (typeof analyzeStudent !== "function") {

        return null;
    }

    // Demander une analyse
    const analysis = analyzeStudent();

    // Retourner la recommandation
    return analysis.recommendation || null;
}


// =====================================================
// EXPLICATION D'UNE RÉPONSE
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
                    "Regarde bien la première lettre et essaie encore ! 📚",

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
                    "Regarde bien la première lettre et essaie encore."
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
                    explanation,

                speech:
                    speech
            };
        }
    }


    // =================================================
    // RECOMMANDATION DE L'ANALYSTE
    // =================================================

    const recommendation =
        teacherGetRecommendation();


    let recommendationText = "";

    let recommendationSpeech = "";


    if (recommendation) {

        recommendationText =
            "\n\n🧠 Recommandation de l'analyste :\n" +
            recommendation.message;


        recommendationSpeech =
            " L'analyste recommande aussi : " +
            recommendation.message;
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
            recommendationText,

        speech:
            "Ce n'est pas la bonne réponse. " +
            "La bonne réponse est " +
            correctAnswer +
            ". " +
            "Regardons la question encore une fois ensemble." +
            recommendationSpeech
    };
}
