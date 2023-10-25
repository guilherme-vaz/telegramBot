<template>
  <div class="login-container">
    <h2 class="title">Login</h2>
    <form class="form" @submit.prevent="loginAdmin">
      <input type="text" v-model="admin.email" placeholder="Seu email aqui" />
      <input
        type="password"
        v-model="admin.password"
        placeholder="Sua senha aqui"
      />
      <button class="button" type="submit">Entrar</button>
      <router-link class="button" to="/register">Fazer cadastro</router-link>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";

export default {
  name: "AdminLogin",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const loginAdmin = async () => {
      try {
        await authStore.loginAdmin();
        router.push("/dash");
      } catch (error) {
        console.error("Erro ao fazer login:", error.message);
      }
    };

    return {
      admin: authStore.admin,
      loginAdmin,
    };
  },
};
</script>

<style scoped>
.login-container {
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

.button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  margin-left: 0.4rem;
}

.button a {
  text-decoration: none;
  color: #fff;
}

.button:hover {
  background-color: #0056b3;
}

.button a:hover {
  color: #f0f0f0;
}

.button,
.button a,
input {
  transition: all 0.2s;
}

.button:focus,
input:focus {
  outline: none;
}
</style>
