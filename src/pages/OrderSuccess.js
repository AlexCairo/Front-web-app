import "../styles/OrderSuccess.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { toast } from "sonner";
import { useContext } from "react";
import { IMG_URL } from "../helpers/config"; 
import { UserContext } from "../context/UserContext";
import { carritoContext } from "../context/CarritoContext";

const OrderSuccess = ({socket}) => {  

  const { lista } = useContext(carritoContext);
  const { user } = useContext(UserContext);

  if (lista.length > 0) {
    lista.forEach(item => {
      socket.emit('purchaseCompleted', {
        nombreProducto: item.nombre,
        imagenProducto: item.imagen,
        nombreComprador: user
      });
    });
  
    socket.on('purchaseCompletedMsg', (msg) => {
      toast(
        <div className="container_mssg">
          <h6>{`${msg.nombreComprador} adquirió un nuevo producto !`}</h6>
          <div className="container_product">
            <img src={`${IMG_URL}${msg.imagenProducto}`} alt={msg.imagenProducto} />
            <span>{`${msg.nombreProducto}`}</span>
          </div>
        </div>
      );
    });
  }  

    return (
        <section className="succesfull">
            <div>
              <AiOutlineCheckCircle className="icon-success" />
              <span>Compra exitosa</span>
              <a href="/mi-bolsa">Volver a mi bolsa</a>
            </div>
        </section>
    )
}

export default OrderSuccess;