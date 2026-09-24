// =====================================================
// 👩🏾‍🏫 AGENT PROFESSEUR DE MAMA BINTA
// =====================================================
// Règle principale :
//
// Le professeur explique la réponse actuelle.
// Pour parler de progression en maths, il consulte
// le PLANIFICATEUR, et non simplement l'ANALYSTE.
//
// Ainsi :
//
// Bonne réponse ≠ automatiquement "plus difficile"
//
// Seul un vrai changement de niveau permet de dire :
// "Nous pouvons passer au niveau suivant."
// =====================================================


// =====================================================
// 🎯 RÉCUPÉRER LE PLAN MATHS
// =====================================================

function teacherGetMathPlan() {

    if (
        typeof getMathPlan !== "function"
    ) {

        return null;
    }


    return getMathPlan();
}


// =====================================================
// 👩🏾‍🏫 MESSAGE DE PROGRESSION
// =====================================================

function teacherMathProgressMessage() {

    const plan =
        teacherGetMathPlan();


    if (!plan) {

        return {

            message: "",

            speech: ""
        };
    }


    // =================================================
    // 🌟 VRAIE PROGRESSION
    // =================================================
    //
    // Le planificateur vient réellement de faire
    // passer Mama Binta au niveau supérieur.

    if (
        plan.status === "progression" &&
        plan.previousLevel &&
        plan.level > plan.previousLevel
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "🌟 Bravo ! Tu maîtrises bien le niveau " +
                plan.previousLevel +
                ".\n\n" +
                "Nous pouvons maintenant commencer " +
                "le niveau " +
                plan.level +
                ", avec des additions jusqu'à " +
                plan.maxSum +
                ". 💪🏾🧮",

            speech:
                "Bravo ! Tu maîtrises bien le niveau " +
                plan.previousLevel +
                ". " +
                "Nous pouvons maintenant commencer " +
                "le niveau " +
                plan.level +
                ", avec des additions jusqu'à " +
                plan.maxSum +
                "."
        };
    }


    // =================================================
    // 🧮 NIVEAU 10
    // =================================================

    if (
        plan.status === "maitrise"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "🏆 Tu travailles maintenant sur les additions " +
                "jusqu'à 100. Continue à t'entraîner pour renforcer " +
                "ta maîtrise. 💪🏾🧮",

            speech:
                "Tu travailles maintenant sur les additions " +
                "jusqu'à 100. Continue à t'entraîner " +
                "pour renforcer ta maîtrise."
        };
    }


    // =================================================
    // ⚖️ PAS DE PROGRESSION
    // =================================================
    //
    // Très important :
    // On ne dit PAS "plus difficile".
    //
    // Le prochain exercice restera dans le niveau actuel.

    return {

        message:
            "\n\n👩🏾‍🏫 La maîtresse :\n" +
            "Continue comme ça ! 🌟 " +
            "Nous allons encore nous entraîner " +
            "dans ce niveau avant de passer au suivant. 💪🏾",

        speech:
            "Continue comme ça ! " +
            "Nous allons encore nous entraîner " +
            "dans ce niveau avant de passer au suivant."
    };
}


// =====================================================
// 📖 EXPLICATION LECTURE
// =====================================================

function teacherReadingExplanation(
    questionData,
    studentAnswer
) {

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


    const question =
        questionData.question;


    const correctAnswer =
        questionData.answer;


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


    return {

        message:
            "Ce n'est pas la bonne réponse 😊\n\n" +
            "La bonne réponse est " +
            correctAnswer +
            ".",

        speech:
            "Ce n'est pas la bonne réponse. " +
            "La bonne réponse est " +
            correctAnswer + "."
    };
}


// =====================================================
// 🧮 EXPLICATION MATHS
// =====================================================

function teacherMathExplanation(
    questionData,
    studentAnswer
) {

    const correct =
        studentAnswer ===
        questionData.answer;


    // =================================================
    // 🎉 BONNE RÉPONSE
    // =================================================

    if (correct) {

        // ---------------------------------------------
        // Le plan est demandé APRÈS l'enregistrement
        // de la réponse dans memory.js.
        // ---------------------------------------------

        const progressMessage =
            teacherMathProgressMessage();


        return {

            message:
                "Bravo Mama Binta 🎉\n\n" +
                "Tu as trouvé la bonne réponse ! 👏🏾" +
                progressMessage.message,

            speech:
                "Bravo Mama Binta ! " +
                "Tu as trouvé la bonne réponse. " +
                progressMessage.speech
        };
    }


    // =================================================
    // ❌ MAUVAISE RÉPONSE
    // =================================================

    const question =
        questionData.question;


    const correctAnswer =
        questionData.answer;


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


        return {

            message:
                "Ce n'est pas la bonne réponse 😊\n\n" +
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
                ". 🧮\n\n" +
                "Ce n'est pas grave. " +
                "Nous allons continuer à nous entraîner. 💪🏾",

            speech:
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
                ". " +
                "Ce n'est pas grave. " +
                "Nous allons continuer à nous entraîner."
        };
    }


    return {

        message:
            "Ce n'est pas la bonne réponse 😊\n\n" +
            "La bonne réponse est " +
            correctAnswer +
            ".",

        speech:
            "Ce n'est pas la bonne réponse. " +
            "La bonne réponse est " +
            correctAnswer + "."
    };
}


// =====================================================
// 👩🏾‍🏫 FONCTION PRINCIPALE
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
    // 🧮 MATHS
    // =================================================

    if (
        questionData.question.startsWith(
            "Combien font"
        )
    ) {

        return teacherMathExplanation(
            questionData,
            studentAnswer
        );
    }


    // =================================================
    // 📖 LECTURE
    // =================================================

    if (
        questionData.question.startsWith(
            "Quel mot commence par la lettre"
        )
    ) {

        return teacherReadingExplanation(
            questionData,
            studentAnswer
        );
    }


    // =================================================
    // 📚 CAS GÉNÉRAL
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
                "Bravo Mama Binta ! " +
                "Tu as trouvé la bonne réponse !"
        };
    }


    return {

        message:
            "Ce n'est pas la bonne réponse 😊\n\n" +
            "La bonne réponse est " +
            questionData.answer +
            ".",

        speech:
            "Ce n'est pas la bonne réponse. " +
            "La bonne réponse est " +
            questionData.answer + "."
    };
}
