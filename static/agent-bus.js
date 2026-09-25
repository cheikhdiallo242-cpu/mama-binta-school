// =====================================================
// 🤖 BUS DE COMMUNICATION DES AGENTS
// =====================================================
//
// RÔLE :
// Ce fichier permet aux agents de Mama Binta
// de s'envoyer des messages structurés.
//
// IMPORTANT :
// - Le bus ne décide rien.
// - Il ne modifie pas la mémoire pédagogique.
// - Il ne choisit pas le niveau.
// - Il ne crée pas d'exercices.
//
// Il transporte et conserve les échanges entre agents.
//
// =====================================================


// =====================================================
// 💾 STOCKAGE DES MESSAGES
// =====================================================

const AGENT_BUS_STORAGE_KEY =
    "mamaBintaAgentBus";

const AGENT_BUS_MAX_MESSAGES = 100;


// =====================================================
// 🏷️ AGENTS AUTORISÉS
// =====================================================

const AGENT_NAMES = [
    "memory",
    "analyzer",
    "profile",
    "planner",
    "generator",
    "verifier",
    "teacher",
    "orchestrator"
];


// =====================================================
// 🏷️ NOMS POUR L'AFFICHAGE
// =====================================================

const AGENT_LABELS = {

    memory:
        "🧠 Mémoire",

    analyzer:
        "🔎 Analyseur",

    profile:
        "🧑🏾‍🏫 Profil",

    planner:
        "🎯 Planificateur",

    generator:
        "📚 Générateur",

    verifier:
        "🛡️ Vérificateur",

    teacher:
        "👩🏾‍🏫 Professeur",

    orchestrator:
        "🤖 Orchestrateur"

};


// =====================================================
// 🧹 NORMALISER UN AGENT
// =====================================================

function normalizeAgentName(
    agent
) {

    if (
        typeof agent !==
        "string"
    ) {

        return "unknown";

    }

    const normalized =
        agent
            .trim()
            .toLowerCase();

    if (
        AGENT_NAMES.includes(
            normalized
        )
    ) {

        return normalized;

    }

    return "unknown";

}


// =====================================================
// 🏷️ NOM HUMAIN D'UN AGENT
// =====================================================

function getAgentLabel(
    agent
) {

    const normalized =
        normalizeAgentName(
            agent
        );

    return (
        AGENT_LABELS[
            normalized
        ] ||
        "🤖 Agent inconnu"
    );

}


// =====================================================
// 💾 CHARGER LES MESSAGES
// =====================================================

function loadAgentBusMessages() {

    try {

        const saved =
            localStorage.getItem(
                AGENT_BUS_STORAGE_KEY
            );

        if (!saved) {

            return [];

        }

        const parsed =
            JSON.parse(
                saved
            );

        if (
            !Array.isArray(
                parsed
            )
        ) {

            return [];

        }

        return parsed;

    } catch (error) {

        console.error(
            "❌ Impossible de charger le bus des agents :",
            error
        );

        return [];

    }

}


// =====================================================
// 💾 SAUVEGARDER LES MESSAGES
// =====================================================

function saveAgentBusMessages(
    messages
) {

    try {

        localStorage.setItem(
            AGENT_BUS_STORAGE_KEY,
            JSON.stringify(
                messages
            )
        );

    } catch (error) {

        console.error(
            "❌ Impossible de sauvegarder le bus des agents :",
            error
        );

    }

}


// =====================================================
// 🧹 NETTOYER UN MESSAGE
// =====================================================

function normalizeAgentMessage(
    message
) {

    if (
        !message ||
        typeof message !==
        "object"
    ) {

        return null;

    }

    const from =
        normalizeAgentName(
            message.from
        );

    const to =
        normalizeAgentName(
            message.to
        );

    if (
        from === "unknown" ||
        to === "unknown"
    ) {

        return null;

    }

    return {

        id:
            message.id ||
            (
                "msg_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .slice(2, 8)
            ),

        from:
            from,

        to:
            to,

        type:
            typeof message.type ===
            "string"
                ? message.type
                : "information",

        topic:
            typeof message.topic ===
            "string"
                ? message.topic
                : "general",

        data:
            message.data &&
            typeof message.data ===
            "object"
                ? message.data
                : {},

        message:
            typeof message.message ===
            "string"
                ? message.message
                : "",

        mode:
            message.mode ===
            "human"
                ? "human"
                : "technical",

        timestamp:
            message.timestamp ||
            new Date().toISOString()

    };

}


// =====================================================
// 📡 ENVOYER UN MESSAGE
// =====================================================

