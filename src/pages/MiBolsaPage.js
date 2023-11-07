import { MdKeyboardArrowDown } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"
import "../styles/MiBolsa.css"
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react"
import { carritoContext } from "../context/CarritoContext";
import { PiHandbagDuotone } from "react-icons/pi"
import { IMG_URL } from "../helpers/config";
import { guardarPedido } from "../services/Pedido.service";

const ciudades = [
    {
        ciudad : "Amazonas",
        envio : "40"
    },
    {
        ciudad: "Áncash",
        envio: "50"
    },
    {
        ciudad: "Apurímac",
        envio: "60"
    },
    {
        ciudad: "Arequipa",
        envio: "40"
    },
    {
        ciudad: "Ayacucho",
        envio: "60"
    },
    {
        ciudad: "Cajamarca",
        envio: "70"
    },
    {
        ciudad: "Callao",
        envio: "30"
    },
    {
        ciudad: "Cusco",
        envio: "50"
    },
    {
        ciudad: "Huancavelica",
        envio: "70"
    },
    {
        ciudad: "Huánuco",
        envio: "60"
    },
    {
        ciudad: "Ica",
        envio: "30"
    },
    {
        ciudad: "Junín",
        envio: "50"
    },
    {
        ciudad: "La Libertad",
        envio: "40"
    },
    {
        ciudad: "Lambayeque",
        envio: "50"
    },
    {
        ciudad: "Lima",
        envio: "30"
    },
    {
        ciudad: "Loreto",
        envio: "80"
    },
    {
        ciudad: "Madre de Dios",
        envio: "90"
    },
    {
        ciudad: "Moquegua",
        envio: "60"
    },
    {
        ciudad: "Pasco",
        envio: "70"
    },
    {
        ciudad: "Piura",
        envio: "60"
    },
    {
        ciudad: "Puno",
        envio: "70"
    },
    {
        ciudad: "San Martín",
        envio: "80"
    },
    {
        ciudad: "Tacna",
        envio: "60"
    },
    {
        ciudad: "Tumbes",
        envio: "50"
    },
    {
        ciudad: "Ucayali",
        envio: "80"
    }    
]


const MicarritoPage = () => {

    const { userId } = useContext(UserContext);
    const { lista, quitar } = useContext(carritoContext);
    const [ total, setTotal ] = useState(0);
    const [ subTotal, setSubTotal ] = useState(0);
    const [ precioEnvio, setPrecioEnvio ] = useState(0);
    const [ openBoxEnvios, setOpenBoxEnvios ] = useState(true);
    const [ isChecked, setIsChecked ] = useState(false);
    const [ selectedCiudad, setSelectedCiudad ] = useState('');
    const navigate = useNavigate();

    const toggle = () => setOpenBoxEnvios(!openBoxEnvios);
    const handleRadioClick = () => setIsChecked(!isChecked);

    const handleRemove = (producto) => {
        quitar(producto);
    }

    const handleBack = () => {
        navigate('/');
    }

    const handlePayment = async() => {
        const venta = {
            clienteId: userId,
            total,
            detalle: lista.map(item => {
                return{
                    nombreProducto: item.nombre,
                    precioProducto: item.precio,
                    cantidad: item.cantidad
                }
            })
        }
        const response = await guardarPedido(venta);
        window.location.href = response.data.links[1].href;
    }

    const handleChange = (e) => {
        setSelectedCiudad(e.target.value);
        if(e.target.value){
            const precioCiudad = parseInt(e.target.value);
            setPrecioEnvio(precioCiudad);
        }else{
            setPrecioEnvio(0);
        }
    };

    useEffect(() => {

        const initValue = 0;
        const nSubTotal = lista.reduce((previousValue, currentObj) => {
            return previousValue + (currentObj.precio*currentObj.cantidad);
        },initValue);
        setSubTotal(nSubTotal);
        if(isChecked){
            setTotal(subTotal);
        } else {
            setTotal(subTotal + precioEnvio);
        }
    },[lista,precioEnvio,subTotal,isChecked])


    return (
        <>
            <h1 className="carrito-title">Mi Bolsa</h1>
            <section className="carrito-info">
                {lista.length <= 0 ? <div className="carrito-sinProductos"><PiHandbagDuotone className="icon-sinProductos" />No tienes productos añadidos <button onClick={handleBack} className="btn-seguirComprando">Seguir comprando</button></div>
                 : <>
                 <div className="carrito-productos">
                    {lista.map((elem => (
                        <div className="carrito-productos-item" key={elem._id}>                        
                            <div className="carrito-productos-item-container-img">
                                <img src={`${IMG_URL}${elem.imagen}`} alt={elem.nombre} />                               
                            </div>
                            <p>
                                <span className="nombre-producto">{elem.nombre}</span>
                                <strong>{`S/${elem.precio}`}</strong>
                                <span><strong>Cantidad : </strong>{elem.cantidad}</span>
                            </p>
                            <div className="carrito-productos-item-group-button">
                                {/* <button className="button-edit"><MdModeEditOutline/></button> */}
                                <button onClick={() => handleRemove(elem._id)} className="button-remove"><AiOutlineClose/></button>
                            </div>
                        </div>
                    )))}
                 </div>
                    <div className="carrito-info-resumen">
                        <h4>RESUMEN</h4>
                        <div className="carrito-info-resumen-table">
                            <div className="carrito-info-estimacion-impuestos">Estimación de envío e impuestos <button className="carrito-info-more" onClick={toggle}><MdKeyboardArrowDown style={{transform : openBoxEnvios && "rotate(-180deg)"}}/></button></div>
                            {openBoxEnvios && 
                                <div className="sub-info-estimacion-impuestos">
                                    <div className="info-pais">
                                        <span>País</span>
                                        <input type="text" disabled = {true} placeholder="Perú"/>
                                    </div>
                                    <div className="info-estadoCiudad">
                                        <label htmlFor="ciudadSelect">Estado/Ciudad</label>
                                        <select
                                            disabled={isChecked}
                                            id="ciudadSelect"
                                            value={selectedCiudad}
                                            onChange={handleChange}
                                        >
                                            <option value="">Por favor seleccione región, estado o provincia</option>
                                            {ciudades.map((ciudad, index) => (
                                            <option key={index} value={ciudad.envio}>
                                                {ciudad.ciudad}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="info-recojo-en-tienda">
                                        <input type="radio" checked={isChecked} onClick={handleRadioClick} id="recoge-en-tienda"/>
                                        <label htmlFor="recoge-en-tienda">Recojo en tienda</label>
                                    </div>                                
                                </div>}
                                <div className="carrito-info-table">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>S/{subTotal}.00</td>
                                        </tr>
                                        <tr>
                                            <th style={{padding : ".5rem 0"}}>Envío</th>
                                            <td style={{padding : ".5rem 0"}}>S/{isChecked && selectedCiudad ? "00" : selectedCiudad}.00</td>
                                        </tr>
                                        <tr>
                                            <th className="table-totalPedidotext"><strong>Total del pedido</strong></th>
                                            <td className="table-totalPrecio"><strong>S/{total}.00</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button onClick={handlePayment} disabled={!userId ? true : false} className={`button-realizarPedido ${!userId ? "button-disabled" : ""}`}>{userId ? "Realizar pedido" : "Inicia sesión para comprar"}</button>
                    </div></>}
            </section>
        </>
    )
}

export default MicarritoPage;