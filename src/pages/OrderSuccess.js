import "../styles/OrderSuccess.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const OrderSuccess = () => {

    const navigate = useNavigate();
    const [time, setTime] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
          if (time > 0) {
            setTime(time - 1);
          } else {
            clearInterval(timer);
            navigate('/mi-bolsa');
          }
        }, 1000);
    
        return () => {
          clearInterval(timer);
        };
      }, [time, navigate]);

    return (
        <section className="succesfull">
            <div>
              <AiOutlineCheckCircle className="icon-success" />
              <span>Compra exitosa</span>
              <p>Redireccionando en {time} segundos...</p>
            </div>
        </section>
    )
}

export default OrderSuccess;