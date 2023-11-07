import axios from "axios";
import { Api } from "../helpers/api";
import { URL_API } from "../helpers/config";

const PREFIX_URL = 'api/usuarios';

export const loginUser = async (datos) => {
    const result = await axios.post(`${URL_API}/${PREFIX_URL}/login`,datos);
    return result;
}

export const registerUser = async (datos) => {
    const result = await Api().post(`${PREFIX_URL}/registrar`,datos);
    return result;
}