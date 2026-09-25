// ===== AGENT VÉRIFICATEUR DE MAMA BINTA =====
// Vérifie les questions produites par les générateurs
// avant qu'elles soient présentées à Mama Binta.

// --------------------------------------------------
// OUTILS
// --------------------------------------------------

function verifierNormalizeText(value) {
    return String(value ?? "")
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function verifierFirstLetter(value) {
    return verifierNormalizeText(value).charAt(0).toUpperCase();
}

function verifierToNumber(value) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }

    const text = String(value ?? "")
        .trim()
        .replace(",", ".");

    if (text === "") {
        return null;
    }

    const number = Number(text);

    return Number.isFinite(number) ? number : null;
}

function verifierGetSkill(questionData) {

    if (questionData.skill) {
        return verifierNormalizeText(questionData.skill);
    }

    const question = verifierNormalizeText(questionData.question);

    if (
        question.includes("+") ||
        question.includes("addition") ||
        question.includes("ajoute")
    ) {
        return "addition";
    }

    if (
        question.includes("−") ||
        question.includes("-") ||
        question.includes("soustraction") ||
        question.includes("retire")
    ) {
        return "subtraction";
    }

    if (
        question.includes("×") ||
        question.includes("*") ||
        question.includes("multiplication") ||
        question.includes("fois")
    ) {
        return "multiplication";
    }

    if (
        question.includes("lettre") ||
        question.includes("mot commence") ||
        question.includes("emoji") ||
        question.includes("complete le mot") ||
        question.includes("complète le mot")
    ) {
        return "reading";
    }

    return "comprehension";
}

function verifierGetLevelType(questionData) {
    return verifierNormalizeText(
        questionData.levelType ||
        questionData.type ||
        ""
    );
}


// --------------------------------------------------
// VÉRIFICATION GÉNÉRALE
// --------------------------------------------------

