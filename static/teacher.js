// =====================================================
// 👩🏾‍🏫 AGENT PROFESSEUR DE MAMA BINTA
// =====================================================
// Le professeur reçoit les informations de l'analyste
// et adapte son explication à la situation actuelle.
//
// RÈGLE IMPORTANTE :
// Une mauvaise réponse doit toujours être traitée
// comme une erreur AVANT toute recommandation.
//
// La maîtresse ne doit jamais dire :
// "Tu réussis très bien"
// juste après une mauvaise réponse.
// =====================================================


// =====================================================
// 🔎 RÉCUPÉRER L'ANALYSE
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
// 🔎 RÉCUPÉRER LA RECOMMANDATION
// =====================================================

function teacherGetRecommendation() {

    const analysis =
        teacherGetAnalysis();


    if (!analysis) {

        return null;
    }


    return analysis.recommendation || null;
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
    // 🎯 FRONTIÈRE EN MATHS
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
                "Nous allons maintenant travailler " +
                "tranquillement autour de " +
                difficulty +
                ". " +
                "Pas besoin d'aller trop vite. " +
                "On avance petit à petit. 💪🏾🧮",

            speech:
                "Tu réussis déjà des additions jusqu'à " +
                mastered +
                ". " +
                "Nous allons maintenant travailler " +
                "tranquillement autour de " +
                difficulty +
                ". " +
                "Pas besoin d'aller trop vite. " +
                "On avance petit à petit."
        };
    }


    // =================================================
    // 📈 PROGRESSION MATHS
    // =================================================

    if (
        recommendation.subject === "Maths" &&
        recommendation.action === "progresser"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "Tu as montré de beaux progrès en maths. 🌟\n" +
                "Quand tu seras prête, nous pourrons " +
                "essayer des additions un peu plus difficiles. " +
                "💪🏾🧮",

            speech:
                "Tu as montré de beaux progrès en maths. " +
                "Quand tu seras prête, nous pourrons " +
                "essayer des additions un peu plus difficiles."
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
                "Nous allons encore nous entraîner un peu en maths. " +
                "Ne t'inquiète pas. " +
                "Avec de la pratique, tu vas progresser ! 💪🏾🧮",

            speech:
                "Nous allons encore nous entraîner un peu en maths. " +
                "Ne t'inquiète pas. " +
                "Avec de la pratique, tu vas progresser."
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
                "Nous allons prendre notre temps et refaire " +
                "quelques additions pour bien consolider tes bases. " +
                "Tu peux y arriver. 💪🏾🧮",

            speech:
                "Nous allons prendre notre temps et refaire " +
                "quelques additions pour bien consolider tes bases. " +
                "Tu peux y arriver."
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
                "Nous allons encore pratiquer un peu la lecture. " +
                "Regarde bien les premières lettres et prends ton temps. " +
                "Tu vas progresser ! 💪🏾📖",

            speech:
                "Nous allons encore pratiquer un peu la lecture. " +
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
                "Tu as montré de beaux progrès en lecture. 🌟\n" +
                "Nous pourrons bientôt essayer des mots " +
                "un peu plus difficiles. 📖💪🏾",

            speech:
                "Tu as montré de beaux progrès en lecture. " +
                "Nous pourrons bientôt essayer des mots " +
                "un peu plus difficiles."
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
    // 🎯 SAVOIR SI LA RÉPONSE EST CORRECTE
    // =================================================

    const correct =
        studentAnswer ===
        questionData.answer;


    // =================================================
    // 🎉 BONNE RÉPONSE
    // =================================================

    if (correct) {

        const adaptation =
            teacherAdaptation();


        return {

            message:
                "Bravo Mama Binta 🎉\n\n" +
                "Tu as trouvé la bonne réponse ! 👏🏾" +
                adaptation.message,

            speech:
                "Bravo Mama Binta ! " +
                "Tu as trouvé la bonne réponse. " +
                adaptation.speech
        };
    }


    // =================================================
    // ❌ MAUVAISE RÉPONSE
    // =================================================
    //
    // IMPORTANT :
    // Ici nous ne faisons PAS immédiatement confiance
    // à une recommandation de progression.
    //
    // L'explication de l'erreur passe en premier.

    const question =
        questionData.question;


    const correctAnswer =
        questionData.answer;


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
                    "Regarde bien la première lettre et essaie encore ! 📚",

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
                    "Regarde bien la première lettre et essaie encore."
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
                parseInt(
                    match[1]
                );


            const b =
                parseInt(
                    match[2]
                );


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
    // 📚 EXPLICATION GÉNÉRALE
    // =================================================

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
            ". " +
            "Regardons la question encore une fois ensemble."
    };
}
