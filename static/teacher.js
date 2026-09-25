// =====================================================
// 👩🏾‍🏫 AGENT PROFESSEUR DE MAMA BINTA
// =====================================================
//
// Rôle du professeur :
// - expliquer la réponse
// - encourager l'enfant
// - donner une petite méthode
// - expliquer l'erreur
//
// Le professeur NE décide PAS du niveau.
// Le PLANIFICATEUR reste responsable de la progression.
//
// Chaîne :
//
// 🧠 Mémoire
//      ↓
// 🔎 Analyste
//      ↓
// 🎯 Planificateur
//      ↓
// 🧩 Générateur
//      ↓
// 🛡️ Vérificateur
//      ↓
// 👩🏾‍🏫 Professeur
//
// =====================================================


// =====================================================
// 🛠️ OUTILS
// =====================================================

function teacherNormalize(value) {

    return String(value ?? "")
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}


function teacherNumbersFromQuestion(question) {

    const matches = String(question ?? "").match(
        /-?\d+(?:[.,]\d+)?/g
    );

    if (!matches) {
        return [];
    }

    return matches.map(value =>
        Number(String(value).replace(",", "."))
    );
}


function teacherGetSkill(questionData) {

    if (questionData && questionData.skill) {
        return teacherNormalize(questionData.skill);
    }

    const question =
        teacherNormalize(
            questionData?.question
        );

    if (
        question.includes("+") ||
        question.includes("addition")
    ) {
        return "addition";
    }

    if (
        question.includes("−") ||
        question.includes("-") ||
        question.includes("soustraction")
    ) {
        return "subtraction";
    }

    if (
        question.includes("×") ||
        question.includes("multiplication") ||
        question.includes("fois")
    ) {
        return "multiplication";
    }

    if (
        question.includes("lettre") ||
        question.includes("mot commence") ||
        question.includes("complete le mot") ||
        question.includes("complète le mot") ||
        question.includes("emoji")
    ) {
        return "reading";
    }

    return "comprehension";
}


function teacherAnswersAreEqual(
    studentAnswer,
    correctAnswer
) {

    const studentNumber =
        Number(
            String(studentAnswer)
                .trim()
                .replace(",", ".")
        );

    const correctNumber =
        Number(
            String(correctAnswer)
                .trim()
                .replace(",", ".")
        );

    if (
        Number.isFinite(studentNumber) &&
        Number.isFinite(correctNumber)
    ) {
        return studentNumber === correctNumber;
    }

    return teacherNormalize(studentAnswer) ===
        teacherNormalize(correctAnswer);
}


// =====================================================
// 📈 PLANIFICATEUR
// =====================================================
//
// Le professeur peut consulter le planificateur,
// mais il ne modifie jamais le niveau lui-même.
// =====================================================

function teacherGetLearningPlan() {

    if (
        typeof getLearningPlan === "function"
    ) {

        return getLearningPlan();
    }

    if (
        typeof planLearningLevel === "function"
    ) {

        return planLearningLevel();
    }

    return null;
}


function teacherGetMathPlan() {

    if (
        typeof getMathPlan === "function"
    ) {

        return getMathPlan();
    }

    return null;
}


// =====================================================
// 🌟 MESSAGE DE PROGRESSION
// =====================================================

function teacherProgressMessage() {

    const plan =
        teacherGetLearningPlan();

    if (!plan) {

        return {
            message: "",
            speech: ""
        };
    }


    // Le professeur ne parle de progression
    // que si le planificateur indique réellement
    // un changement de niveau.

    if (
        plan.status === "progression" &&
        plan.previousLevel &&
        plan.level > plan.previousLevel
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "🌟 Bravo ! Tu as réussi cette étape.\n\n" +
                "Nous pouvons maintenant commencer " +
                "le niveau " +
                plan.level +
                ". 💪🏾",

            speech:
                "Bravo ! Tu as réussi cette étape. " +
                "Nous pouvons maintenant commencer " +
                "le niveau " +
                plan.level + "."
        };
    }


    if (
        plan.status === "maitrise"
    ) {

        return {

            message:
                "\n\n👩🏾‍🏫 La maîtresse :\n" +
                "🏆 Tu as atteint le niveau 100 !\n\n" +
                "Continue à t'entraîner pour garder " +
                "tout ce que tu as appris. 💪🏾",

            speech:
                "Tu as atteint le niveau 100 ! " +
                "Continue à t'entraîner pour garder " +
                "tout ce que tu as appris."
        };
    }


    return {

        message: "",
        speech: ""
    };
}