function verifyQuestion(questionData) {

    // 1. La question doit exister
    if (!questionData || typeof questionData !== "object") {
        return {
            valid: false,
            reason: "La question est vide."
        };
    }

    // 2. Le texte de la question doit exister
    if (
        typeof questionData.question !== "string" ||
        questionData.question.trim() === ""
    ) {
        return {
            valid: false,
            reason: "Le texte de la question est absent."
        };
    }

    // 3. Les choix doivent exister
    if (!Array.isArray(questionData.choices)) {
        return {
            valid: false,
            reason: "Les choix sont absents."
        };
    }

    // 4. Au moins 3 choix
    if (questionData.choices.length < 3) {
        return {
            valid: false,
            reason: "Il n'y a pas assez de choix."
        };
    }

    // 5. Les choix doivent être utilisables
    for (const choice of questionData.choices) {

        if (
            choice === null ||
            choice === undefined ||
            String(choice).trim() === ""
        ) {
            return {
                valid: false,
                reason: "Un choix est vide."
            };
        }
    }

    // 6. Les choix doivent être différents
    const normalizedChoices = questionData.choices.map(
        choice => verifierNormalizeText(choice)
    );

    const uniqueChoices = new Set(normalizedChoices);

    if (uniqueChoices.size !== questionData.choices.length) {
        return {
            valid: false,
            reason: "Deux choix sont identiques."
        };
    }

    // 7. La bonne réponse doit exister
    if (
        questionData.answer === null ||
        questionData.answer === undefined ||
        String(questionData.answer).trim() === ""
    ) {
        return {
            valid: false,
            reason: "La bonne réponse est absente."
        };
    }

    // 8. La bonne réponse doit être dans les choix
    const normalizedAnswer = verifierNormalizeText(
        questionData.answer
    );

    if (!normalizedChoices.includes(normalizedAnswer)) {
        return {
            valid: false,
            reason: "La bonne réponse n'est pas dans les choix."
        };
    }

    // 9. Vérification du niveau
    if (questionData.level !== undefined) {

        const level = Number(questionData.level);

        if (
            !Number.isInteger(level) ||
            level < 1 ||
            level > 100
        ) {
            return {
                valid: false,
                reason: "Le niveau doit être compris entre 1 et 100."
            };
        }
    }

    // 10. Identifier la compétence
    const skill = verifierGetSkill(questionData);

    const allowedSkills = [
        "reading",
        "addition",
        "subtraction",
        "multiplication",
        "comprehension"
    ];

    if (!allowedSkills.includes(skill)) {
        return {
            valid: false,
            reason: "La compétence de la question est inconnue."
        };
    }


    // --------------------------------------------------
    // VÉRIFICATION DE LA LECTURE
    // --------------------------------------------------

    if (skill === "reading") {

        const levelType = verifierGetLevelType(questionData);

        // ----------------------------------------------
        // Lettre → mot
        // ----------------------------------------------

        if (
            levelType === "letter_word" ||
            verifierNormalizeText(questionData.question)
                .includes("quel mot commence par la lettre")
        ) {

            const match = questionData.question.match(
                /lettre\s+([A-Za-zÀ-ÿ])/i
            );

            if (match) {

                const requestedLetter =
                    verifierFirstLetter(match[1]);

                // La bonne réponse doit commencer par la lettre demandée
                if (
                    verifierFirstLetter(questionData.answer) !==
                    requestedLetter
                ) {
                    return {
                        valid: false,
                        reason:
                            "La bonne réponse ne commence pas par la lettre demandée."
                    };
                }

                // Les mauvaises réponses ne doivent pas commencer
                // par la même lettre.
                for (const choice of questionData.choices) {

                    if (
                        verifierNormalizeText(choice) !==
                        normalizedAnswer &&
                        verifierFirstLetter(choice) ===
                        requestedLetter
                    ) {
                        return {
                            valid: false,
                            reason:
                                "Un mauvais choix commence aussi par la lettre demandée."
                        };
                    }
                }
            }
        }


        // ----------------------------------------------
        // Emoji → mot
        // ----------------------------------------------

        else if (levelType === "emoji_word") {

            // Le générateur fournit normalement la réponse correcte
            // parmi les choix. On vérifie donc surtout la cohérence
            // structurelle sans inventer une correspondance emoji.
            if (
                typeof questionData.question !== "string" ||
                questionData.question.trim() === ""
            ) {
                return {
                    valid: false,
                    reason: "La question emoji est vide."
                };
            }
        }


        // ----------------------------------------------
        // Mot avec lettre manquante
        // ----------------------------------------------

        else if (levelType === "missing_letter") {

            const answerText = String(questionData.answer).trim();

            // Une seule lettre doit être proposée.
            if (!/^[A-Za-zÀ-ÿ]$/u.test(answerText)) {
                return {
                    valid: false,
                    reason:
                        "La réponse d'une question à lettre manquante doit être une seule lettre."
                };
            }

            // Si le générateur fournit le mot complet,
            // on peut vérifier que la lettre existe dedans.
            if (questionData.word) {

                const fullWord = verifierNormalizeText(
                    questionData.word
                );

                const missingLetter = verifierFirstLetter(answerText)
                    .toLowerCase();

                if (!fullWord.includes(missingLetter)) {
                    return {
                        valid: false,
                        reason:
                            "La lettre proposée n'existe pas dans le mot attendu."
                    };
                }
            }
        }


        // ----------------------------------------------
        // Phrase
        // ----------------------------------------------

        else if (levelType === "sentence") {

            if (questionData.choices.length < 3) {
                return {
                    valid: false,
                    reason:
                        "Une question de phrase doit proposer au moins trois choix."
                };
            }
        }


        // ----------------------------------------------
        // Compréhension écrite
        // ----------------------------------------------

        else if (
            levelType === "reading_comprehension" ||
            levelType === "reading-comprehension"
        ) {

            if (questionData.choices.length < 3) {
                return {
                    valid: false,
                    reason:
                        "Une question de compréhension doit proposer plusieurs réponses."
                };
            }
        }
    }


    // --------------------------------------------------
    // VÉRIFICATION DES MATHÉMATIQUES
    // --------------------------------------------------

    if (
        skill === "addition" ||
        skill === "subtraction" ||
        skill === "multiplication"
    ) {

        const question = questionData.question;

        let operation = null;
        let match = null;

        // Addition
        match = question.match(
            /(-?\d+(?:[.,]\d+)?)\s*\+\s*(-?\d+(?:[.,]\d+)?)/u
        );

        if (match) {
            operation = "addition";
        }

        // Soustraction
        if (!operation) {
            match = question.match(
                /(-?\d+(?:[.,]\d+)?)\s*[−-]\s*(-?\d+(?:[.,]\d+)?)/u
            );

            if (match) {
                operation = "subtraction";
            }
        }

        // Multiplication
        if (!operation) {
            match = question.match(
                /(-?\d+(?:[.,]\d+)?)\s*[×x*]\s*(-?\d+(?:[.,]\d+)?)/u
            );

            if (match) {
                operation = "multiplication";
            }
        }

        // Si aucune opération n'a pu être trouvée
        if (!operation || !match) {
            return {
                valid: false,
                reason:
                    "Le calcul mathématique n'a pas pu être identifié."
            };
        }

        const firstNumber = verifierToNumber(match[1]);
        const secondNumber = verifierToNumber(match[2]);

        if (
            firstNumber === null ||
            secondNumber === null
        ) {
            return {
                valid: false,
                reason:
                    "Les nombres du calcul sont invalides."
            };
        }

        let expectedAnswer;

        if (operation === "addition") {
            expectedAnswer = firstNumber + secondNumber;
        }

        if (operation === "subtraction") {
            expectedAnswer = firstNumber - secondNumber;
        }

        if (operation === "multiplication") {
            expectedAnswer = firstNumber * secondNumber;
        }

        const studentExpectedNumber =
            verifierToNumber(questionData.answer);

        if (
            studentExpectedNumber === null ||
            studentExpectedNumber !== expectedAnswer
        ) {
            return {
                valid: false,
                reason:
                    "La bonne réponse mathématique ne correspond pas au calcul."
            };
        }

        // Vérifier que la compétence déclarée correspond
        // réellement à l'opération.
        if (skill !== operation) {
            return {
                valid: false,
                reason:
                    "La compétence déclarée ne correspond pas à l'opération."
            };
        }
    }


    // --------------------------------------------------
    // VÉRIFICATION DE LA COMPRÉHENSION
    // --------------------------------------------------

    if (skill === "comprehension") {

        if (questionData.choices.length < 3) {
            return {
                valid: false,
                reason:
                    "Une question de compréhension doit avoir au moins trois choix."
            };
        }

        // La vérification générale garantit déjà que
        // la bonne réponse est présente parmi les choix.
    }


    // --------------------------------------------------
    // QUESTION VALIDÉE
    // --------------------------------------------------

    return {
        valid: true,
        reason: "Question vérifiée avec succès.",
        skill: skill
    };
}


// --------------------------------------------------
// COMPATIBILITÉ
// --------------------------------------------------

// Certaines parties de l'ancienne application peuvent appeler
// directement cette fonction.

function isQuestionValid(questionData) {
    return verifyQuestion(questionData).valid;
}


// --------------------------------------------------
// DEBUG
// --------------------------------------------------

console.log("🛡️ Agent Vérificateur de Mama Binta chargé.");
