import axios from "axios";

const api = axios.create({
   baseURL: "https://chronosync-9lts.onrender.com",
  withCredentials: true,
});

export default api;

