import axiosxios from 'axios'
import axios from "axios";

//Par defaut -> http://localhost:8080/api
export default axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-type": "application/json"
  }
});