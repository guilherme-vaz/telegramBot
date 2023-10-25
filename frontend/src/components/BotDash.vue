<template>
  <div class="message-list-container">
    <div class="messages">
      <ul v-if="messages" class="message-list">
        <li
          v-for="(message, index) in messages"
          :key="index"
          class="message-item"
        >
          <div class="card-container">
            <div class="card">
              <h2 class="card-title">
                Mensagem recebida no chat <strong>{{ message.chatId }}</strong>
              </h2>
              <p class="card-text">{{ message.text }}</p>
              <textarea
                v-model="message.responses"
                name="resposta"
                id="resposta"
                placeholder="Digite sua resposta aqui"
                class="card-textarea"
              ></textarea>
              <button
                class="card-button"
                @click="replyToMessage(message, message.id)"
              >
                Enviar Resposta
              </button>
              <button
                class="card-button delete"
                @click="deleteMessage(message.id)"
              >
                Deletar
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apiService from "../api/apiService";
import { ref, onMounted } from "vue";

export default {
  name: "BotDash",
  setup() {
    const messages = ref([]);
    const resposta = ref({
      message: "",
    });

    const getMessages = async () => {
      try {
        const response = await apiService.list();
        messages.value = response;
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      }

      // Próxima busca de mensagens, ref não tá funcionando não sei porque.
      setTimeout(getMessages, 4000);
    };

    const replyToMessage = async (message, index) => {
      try {
        await apiService.response(resposta.value);
        console.log(
          `Respondendo à mensagem de id ${index}: ${message.responses}`
        );
      } catch (error) {
        console.error("Erro ao enviar a resposta:", error);
      }
    };

    const deleteMessage = async (index) => {
      try {
        await apiService.delete(index);
        getMessages();
      } catch (error) {
        console.error("Erro ao enviar a resposta:", error);
      }
    };

    onMounted(() => {
      getMessages();
    });

    return {
      resposta,
      messages,
      replyToMessage,
      deleteMessage,
    };
  },
};
</script>

<style scoped>
.message-list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.message-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.message-item {
  flex: 1;
}

.card-container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.card {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 20px;
  margin: 0 0 10px;
}

.card-text {
  font-size: 16px;
  margin: 0 0 20px;
}

.card-textarea {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  font-size: 16px;
  resize: none;
  margin: 0 0 20px;
}

.card-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px 0 0;
}

.card-button.delete {
  background-color: #ff5555;
}

.card-button:hover {
  background-color: #0056b3;
}

.card-button.delete:hover {
  background-color: #dd4444;
}
</style>
