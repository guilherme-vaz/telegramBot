const prisma = require("../prisma/client");

const BotController = {
    
    saveMessage: async (chatId, text) => {
        try {
            const telegramMessage = await prisma.messages.create({
                data: {
                    chatId,
                    text
                },
            });
            return telegramMessage;
        } catch (error) {
            console.error('Erro ao salvar mensagem:', error);
            throw error; // Você pode personalizar a resposta de erro se desejar
        }
    },

    getMessages: async (req, res) => {
        try {
            const logs = await prisma.messages.findMany();
            res.json(logs);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    answerMessage: async (req, res) => {
        const resposta = req.body;
        return resposta;
    },

    deleteMessage: async (req) => {
        const msgId = parseInt(req.params.id);
        try {
            await prisma.messages.delete({
                where: {
                    id: msgId
                }
            });


        } catch (error) {
            console.error('Erro ao deletar mensagens:', error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

}

module.exports = BotController;