function agentSendMessage(
    from,
    to,
    type,
    data = {},
    message = "",
    mode = "technical"
) {

    const normalizedFrom =
        normalizeAgentName(
            from
        );

    const normalizedTo =
        normalizeAgentName(
            to
        );

    if (
        normalizedFrom ===
        "unknown"
    ) {

        console.warn(
            "⚠️ Agent expéditeur inconnu :",
            from
        );

        return null;

    }

    if (
        normalizedTo ===
        "unknown"
    ) {

        console.warn(
            "⚠️ Agent destinataire inconnu :",
            to
        );

        return null;

    }


    const safeMode =
        mode === "human"
            ? "human"
            : "technical";


    const agentMessage = {

        id:
            "msg_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .slice(2, 8),

        from:
            normalizedFrom,

        to:
            normalizedTo,

        type:
            typeof type ===
            "string"
                ? type
                : "information",

        topic:
            typeof type ===
            "string"
                ? type
                : "general",

        data:
            data &&
            typeof data ===
            "object"
                ? data
                : {},

        message:
            typeof message ===
            "string"
                ? message
                : "",

        mode:
            safeMode,

        timestamp:
            new Date().toISOString()

    };


    const messages =
        loadAgentBusMessages();


    messages.push(
        agentMessage
    );


    if (
        messages.length >
        AGENT_BUS_MAX_MESSAGES
    ) {

        messages.splice(
            0,
            messages.length -
            AGENT_BUS_MAX_MESSAGES
        );

    }


    saveAgentBusMessages(
        messages
    );


    // -------------------------------------------------
    // 📢 ÉVÉNEMENT TEMPS RÉEL
    // -------------------------------------------------

    try {

        window.dispatchEvent(
            new CustomEvent(
                "mamaBintaAgentMessage",
                {
                    detail:
                        agentMessage
                }
            )
        );

    } catch (error) {

        console.warn(
            "⚠️ Événement agent non diffusé :",
            error
        );

    }


    // -------------------------------------------------
    // 🖥️ DEBUG
    // -------------------------------------------------

    console.log(
        "🤖 MESSAGE AGENT",
        getAgentLabel(
            normalizedFrom
        ),
        "→",
        getAgentLabel(
            normalizedTo
        ),
        agentMessage
    );


    return agentMessage;

}


// =====================================================
// 📥 LIRE LES MESSAGES
// =====================================================

function getAgentBusMessages() {

    return loadAgentBusMessages();

}


// =====================================================
// 📥 LIRE LES DERNIERS MESSAGES
// =====================================================

function getRecentAgentMessages(
    limit = 20
) {

    const messages =
        loadAgentBusMessages();

    const safeLimit =
        Math.max(
            1,
            Number(limit) || 20
        );

    return messages.slice(
        -safeLimit
    );

}


// =====================================================
// 🔎 LIRE LES MESSAGES D'UN AGENT
// =====================================================

function getAgentMessages(
    agent
) {

    const normalized =
        normalizeAgentName(
            agent
        );

    if (
        normalized ===
        "unknown"
    ) {

        return [];

    }

    return loadAgentBusMessages()
        .filter(
            message =>
                message.from ===
                    normalized ||
                message.to ===
                    normalized
        );

}


// =====================================================
// 🔎 LIRE LES MESSAGES ENTRE DEUX AGENTS
// =====================================================

function getMessagesBetweenAgents(
    agentA,
    agentB
) {

    const a =
        normalizeAgentName(
            agentA
        );

    const b =
        normalizeAgentName(
            agentB
        );

    if (
        a === "unknown" ||
        b === "unknown"
    ) {

        return [];

    }

    return loadAgentBusMessages()
        .filter(
            message =>
                (
                    message.from === a &&
                    message.to === b
                ) ||
                (
                    message.from === b &&
                    message.to === a
                )
        );

}


// =====================================================
// 🧹 EFFACER LE BUS
// =====================================================
//
// Cette fonction sera utile pour les tests.
// Elle n'efface PAS la mémoire pédagogique.
// Elle efface uniquement les conversations
// enregistrées entre agents.
//
// =====================================================

function clearAgentBus() {

    try {

        localStorage.removeItem(
            AGENT_BUS_STORAGE_KEY
        );

        console.log(
            "🧹 Bus des agents vidé."
        );

        return true;

    } catch (error) {

        console.error(
            "❌ Impossible de vider le bus des agents :",
            error
        );

        return false;

    }

}


// =====================================================
// 🧪 TEST SIMPLE DU BUS
// =====================================================
//
// Ce test permet de vérifier que deux agents
// peuvent réellement communiquer.
//
// =====================================================

function testAgentBus() {

    clearAgentBus();


    const message =
        agentSendMessage(

            "analyzer",

            "planner",

            "analysis_result",

            {
                skill:
                    "subtraction",

                status:
                    "needs_support",

                accuracy:
                    40,

                trend:
                    "declining"

            },

            "La soustraction nécessite actuellement un renforcement.",

            "human"

        );


    const messages =
        getAgentBusMessages();


    const success =
        Boolean(
            message &&
            messages.length === 1 &&
            messages[0].from ===
                "analyzer" &&
            messages[0].to ===
                "planner"
        );


    console.log(
        success
            ? "✅ TEST DU BUS RÉUSSI"
            : "❌ TEST DU BUS ÉCHOUÉ"
    );


    return {

        success:
            success,

        message:
            message,

        messages:
            messages

    };

}


// =====================================================
// 📡 ÉCOUTER LES MESSAGES EN TEMPS RÉEL
// =====================================================
//
// Plus tard, l'interface utilisera cet événement
// pour afficher les discussions sans recharger
// la page.
//
// =====================================================

function listenToAgentMessages(
    callback
) {

    if (
        typeof callback !==
        "function"
    ) {

        return false;

    }


    window.addEventListener(
        "mamaBintaAgentMessage",
        function(event) {

            if (
                event &&
                event.detail
            ) {

                callback(
                    event.detail
                );

            }

        }
    );


    return true;

}


// =====================================================
// 🧠 INFORMATIONS DU BUS
// =====================================================

function getAgentBusStatus() {

    const messages =
        loadAgentBusMessages();


    return {

        totalMessages:
            messages.length,

        lastMessage:
            messages.length > 0
                ? messages[
                    messages.length - 1
                ]
                : null,

        agents:
            AGENT_NAMES.slice(),

        storageKey:
            AGENT_BUS_STORAGE_KEY

    };

}


// =====================================================
// 🚀 INITIALISATION
// =====================================================

console.log(
    "🤖 Bus de communication des agents chargé."
);

console.log(
    "📡 Agents disponibles :",
    AGENT_NAMES
);

console.log(
    "🔗 Communication temps réel :",
    "active"
);
