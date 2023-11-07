import "../styles/MiPerfil.css";
import FormComponent from "../components/FormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useEffect,useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { listarPedidos } from "../services/Pedido.service";
import moment from "moment";

const MiPerfilPage = () => {

    const [ listaPedidos, setListaPedidos ] = useState();
    const navigate = useNavigate()
    const { loginRegister } = useParams();
    const token = localStorage.token;
    const { userId, user, email, logout } = useContext(UserContext)

    const logoutUser = () => {
        logout();
        navigate("/cuenta/login");
    }

    const obtenerPedidos = async() => {
        const res = await listarPedidos();
        setListaPedidos(res.data);
    }

    useEffect(()=>{
        if (token && (loginRegister === "login" || loginRegister === "register")) {
            navigate("/cuenta/detalle");
        }
        obtenerPedidos()      
    },[loginRegister,token,navigate])

    return (
            <section className="mi-perfil-section">
            {!token ? (<FormComponent />) : (
                    <>
                    <h1 className="mi-perfil-title">Mi Cuenta</h1>                    
                    <div className="informacion-cuenta">
                        <span className="informacion-cuenta-subtitle">Información de la cuenta</span>
                        <div className="informacion-cuenta-blocks">
                            <div className="informacion-block">
                                <h4 className="informacion-block-title">Información del contacto</h4>
                                <ul className="informacion-block-about">
                                    <li>{user}</li>
                                    <li>{email}</li>
                                </ul>
                                <span className="informacion-block-tools">
                                    <a href="/">Editar</a>
                                </span>
                            </div>
                            <div className="informacion-block">
                                <h4 className="informacion-block-title">Mis pedidos</h4>
                                {listaPedidos ? 
                                 <ul className="informacion-block-pedidos">
                                    {listaPedidos
                                     .filter(pedido => userId === pedido.clienteId)
                                     .map(pedido => (
                                        <li className="item-pedido">
                                            <div>
                                                <strong>ID del pedido</strong>
                                                <span>{pedido._id}</span>
                                            </div>
                                            <div>
                                                <strong>Fecha y hora</strong>
                                                <span>{moment(pedido.fecha).format('DD/MM/YYYY HH:mm A')}</span>
                                            </div>
                                            <div>
                                                <strong>Estado del pedido</strong>
                                                <span style={{color : pedido.estadoPedido === "P" ? 'green' : 'red'}}>{pedido.estadoPedido === "P" ? 'Pagado' : 'Anulado'}</span>
                                            </div>
                                            <div>
                                                <strong>Total</strong>
                                                <span>S/{pedido.total}.00</span>
                                            </div>
                                        </li>
                                     ))}
                                </ul> : <span className="loading-pedidos">No haz realizado ningún pedido</span>}
                                <span className="informacion-block-tools">
                                    <a href="/cuenta/detalle/mis-pedidos">Ver más</a>
                                </span>
                            </div>
                        </div>
                        <button onClick={logoutUser} className="informacion-cuenta-logout-button"><BiLogOut /> Logout</button>
                    </div>
                    </>
            )}
            </section>
    )
}

export default MiPerfilPage;