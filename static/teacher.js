// =====================================================
// 👩🏾‍🏫 AGENT PROFESSEUR DE MAMA BINTA
// =====================================================
// Le professeur reçoit les informations de l'analyste
// et adapte son explication à la situation de l'élève.
// =====================================================


// =====================================================
// 🔎 RÉCUPÉRER LA RECOMMANDATION DE L'ANALYSTE
// =====================================================

function teacherGetRecommendation() {

    if (
        typeof analyzeStudent !== "function"
    ) {
        return null;
    }

    const analysis =
        analyzeStudent();

    return analysis.recommendation || null;
}


// =====================================================
// 🧠 RÉCUPÉRER L'ANALYSE COMPLÈTE
// =====================================================

function teacherGetAnalysis() {

    if (
        typeof analyzeStudent !== "function"
    ) {
        return null;
    }

    return analyzeStudent();
}


// =====================================================
// 👩🏾‍🏫 ADAPTATION DU PROFESSEUR
// =====================================================

function teacherAdaptation() {

    const analysis =
        teacherGetAnalysis();


    if (!analysis) {

        return {
            message: "",
            speech: ""
        };
    }


    const recommendation =
        analysis.recommendation;


    if (!recommendation) {

        return {
            message: "",
            speech: ""
        };
    }


    // =================================================
    // 🎯 FRONTIÈRE DE DIFFICULTÉ EN MATHS
    // =================================================

    if (
        analysis.status === "frontière" &&
        analysis.subject === "Maths"
    ) {

        const mastered =
            analysis.highestCorrectSum;


        const difficulty =
            analysis.lowestIncorrectSum;


        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "Tu réussis déjà des additions jusqu'à " +
                mastered +
                ". 🌟\n\n" +
                "On va maintenant travailler tranquillement " +
                "autour de " +
                difficulty +
                ". " +
                "Pas besoin d'aller trop vite. " +
                "On avance petit à petit. 💪🏾🧮",

            speech:
                "Tu réussis déjà des additions jusqu'à " +
                mastered +
                ". " +
                "On va maintenant travailler tranquillement " +
                "autour de " +
                difficulty +
                ". " +
                "Pas besoin d'aller trop vite. " +
                "On avance petit à petit."
        };
    }


    // =================================================
    // 📈 PROGRESSION EN MATHS
    // =================================================

    if (
        recommendation.subject === "Maths" &&
        recommendation.action === "progresser"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "Bravo ! 🌟 Tu réussis très bien tes exercices de maths. " +
                "On peut maintenant essayer des additions un peu plus difficiles. " +
                "Je suis sûre que tu peux progresser encore ! 💪🏾🧮",

            speech:
                "Bravo ! Tu réussis très bien tes exercices de maths. " +
                "On peut maintenant essayer des additions un peu plus difficiles. " +
                "Je suis sûre que tu peux progresser encore."
        };
    }


    // =================================================
    // 🧮 ENTRAÎNEMENT MATHS
    // =================================================

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


    // =================================================
    // 🧮 CONSOLIDATION MATHS
    // =================================================

    if (
        recommendation.subject === "Maths" &&
        recommendation.action === "consolider"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "Tu es en train d'apprendre quelque chose de nouveau. 🧠 " +
                "On va refaire quelques additions autour de ce niveau " +
                "pour bien consolider tes bases. " +
                "Prends ton temps. 💪🏾🧮",

            speech:
                "Tu es en train d'apprendre quelque chose de nouveau. " +
                "On va refaire quelques additions autour de ce niveau " +
                "pour bien consolider tes bases. " +
                "Prends ton temps."
        };
    }


    // =================================================
    // 📖 ENTRAÎNEMENT LECTURE
    // =================================================

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


    // =================================================
    // 📖 PROGRESSION LECTURE
    // =================================================

    if (
        recommendation.subject === "Lecture" &&
        recommendation.action === "progresser"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "Bravo ! 🌟 Tu réussis très bien tes exercices de lecture. " +
                "On peut maintenant essayer des mots un peu plus difficiles. " +
                "Continue comme ça ! 📖💪🏾",

            speech:
                "Bravo ! Tu réussis très bien tes exercices de lecture. " +
                "On peut maintenant essayer des mots un peu plus difficiles. " +
                "Continue comme ça."
        };
    }


    // =================================================
    // ⚖️ CONTINUER NORMALEMENT
    // =================================================

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
// 👩🏾‍🏫 EXPLICATION APRÈS UNE RÉPONSE
// =====================================================

function teacherExplain(
    questionData,
    studentAnswer
) {

    if (
        !questionData ||
        !studentAnswer
    ) {

        return {

            message:
                "Regardons la question ensemble 😊",

            speech:
                "Regardons la question ensemble."
        };
    }


    // =================================================
    // 🎉 BONNE RÉPONSE
    // =================================================

    const correct =
        studentAnswer ===
        questionData.answer;


    if (correct) {

        return {

            message:
                "Bravo Mama Binta 🎉\n\n" +
                "Tu as trouvé la bonne réponse ! 👏🏾",

            speech:
                "Bravo Mama Binta ! Tu as trouvé la bonne réponse !"
        };
    }


    // =================================================
    // ❌ MAUVAISE RÉPONSE
    // =================================================

    const question =
        questionData.question;


    const correctAnswer =
        questionData.answer;


    const adaptation =
        teacherAdaptation();


    // =================================================
    // 📖 EXPLICATION LECTURE
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
                firstLetter(
                    studentAnswer
                );


            const correctLetter =
                firstLetter(
                    correctAnswer
                );


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
                    ". " +
                    "Elle commence par la lettre " +
                    correctLetter +
                    ". " +
                    "Regarde bien la première lettre et essaie encore." +
                    adaptation.speech
            };
        }
    }


    // =================================================
    // 🧮 EXPLICATION MATHS
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
    // 📚 EXPLICATION GÉNÉRALE
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
