import axios from "axios";

const api = axios.create({
  baseURL: "https://6a04631e2afe8349b4b6888b.mockapi.io/api/filmes/filmes",
  timeout: 10000,
});

export default api;
