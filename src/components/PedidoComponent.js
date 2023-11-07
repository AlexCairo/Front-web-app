import { useState, useEffect } from "react";
import moment from 'moment'
import { MdKeyboardArrowDown } from "react-icons/md";

const PedidoComponent = ({prod}) =>{
    
    const [ openBlockPedido, setOpenBlockPedido ] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const showDetail = () => setOpenBlockPedido(!openBlockPedido);
    
    useEffect(() => {
     
      const handleResize = () => {
        setWindowWidth(window.innerWidth); 
      };
  
      window.addEventListener('resize', handleResize);

      if (windowWidth >= 823) {
        setOpenBlockPedido(true)
      }   

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [windowWidth]); 

    return(    
        <div className="block-pedido" key={prod._id}>
            <p className="block-pedido-id" style={{background: prod.estadoPedido === 'P' ? '#009847' : '#ff0000'}}><span>{prod._id}</span><MdKeyboardArrowDown className="block-pedido-show-details" style={{ transform: openBlockPedido ? "rotate(0deg)" : "rotate(-180deg)" }} onClick={showDetail}/></p>
                {openBlockPedido && (
                    <ul className="block-pedido-list">
                        <li>
                            <strong>Estado :</strong>
                            {prod.estadoPedido === 'P' ? 'Pagado' : 'Anulado'}
                        </li>
                        <li>
                            <strong>Fecha y hora :</strong>
                            {moment(prod.fecha).format("DD/MM/YYYY HH:mm A")}
                        </li>
                        <li>
                          <strong>Total: </strong>
                          {prod.total} PEN
                        </li>
                        <li>
                          <strong>Detalle :</strong>
                          <table>
                            <thead>
                              <tr>
                                <th>Producto</th>
                                <th>P.U.</th>
                                <th>Cantidad</th>
                              </tr>
                            </thead>
                            <tbody>
                              {prod.detalle.map((detalle,index) => (
                                <tr key={index}>
                                  <td>{detalle.nombreProducto}</td>
                                  <td>{detalle.precioProducto} PEN</td>
                                  <td>{detalle.cantidad}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </li>
                    </ul>
                )}
        </div>
    )
}

export default PedidoComponent;