// =====================================================
// 📖 PROFESSEUR — LECTURE
// =====================================================

function teacherReadingExplanation(
    questionData,
    studentAnswer
) {

    const correct =
        teacherAnswersAreEqual(
            studentAnswer,
            questionData.answer
        );


    const correctAnswer =
        questionData.answer;


    // -------------------------------------------------
    // 🎉 BONNE RÉPONSE
    // -------------------------------------------------

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


    // -------------------------------------------------
    // 🔤 LETTRE → MOT
    // -------------------------------------------------

    const question =
        String(questionData.question ?? "");

    const letterMatch =
        question.match(
            /lettre\s+([A-Za-zÀ-ÿ])/i
        );


    if (letterMatch) {

        const requestedLetter =
            letterMatch[1].toUpperCase();


        const studentFirstLetter =
            String(studentAnswer)
                .trim()
                .charAt(0)
                .toUpperCase();


        const correctFirstLetter =
            String(correctAnswer)
                .trim()
                .charAt(0)
                .toUpperCase();


        return {

            message:
                "Ce n'est pas la bonne réponse 😊\n\n" +
                "Tu as choisi « " +
                studentAnswer +
                " ».\n\n" +
                "La question demandait un mot qui commence " +
                "par la lettre " +
                requestedLetter +
                ".\n\n" +
                "« " +
                correctAnswer +
                " » commence bien par " +
                correctFirstLetter +
                ".\n\n" +
                "Regarde attentivement la première lettre. 📚",

            speech:
                "Ce n'est pas la bonne réponse. " +
                "Tu as choisi " +
                studentAnswer +
                ". " +
                "La question demandait un mot qui commence " +
                "par la lettre " +
                requestedLetter +
                ". " +
                "La bonne réponse est " +
                correctAnswer +
                ". " +
                "Regarde attentivement la première lettre."
        };
    }


    // -------------------------------------------------
    // 🔤 LETTRE MANQUANTE
    // -------------------------------------------------

    if (
        teacherNormalize(
            questionData.levelType
        ) === "missing_letter"
    ) {

        return {

            message:
                "Regarde bien le mot 😊\n\n" +
                "Il manque une lettre.\n\n" +
                "La bonne lettre est « " +
                correctAnswer +
                " ».\n\n" +
                "Essaie de relire le mot doucement. 📖",

            speech:
                "Regarde bien le mot. " +
                "Il manque une lettre. " +
                "La bonne lettre est " +
                correctAnswer +
                ". " +
                "Essaie de relire le mot doucement."
        };
    }


    // -------------------------------------------------
    // 📚 CAS GÉNÉRAL DE LECTURE
    // -------------------------------------------------

    return {

        message:
            "Ce n'est pas la bonne réponse 😊\n\n" +
            "La bonne réponse est « " +
            correctAnswer +
            " ».\n\n" +
            "Relis tranquillement la question et essaie " +
            "de repérer l'indice important. 📚",

        speech:
            "Ce n'est pas la bonne réponse. " +
            "La bonne réponse est " +
            correctAnswer +
            ". " +
            "Relis tranquillement la question et cherche " +
            "l'indice important."
    };
}


// =====================================================
// ➕ PROFESSEUR — ADDITION
// =====================================================

