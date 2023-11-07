import { useState,useEffect, useContext } from "react";
import { detalleProducto } from "../services/Productos.service";
import "../styles/DetallePage.css";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { IMG_URL } from "../helpers/config";
import { carritoContext } from "../context/CarritoContext";

const DetallePage = () => {

    const { agregar } = useContext(carritoContext)
    const { idProducto } = useParams();
    const [ producto, setProducto ] = useState();
    const [ loader,setLoader ] = useState(true);
    const [ cantidadProducto,setCantidadProducto ] = useState(1);

    const obtenerProducto = async(id) => {
        const res = await detalleProducto(id);
        setProducto(res.data);
        setLoader(false);
    }

    const disminuirCantidadProducto = () => {
        if(cantidadProducto > 1){
            setCantidadProducto(cantidadProducto - 1);
        }
    };

    const aumentarCantidadProducto = () => {
        if(cantidadProducto < producto.stock){
            setCantidadProducto(cantidadProducto + 1);
        }
    };

    const handleAgregarCarrito = (item, cant) => {
        agregar(item,cant);
    }

    useEffect(() => {
        obtenerProducto(idProducto)
    },[idProducto])

    return (
        <section className="detalle-producto">
            {loader ? <div className="container-loader-producto"><Loader/></div> : 
            <div className="detalle-producto-container">
                 <img src={`${IMG_URL}/${producto.imagen}`} alt={producto.nombre}></img>
                <div className="detalle-producto-descripcion">
                    <h2>{producto.nombre}</h2>
                    <span className="detalle-producto-descripcion-precio">S/{producto.precio}.00</span>
                    <div className="producto-caracteristicas">
                        {producto.plataforma && (
                        <div className="caracteristica">
                            <strong>Plataforma</strong><span>{producto.plataforma}</span>
                        </div>)}
                        {producto.caracteristicas[0].genero && (
                        <div className="caracteristica">
                            <strong>Género</strong><span>{producto.caracteristicas[0].genero}</span>
                        </div>)}
                        {producto.caracteristicas[0].garantia && (
                        <div className="caracteristica">
                            <strong>Garantía</strong><span>{producto.caracteristicas[0].garantia}</span>
                        </div>)}
                        {producto.caracteristicas[0].edicion && (
                        <div className="caracteristica">
                            <strong>Edición</strong><span>{producto.caracteristicas[0].edicion}</span>
                        </div>)}
                        {producto.caracteristicas[0].restriccionEdad && (
                        <div className="caracteristica">
                            <strong>Edad</strong><span>Mayores de {producto.caracteristicas[0].restriccionEdad} años</span>
                        </div>)}
                        {producto.caracteristicas[0].color && (
                        <div className="caracteristica">
                            <strong>Color</strong><span>{producto.caracteristicas[0].color}</span>
                        </div>)}
                        {producto.caracteristicas[0].conexion && (
                        <div className="caracteristica">
                            <strong>Conexión</strong><span>{producto.caracteristicas[0].conexion}</span>
                        </div>)}
                        {producto.caracteristicas[0].desarrollador && (
                        <div className="caracteristica">
                            <strong>Desarrollador</strong><span>{producto.caracteristicas[0].desarrollador}</span>
                        </div>)}
                        {producto.caracteristicas[0].duracionBateria && (
                        <div className="caracteristica">
                            <strong>Batería</strong><span>{producto.caracteristicas[0].duracionBateria}</span>
                        </div>)}
                        {producto.caracteristicas[0].almacenamiento && (
                        <div className="caracteristica">
                            <strong>Almacenamiento</strong><span>{producto.caracteristicas[0].almacenamiento}</span>
                        </div>)}
                        {producto.caracteristicas[0].jugadores && (
                        <div className="caracteristica">
                            <strong>Jugadores</strong><span>{producto.caracteristicas[0].jugadores}</span>
                        </div>)}
                    </div>
                    <div className="detalle-producto-agregarCarrito">
                            <div className="detalle-producto-group-button">
                                <button className="button-disminuir" onClick={disminuirCantidadProducto} disabled={cantidadProducto <= 1}>-</button>
                                <span>{cantidadProducto}</span>
                                <button className="button-aumentar" onClick={aumentarCantidadProducto} disabled={cantidadProducto >= producto.stock}>+</button>
                            </div>
                            <button onClick={()=>handleAgregarCarrito(producto,cantidadProducto)} className="button-agregarCarrito">Agregar al carrito</button>
                    </div>
                </div>
                <div className="detalle-producto-resumen">
                    <div className="detalle-producto-title">
                        <h3>Descripción</h3>
                    </div>
                    <p>{producto.descripcion}</p>
                </div>
            </div>
            }        
        </section>
    )
}

export default DetallePage;