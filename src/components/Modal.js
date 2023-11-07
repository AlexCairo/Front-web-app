import { useState } from "react";
import Modal from "react-modal";

const initValuesLogin = {
    email : "",
    password : "",
}

const LoginModal = ({ isOpen, onRequestClose }) => {

    const [ credencialesLogin, setCredencialesLogin ] = useState(initValuesLogin);
    const [ showError, setShowError ] = useState(false);



    return (

        <Modal
            isOpen = {isOpen}
            onRequestClose = {onRequestClose}
            contentLabel = "Inicia sesión para poder comprar"
        >        
            <h2 className="container-title">Inicio de Sesión</h2> 
                <section className="section-form">
                    
                </section>         
        </Modal>
    )
}

export default LoginModal;