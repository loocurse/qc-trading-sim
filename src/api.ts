import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2000/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

export default instance;