// =====================================================
// 🎯 PLANIFICATEUR PÉDAGOGIQUE DE MAMA BINTA
// =====================================================
// Son rôle :
// - gérer le niveau actuel en maths
// - éviter les sauts de difficulté
// - faire progresser Mama Binta progressivement
// - consolider un niveau avant de passer au suivant
//
// IMPORTANT :
// Le planificateur ne se base PAS simplement sur la
// meilleure addition jamais réussie.
// Cela évite qu'une réussite isolée fasse monter
// brutalement le niveau.
// =====================================================


// =====================================================
// 📚 NIVEAUX DE MATHS
// =====================================================

const MATH_LEVELS = [

    {
        level: 1,
        minSum: 1,
        maxSum: 10
    },

    {
        level: 2,
        minSum: 1,
        maxSum: 20
    },

    {
        level: 3,
        minSum: 1,
        maxSum: 30
    },

    {
        level: 4,
        minSum: 1,
        maxSum: 40
    },

    {
        level: 5,
        minSum: 1,
        maxSum: 50
    },

    {
        level: 6,
        minSum: 1,
        maxSum: 60
    },

    {
        level: 7,
        minSum: 1,
        maxSum: 70
    },

    {
        level: 8,
        minSum: 1,
        maxSum: 80
    },

    {
        level: 9,
        minSum: 1,
        maxSum: 90
    },

    {
        level: 10,
        minSum: 1,
        maxSum: 100
    }
];


// =====================================================
// 💾 CLÉ DE MÉMOIRE DU NIVEAU
// =====================================================

const MATH_LEVEL_STORAGE_KEY =
    "mamaBintaMathLevel";


// =====================================================
// 🔎 RÉCUPÉRER LE NIVEAU SAUVEGARDÉ
// =====================================================

function getStoredMathLevel() {

    try {

        const savedLevel =
            localStorage.getItem(
                MATH_LEVEL_STORAGE_KEY
            );


        if (savedLevel !== null) {

            const level =
                parseInt(
                    savedLevel
                );


            if (
                level >= 1 &&
                level <= MATH_LEVELS.length
            ) {

                return level;
            }
        }

    } catch (error) {

        console.log(
            "⚠️ Impossible de récupérer le niveau de maths.",
            error
        );
    }


    // Par défaut :
    // Mama Binta commence au niveau 1.

    return 1;
}


// =====================================================
// 💾 SAUVEGARDER LE NIVEAU
// =====================================================

function saveMathLevel(level) {

    try {

        localStorage.setItem(
            MATH_LEVEL_STORAGE_KEY,
            String(level)
        );

    } catch (error) {

        console.log(
            "⚠️ Impossible de sauvegarder le niveau de maths.",
            error
        );
    }
}


// =====================================================
// 📚 RÉCUPÉRER LES INFORMATIONS DU NIVEAU
// =====================================================

function getMathLevelInfo(level) {

    const safeLevel =
        Math.max(
            1,
            Math.min(
                level,
                MATH_LEVELS.length
            )
        );


    return MATH_LEVELS[
        safeLevel - 1
    ];
}


// =====================================================
// 🧮 EXTRAIRE LE RÉSULTAT D'UNE ADDITION
// =====================================================

function getQuestionSum(question) {

    if (
        !question
    ) {
        return null;
    }


    const match =
        question.match(
            /Combien font (\d+) \+ (\d+)/
        );


    if (!match) {

        return null;
    }


    const a =
        parseInt(
            match[1]
        );


    const b =
        parseInt(
            match[2]
        );


    return a + b;
}


// =====================================================
// 📊 RÉCUPÉRER LES DERNIERS EXERCICES DE MATHS
// =====================================================

function getRecentMathResults() {

    const memory =
        getStudentMemory();


    if (
        !memory ||
        !Array.isArray(
            memory.recentResults
        )
    ) {

        return [];
    }


    return memory.recentResults.filter(
        result =>
            result.subject === "Maths"
    );
}


// =====================================================
// 🎯 ANALYSER LE NIVEAU ACTUEL
// =====================================================