function teacherAdditionExplanation(
    questionData,
    studentAnswer
) {

    const correct =
        teacherAnswersAreEqual(
            studentAnswer,
            questionData.answer
        );


    if (correct) {

        return {

            message:
                "Bravo Mama Binta 🎉\n\n" +
                "Ton addition est correcte ! 👏🏾",

            speech:
                "Bravo Mama Binta ! " +
                "Ton addition est correcte."
        };
    }


    const numbers =
        teacherNumbersFromQuestion(
            questionData.question
        );


    const a = numbers[0];
    const b = numbers[1];


    if (
        Number.isFinite(a) &&
        Number.isFinite(b)
    ) {

        const result = a + b;


        return {

            message:
                "Ce n'est pas grave 😊\n\n" +
                "On avait : " +
                a +
                " + " +
                b +
                ".\n\n" +
                "On ajoute " +
                b +
                " à " +
                a +
                ".\n\n" +
                "Cela donne " +
                result +
                ". 🧮\n\n" +
                "La bonne réponse est donc " +
                questionData.answer +
                ". 💪🏾",

            speech:
                "Ce n'est pas grave. " +
                "On avait " +
                a +
                " plus " +
                b +
                ". " +
                "On ajoute " +
                b +
                " à " +
                a +
                ". " +
                "Cela donne " +
                result +
                ". " +
                "La bonne réponse est donc " +
                questionData.answer + "."
        };
    }


    return teacherGenericWrongExplanation(
        questionData
    );
}


// =====================================================
// ➖ PROFESSEUR — SOUSTRACTION
// =====================================================

function teacherSubtractionExplanation(
    questionData,
    studentAnswer
) {

    const correct =
        teacherAnswersAreEqual(
            studentAnswer,
            questionData.answer
        );


    if (correct) {

        return {

            message:
                "Bravo Mama Binta 🎉\n\n" +
                "Ta soustraction est correcte ! 👏🏾",

            speech:
                "Bravo Mama Binta ! " +
                "Ta soustraction est correcte."
        };
    }


    const numbers =
        teacherNumbersFromQuestion(
            questionData.question
        );


    const a = numbers[0];
    const b = numbers[1];


    if (
        Number.isFinite(a) &&
        Number.isFinite(b)
    ) {

        const result = a - b;


        return {

            message:
                "Ce n'est pas grave 😊\n\n" +
                "On avait : " +
                a +
                " − " +
                b +
                ".\n\n" +
                "On retire " +
                b +
                " à " +
                a +
                ".\n\n" +
                "Il reste " +
                result +
                ". 🧮\n\n" +
                "La bonne réponse est donc " +
                questionData.answer +
                ". 💪🏾",

            speech:
                "Ce n'est pas grave. " +
                "On avait " +
                a +
                " moins " +
                b +
                ". " +
                "On retire " +
                b +
                " à " +
                a +
                ". " +
                "Il reste " +
                result +
                ". " +
                "La bonne réponse est donc " +
                questionData.answer + "."
        };
    }


    return teacherGenericWrongExplanation(
        questionData
    );
}


// =====================================================
// ✖️ PROFESSEUR — MULTIPLICATION
// =====================================================

function teacherMultiplicationExplanation(
    questionData,
    studentAnswer
) {

    const correct =
        teacherAnswersAreEqual(
            studentAnswer,
            questionData.answer
        );


    if (correct) {

        return {

            message:
                "Bravo Mama Binta 🎉\n\n" +
                "Très bien ! Ta multiplication est correcte. 👏🏾",

            speech:
                "Bravo Mama Binta ! " +
                "Ta multiplication est correcte."
        };
    }


    const numbers =
        teacherNumbersFromQuestion(
            questionData.question
        );


    const a = numbers[0];
    const b = numbers[1];


    if (
        Number.isFinite(a) &&
        Number.isFinite(b)
    ) {

        const result = a * b;


        return {

            message:
                "Ce n'est pas grave 😊\n\n" +
                "On avait : " +
                a +
                " × " +
                b +
                ".\n\n" +
                "Multiplier " +
                a +
                " par " +
                b +
                ", c'est additionner " +
                a +
                " fois " +
                b +
                ".\n\n" +
                "Le résultat est " +
                result +
                ". 🧮\n\n" +
                "La bonne réponse est donc " +
                questionData.answer +
                ". 💪🏾",

            speech:
                "Ce n'est pas grave. " +
                "On avait " +
                a +
                " fois " +
                b +
                ". " +
                "Le résultat est " +
                result +
                ". " +
                "La bonne réponse est donc " +
                questionData.answer + "."
        };
    }


    return teacherGenericWrongExplanation(
        questionData
    );
}


