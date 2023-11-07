import { Api } from "../helpers/api";

const PREFIX_URL = "/api/pedidos";

export const guardarPedido = async (productos) => {
    const result = await Api().post(`${PREFIX_URL}/guardar`,productos);
    return result;
}

export const listarPedidos = async () => {
    const result = await Api().get(`${PREFIX_URL}/listar`);
    return result;
}
