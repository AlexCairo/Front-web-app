import { Api } from "../helpers/api";

const PREFIX_URL = 'api/productos';

export const obtenerProductos = async(nombreCategoria,plataforma) => {
    const result = await Api().get(`${PREFIX_URL}/listar/${nombreCategoria}/${plataforma}`);
    return result;
}
export const detalleProducto = async(id) => {
    const result = await Api().get(`${PREFIX_URL}/detalle/${id}`);
    return result;
}