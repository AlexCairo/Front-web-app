import axios from "axios";
import { URL_API } from "./config.js";

export const Api = () => {
    const token = localStorage.token;
    const apiAxios = axios.create({
        baseURL : URL_API,
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    });
    return apiAxios;
}