import axios from "axios";

const api = axios.create({
    baseURL: "https://apis.codante.io/api/reviews-api"
})

export default api;