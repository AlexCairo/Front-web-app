import "../styles/OrderCanceled.css";
import { GiCancel } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const OrderCanceled = () => {

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
        <section className="canceled">
            <div>
              <GiCancel className="icon-cancel" />
              <span>Compra cancelada</span>
              <p>Redireccionando en {time} segundos...</p>
            </div>
        </section>
    )
}

export default OrderCanceled;