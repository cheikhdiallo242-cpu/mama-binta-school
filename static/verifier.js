// ===== AGENT VÉRIFICATEUR DE MAMA BINTA =====

function verifyQuestion(questionData) {

    // 1. Vérifier que les informations principales existent
    if (!questionData) {
        return {
            valid: false,
            reason: "La question est vide."
        };
    }

    if (!questionData.question) {
        return {
            valid: false,
            reason: "La question n'existe pas."
        };
    }

    if (!Array.isArray(questionData.choices)) {
        return {
            valid: false,
            reason: "Les choix sont absents."
        };
    }

    if (!questionData.answer) {
        return {
            valid: false,
            reason: "La bonne réponse est absente."
        };
    }

    // 2. Il faut au moins 3 choix
    if (questionData.choices.length < 3) {
        return {
            valid: false,
            reason: "Il n'y a pas assez de choix."
        };
    }

    // 3. La bonne réponse doit être présente
    if (!questionData.choices.includes(questionData.answer)) {
        return {
            valid: false,
            reason: "La bonne réponse n'est pas dans les choix."
        };
    }

    // 4. Les choix doivent être différents
    const uniqueChoices = new Set(questionData.choices);

    if (uniqueChoices.size !== questionData.choices.length) {
        return {
            valid: false,
            reason: "Deux choix sont identiques."
        };
    }

    // 5. Vérification spéciale pour les questions de lecture
    if (questionData.question.startsWith("Quel mot commence par la lettre")) {

        const match = questionData.question.match(
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

            // La bonne réponse doit commencer par la bonne lettre
            if (firstLetter(questionData.answer) !== firstLetter(letter)) {
                return {
                    valid: false,
                    reason: "La bonne réponse ne correspond pas à la lettre demandée."
                };
            }

            // Les autres choix ne doivent PAS commencer par cette lettre
            for (const choice of questionData.choices) {

                if (
                    choice !== questionData.answer &&
                    firstLetter(choice) === firstLetter(letter)
                ) {
                    return {
                        valid: false,
                        reason: "Un mauvais choix commence aussi par la lettre demandée."
                    };
                }
            }
        }
    }

    // 6. Tout est correct
    return {
        valid: true,
        reason: "Question vérifiée avec succès."
    };
}
