// =====================================================
// 🎯 PLANIFICATEUR PÉDAGOGIQUE DE MAMA BINTA
// =====================================================
// Son rôle :
// - déterminer le niveau actuel en maths
// - définir la zone de travail
// - décider quand progresser
// - éviter les sauts de difficulté
// =====================================================


// =====================================================
// 📚 NIVEAUX DE MATHS
// =====================================================

const MATH_LEVELS = [

    {
        level: 1,
        maxSum: 10
    },

    {
        level: 2,
        maxSum: 20
    },

    {
        level: 3,
        maxSum: 30
    },

    {
        level: 4,
        maxSum: 40
    },

    {
        level: 5,
        maxSum: 50
    },

    {
        level: 6,
        maxSum: 60
    },

    {
        level: 7,
        maxSum: 70
    },

    {
        level: 8,
        maxSum: 80
    },

    {
        level: 9,
        maxSum: 90
    },

    {
        level: 10,
        maxSum: 100
    }
];


// =====================================================
// 🔎 TROUVER LE NIVEAU
// =====================================================

function getMathLevel(maxSum) {

    for (
        const level of MATH_LEVELS
    ) {

        if (
            maxSum <= level.maxSum
        ) {

            return level;
        }
    }


    return MATH_LEVELS[
        MATH_LEVELS.length - 1
    ];
}


// =====================================================
// 📊 ANALYSER LA PROGRESSION
// =====================================================

function planMathProgression() {

    const memory =
        getStudentMemory();


    if (!memory) {

        return {

            level: 1,

            maxSum: 10,

            minSum: 1,

            status: "début",

            action: "apprendre"
        };
    }


    const correct =
        memory.mathsCorrect || 0;


    const incorrect =
        memory.mathsIncorrect || 0;


    const total =
        correct +
        incorrect;


    // =================================================
    // 🌱 DÉBUT
    // =================================================

    if (
        total === 0
    ) {

        return {

            level: 1,

            maxSum: 10,

            minSum: 2,

            status: "début",

            action: "apprendre",

            message:
                "Commencer les additions jusqu'à 10."
        };
    }


    // =================================================
    // 📈 NIVEAU ACTUEL
    // =================================================

    const highestCorrect =
        Number(
            memory.mathsHighestCorrectSum || 0
        );


    let currentLevel =
        getMathLevel(
            highestCorrect
        );


    // =================================================
    // 📊 RÉSULTATS RÉCENTS
    // =================================================

    const recentResults =
        Array.isArray(
            memory.recentResults
        )
            ? memory.recentResults
            : [];


    const recentMaths =
        recentResults.filter(
            result =>
                result.subject === "Maths"
        );


    const recentCorrect =
        recentMaths.filter(
            result =>
                result.correct === true
        ).length;


    const recentIncorrect =
        recentMaths.filter(
            result =>
                result.correct === false
        ).length;


    // =================================================
    // 🔴 DIFFICULTÉ RÉCENTE
    // =================================================

    if (
        recentIncorrect >= 3 ||
        (memory.mathsIncorrectStreak || 0) >= 3
    ) {

        return {

            level:
                currentLevel.level,

            maxSum:
                currentLevel.maxSum,

            minSum:
                Math.max(
                    2,
                    currentLevel.maxSum - 5
                ),

            status: "consolidation",

            action: "consolider",

            message:
                "Continuer le niveau actuel et consolider les additions."
        };
    }


    // =================================================
    // 🌟 CONDITIONS POUR PROGRESSER
    // =================================================

    if (
        recentMaths.length >= 5 &&
        recentCorrect >= 4 &&
        (memory.mathsCorrectStreak || 0) >= 4
    ) {

        const nextLevelIndex =
            Math.min(
                currentLevel.level,
                MATH_LEVELS.length - 1
            );


        const nextLevel =
            MATH_LEVELS[
                nextLevelIndex
            ];


        return {

            level:
                nextLevel.level,

            maxSum:
                nextLevel.maxSum,

            minSum:
                currentLevel.maxSum + 1,

            status: "progression",

            action: "progresser",

            message:
                "Mama Binta maîtrise bien son niveau. " +
                "Elle peut progresser progressivement."
        };
    }


    // =================================================
    // ⚖️ CONTINUER LE NIVEAU ACTUEL
    // =================================================

    return {

        level:
            currentLevel.level,

        maxSum:
            currentLevel.maxSum,

        minSum:
            Math.max(
                2,
                currentLevel.maxSum - 5
            ),

        status: "continuer",

        action: "continuer",

        message:
            "Continuer à travailler progressivement " +
            "dans le niveau actuel."
    };
}


// =====================================================
// 📤 FONCTION PRINCIPALE
// =====================================================

function getMathPlan() {

    return planMathProgression();
}
