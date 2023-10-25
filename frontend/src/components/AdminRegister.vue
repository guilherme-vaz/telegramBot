<template>
  <div class="register-container">
    <h2 class="title">Cadastro de Admin</h2>
    <form @submit.prevent="registerAdmin()" class="register-form">
      <input
        type="text"
        v-model="novoAdmin.email"
        placeholder="Seu email aqui"
        required
      />
      <input
        type="password"
        v-model="novoAdmin.password"
        placeholder="Sua senha aqui"
        required
      />
      <button type="submit">Registrar</button>
      <button><router-link to="/">Ir para login</router-link></button>
    </form>
  </div>
</template>

<script>
import apiService from "@/api/apiService";
import { ref } from "vue";

export default {
  name: "AdminRegister",
  setup() {
    const novoAdmin = ref({
      email: "",
      password: "",
    });

    const registerAdmin = async () => {
      try {
        await apiService.register(novoAdmin.value);
        novoAdmin.value = {
          email: "",
          password: "",
        };
      } catch (error) {
        console.error("Erro ao criar Admin:", error);
      }
    };

    return {
      novoAdmin,
      registerAdmin,
    };
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  margin-left: 0.4rem;
}

button a {
  text-decoration: none;
  color: #fff;
}

button:hover {
  background-color: #0056b3;
}

button a:hover {
  color: #f0f0f0;
}

button,
button a,
input {
  transition: all 0.2s;
}

button:focus,
input:focus {
  outline: none;
}
</style>
