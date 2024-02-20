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