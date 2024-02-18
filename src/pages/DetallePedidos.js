import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DetallePedidos.css";
import { pedidoPorCliente } from "../services/Pedido.service";
import { UserContext } from "../context/UserContext";
import PedidoComponent from "../components/PedidoComponent";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const DetallePedidos = () => {
  let productosPorPagina = 4;
  const { info } = useParams();
  const [ status, setStatus ] = useState('all');
  const [ listadoProductos, setListadoProductos ] = useState([]);
  const [ pedidosFiltrados, setPedidosFiltrados ] = useState([]);
  const [ paginaActual, setPaginaActual ] = useState(1);
  const [ userIdLoading, setUserIdLoading ] = useState(true); // Nuevo estado para controlar la carga del userId
  const { userId } = useContext(UserContext);

  useEffect(() => {
      if (userId === null) {
          setUserIdLoading(true);
      } else {
          setUserIdLoading(false);
      }
  }, [userId]);

  useEffect(() => {
      if (!userIdLoading) {
          const obtenerPedidosPorCliente = async () => {
              const res = await pedidoPorCliente(userId);
              setListadoProductos(res.data);
          }
          obtenerPedidosPorCliente();
      }
  }, [userIdLoading, userId]);

  useEffect(() => {
      if (status === 'all') {
          setPedidosFiltrados(listadoProductos.filter(pedido => userId === pedido.clienteId));
      } else {
          setPedidosFiltrados(listadoProductos.filter(pedido => userId === pedido.clienteId && pedido.estadoPedido === status));
      }
      setPaginaActual(1);
  }, [status, listadoProductos, userId]);

  const lastProductIndex = paginaActual * productosPorPagina;
  const firstPostIndex = lastProductIndex - productosPorPagina;
  const currentProducts = pedidosFiltrados.slice(firstPostIndex, lastProductIndex); 

  return (
      <section className="section-mis-pedidos">
        {info === "mis-pedidos" ? (
          <>
            <h1 className="section-tittle">Mis Pedidos</h1>
            {userIdLoading ? ( 
              <div className="loader">
                <Loader />
              </div>
            ) : (
              currentProducts ?   
                <section className="section-listado-pedidos">
                  <div className="filter-status">
                    <label htmlFor="estadoPedido">Filtrar pedidos :</label>
                      <select id="estadoPedido" onChange={(e) => setStatus(e.target.value)}>
                        <option value="all">
                            Todos
                        </option>
                        <option value="P">
                            Pagado
                        </option>
                        <option value="A">
                            Anulado
                        </option>
                        <option value="S">
                            Sin pagar
                        </option>
                      </select>
                  </div>
                  <div className="pedidos_container">
                    {currentProducts.map((pedido) =>  (
                        <PedidoComponent 
                          key = {pedido._id}
                          prod = {pedido}
                        /> 
                    ))}
                      <Pagination
                        productosPorPagina = {productosPorPagina}
                        paginaActual = {paginaActual}
                        setPaginaActual = {setPaginaActual}
                        totalProductos = {pedidosFiltrados.length}
                      />
                  </div>
                </section>
                : <div className="loader">
                    <Loader />
                  </div>
            )}
          </>
        ) : (
          <h1 className="section-tittle">Mi Cuenta</h1>
        )}
      </section>
    );     
}

export default DetallePedidos;