import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DetallePedidos.css";
import { listarPedidos } from "../services/Pedido.service";
import { UserContext } from "../context/UserContext";
import PedidoComponent from "../components/PedidoComponent";
import Loader from "../components/Loader"

const DetallePedidos = () => {
    
    const { info } = useParams();
    const [ listadoProductos, setListadoProductos ] = useState();
    const { userId } = useContext(UserContext);

    const obtenerPedidos = async() =>{
        const res = await listarPedidos();
        setListadoProductos(res.data);
    }

    useEffect(() => {
        obtenerPedidos();
    },[])

    return (
        <section className="section-mis-pedidos">
          {info === "mis-pedidos" ? (
            <>
              <h1 className="section-tittle">Mis Pedidos</h1>
              {listadoProductos ?   
                <section className="section-listado-pedidos">
                  {listadoProductos.filter((pedido) => userId === pedido.clienteId)
                  .map((pedido) =>  (
                    <PedidoComponent 
                      key = {pedido._id}
                      prod = {pedido}
                    /> 
                  )) } 
                </section>
                : <Loader />}
            </>
          ) : (
            <h1 className="section-tittle">Mi Cuenta</h1>
          )}
        </section>
      );
      

}

export default DetallePedidos;