// =====================================================
// 🧠 PROFESSEUR — COMPRÉHENSION
// =====================================================

function teacherComprehensionExplanation(
    questionData,
    studentAnswer
) {

    const correct =
        teacherAnswersAreEqual(
            studentAnswer,
            questionData.answer
        );


    if (correct) {

        return {

            message:
                "Excellent Mama Binta 🌟\n\n" +
                "Tu as bien compris la question ! 👏🏾",

            speech:
                "Excellent Mama Binta ! " +
                "Tu as bien compris la question."
        };
    }


    // Si un texte ou un indice est fourni par le générateur,
    // le professeur peut l'utiliser.
    if (questionData.explanation) {

        return {

            message:
                "Ce n'est pas la bonne réponse 😊\n\n" +
                questionData.explanation +
                "\n\n" +
                "La bonne réponse est : " +
                questionData.answer +
                ". 📚",

            speech:
                "Ce n'est pas la bonne réponse. " +
                questionData.explanation +
                " " +
                "La bonne réponse est " +
                questionData.answer + "."
        };
    }


    return {

        message:
            "Ce n'est pas la bonne réponse 😊\n\n" +
            "Relis attentivement la question et cherche " +
            "l'information importante.\n\n" +
            "La bonne réponse est : " +
            questionData.answer +
            ". 📚",

        speech:
            "Ce n'est pas la bonne réponse. " +
            "Relis attentivement la question et cherche " +
            "l'information importante. " +
            "La bonne réponse est " +
            questionData.answer + "."
    };
}


// =====================================================
// 🧩 EXPLICATION GÉNÉRALE
// =====================================================

function teacherGenericWrongExplanation(
    questionData
) {

    return {

        message:
            "Ce n'est pas grave 😊\n\n" +
            "La bonne réponse est : " +
            questionData.answer +
            ".\n\n" +
            "Observe bien la question et essayons " +
            "encore ensemble. 💪🏾",

        speech:
            "Ce n'est pas grave. " +
            "La bonne réponse est " +
            questionData.answer +
            ". " +
            "Observe bien la question et essayons " +
            "encore ensemble."
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
        studentAnswer === undefined ||
        studentAnswer === null ||
        String(studentAnswer).trim() === ""
    ) {

        return {

            message:
                "Regardons la question ensemble 😊",

            speech:
                "Regardons la question ensemble."
        };
    }


    const skill =
        teacherGetSkill(questionData);


    // -------------------------------------------------
    // 📖 LECTURE
    // -------------------------------------------------

    if (skill === "reading") {

        return teacherReadingExplanation(
            questionData,
            studentAnswer
        );
    }


    // -------------------------------------------------
    // ➕ ADDITION
    // -------------------------------------------------

    if (skill === "addition") {

        return teacherAdditionExplanation(
            questionData,
            studentAnswer
        );
    }


    // -------------------------------------------------
    // ➖ SOUSTRACTION
    // -------------------------------------------------

    if (skill === "subtraction") {

        return teacherSubtractionExplanation(
            questionData,
            studentAnswer
        );
    }


    // -------------------------------------------------
    // ✖️ MULTIPLICATION
    // -------------------------------------------------

    if (skill === "multiplication") {

        return teacherMultiplicationExplanation(
            questionData,
            studentAnswer
        );
    }


    // -------------------------------------------------
    // 🧠 COMPRÉHENSION
    // -------------------------------------------------

    if (skill === "comprehension") {

        return teacherComprehensionExplanation(
            questionData,
            studentAnswer
        );
    }


    // -------------------------------------------------
    // CAS INCONNU
    // -------------------------------------------------

    return teacherGenericWrongExplanation(
        questionData
    );
}


// =====================================================
// 🧪 DEBUG
// =====================================================

console.log("👩🏾‍🏫 Agent Professeur de Mama Binta chargé.");
