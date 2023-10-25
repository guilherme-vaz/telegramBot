import { API } from ".";

export default {
  list: () => API.get("logs").then((response) => response.data),
  register: ({ email, password }) =>
    API.post("register", { email, password }).then((response) => response.data),

  login: ({ email, password }) =>
    API.post("login", { email, password }).then((response) => {
      const token = response.data.token;
      localStorage.setItem("authToken", token);
    }),

  response: (message) =>
    API.post("response", message).then((response) => response.data),
  delete: (id) => API.delete(`/delete/${id}`).then((response) => response),
};