function planMathProgression() {

    const memory =
        getStudentMemory();


    // =================================================
    // 🌱 AUCUNE DONNÉE
    // =================================================

    if (!memory) {

        saveMathLevel(1);

        return {

            level: 1,

            minSum: 1,

            maxSum: 10,

            status: "début",

            action: "apprendre",

            message:
                "Commencer progressivement les additions jusqu'à 10."
        };
    }


    const totalMaths =
        (memory.mathsCorrect || 0) +
        (memory.mathsIncorrect || 0);


    // =================================================
    // 🔄 SI LA MÉMOIRE EST VIDE
    // =================================================
    // Cela permet aussi de repartir proprement au
    // niveau 1 après une remise à zéro.

    if (
        totalMaths === 0
    ) {

        saveMathLevel(1);

        return {

            level: 1,

            minSum: 1,

            maxSum: 10,

            status: "début",

            action: "apprendre",

            message:
                "Mama Binta commence son apprentissage. " +
                "Nous allons travailler les additions jusqu'à 10."
        };
    }


    // =================================================
    // 📚 NIVEAU ACTUEL
    // =================================================

    let currentLevel =
        getStoredMathLevel();


    let levelInfo =
        getMathLevelInfo(
            currentLevel
        );


    // =================================================
    // 📊 RÉSULTATS RÉCENTS
    // =================================================

    const recentMaths =
        getRecentMathResults();


    // -------------------------------------------------
    // On ne regarde que les exercices qui appartiennent
    // au niveau actuel.
    //
    // Ainsi, d'anciens exercices difficiles ne peuvent
    // pas faire monter artificiellement le niveau.
    // -------------------------------------------------

    const levelResults =
        recentMaths.filter(
            result => {

                const sum =
                    getQuestionSum(
                        result.question
                    );


                return (
                    sum !== null &&
                    sum <= levelInfo.maxSum
                );
            }
        );


    // =================================================
    // 📊 STATISTIQUES DU NIVEAU
    // =================================================

    const correctCount =
        levelResults.filter(
            result =>
                result.correct === true
        ).length;


    const incorrectCount =
        levelResults.filter(
            result =>
                result.correct === false
        ).length;


    // =================================================
    // 🔥 RÉCUPÉRER LES 5 DERNIERS EXERCICES
    // =================================================

    const lastFive =
        levelResults.slice(-5);


    const lastFiveCorrect =
        lastFive.filter(
            result =>
                result.correct === true
        ).length;


    const lastFiveIncorrect =
        lastFive.filter(
            result =>
                result.correct === false
        ).length;


    // =================================================
    // 🎯 RÉUSSITES PRÈS DU SOMMET DU NIVEAU
    // =================================================
    // Exemple niveau 1 :
    // 8 + 9 = 17 serait hors niveau.
    //
    // On veut vérifier que l'enfant maîtrise aussi
    // le haut du niveau :
    //
    // niveau 1 → résultats 8 à 10
    // niveau 2 → résultats 18 à 20
    // niveau 3 → résultats 28 à 30
    // etc.

    const nearTopMinimum =
        Math.max(
            1,
            levelInfo.maxSum - 2
        );


    const nearTopCorrect =
        levelResults.filter(
            result => {

                if (
                    result.correct !== true
                ) {
                    return false;
                }


                const sum =
                    getQuestionSum(
                        result.question
                    );


                return (
                    sum !== null &&
                    sum >= nearTopMinimum &&
                    sum <= levelInfo.maxSum
                );
            }
        ).length;


    // =================================================
    // 🔴 TROP D'ERREURS
    // =================================================

    if (
        lastFive.length >= 3 &&
        lastFiveIncorrect >= 3
    ) {

        return {

            level:
                currentLevel,

            minSum:
                levelInfo.minSum,

            maxSum:
                levelInfo.maxSum,

            status: "consolidation",

            action: "consolider",

            message:
                "Mama Binta rencontre encore quelques difficultés. " +
                "Nous allons rester au niveau " +
                currentLevel +
                " et consolider les bases."
        };
    }


    // =================================================
    // 🌟 CONDITIONS POUR PASSER AU NIVEAU SUIVANT
    // =================================================
    //
    // Il faut :
    //
    // 1. au moins 5 exercices du niveau
    // 2. au moins 4 réussites sur les 5 derniers
    // 3. au moins 2 réussites proches du maximum
    //
    // Cela évite les montées trop rapides.

    const canProgress =
        lastFive.length >= 5 &&
        lastFiveCorrect >= 4 &&
        nearTopCorrect >= 2;


    if (
        canProgress &&
        currentLevel <
        MATH_LEVELS.length
    ) {

        const nextLevel =
            currentLevel + 1;


        const nextLevelInfo =
            getMathLevelInfo(
                nextLevel
            );


        saveMathLevel(
            nextLevel
        );


        return {

            level:
                nextLevel,

            minSum:
                nextLevelInfo.minSum,

            maxSum:
                nextLevelInfo.maxSum,

            status: "progression",

            action: "progresser",

            previousLevel:
                currentLevel,

            message:
                "🌟 Bravo ! Mama Binta maîtrise bien le niveau " +
                currentLevel +
                ". " +
                "Nous pouvons maintenant passer progressivement " +
                "au niveau " +
                nextLevel +
                "."
        };
    }


    // =================================================
    // 🏆 NIVEAU 10
    // =================================================

    if (
        currentLevel ===
        MATH_LEVELS.length
    ) {

        return {

            level:
                currentLevel,

            minSum:
                levelInfo.minSum,

            maxSum:
                levelInfo.maxSum,

            status: "maitrise",

            action: "consolider",

            message:
                "🏆 Mama Binta travaille maintenant " +
                "sur des additions jusqu'à 100. " +
                "Continuons à renforcer sa maîtrise."
        };
    }


    // =================================================
    // ⚖️ CONTINUER LE NIVEAU
    // =================================================

    return {

        level:
            currentLevel,

        minSum:
            levelInfo.minSum,

        maxSum:
            levelInfo.maxSum,

        status: "continuer",

        action: "continuer",

        message:
            "🧠 Continuons progressivement au niveau " +
            currentLevel +
            ". " +
            "Nous attendons encore quelques résultats " +
            "avant de passer au niveau suivant."
    };
}


// =====================================================
// 📤 FONCTION PRINCIPALE
// =====================================================

function getMathPlan() {

    return planMathProgression();
}


// =====================================================
// 🔄 RÉINITIALISER LE PLAN MATHS
// =====================================================

function resetMathPlan() {

    saveMathLevel(1);

    console.log(
        "🔄 Planificateur maths remis au niveau 1."
    );
}
