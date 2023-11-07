import { useContext, useState } from "react";
import "../styles/FormComponent.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser, registerUser } from "../services/User.service";
import { BiError } from "react-icons/bi";

const initValuesLogin = {
    email : "",
    password : "",
}

const initValuesRegister = {
    nombre : "",
    email : "",
    password : "",
}

const FormComponent = () => {

    const navigate = useNavigate();
    const [ credencialesRegister, setCredencialesRegister ] = useState(initValuesRegister);
    const [ credencialesLogin, setCredencialesLogin ] = useState(initValuesLogin);
    const { loginRegister } = useParams();
    const { login } = useContext(UserContext);
    const [ showError, setShowError ] = useState(false);
    const [ animation, setAnimation ] = useState(false)

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        const nDatos = { ...credencialesLogin, [name]:value };
        setCredencialesLogin(nDatos);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setAnimation(true);
        try {
            const result = await loginUser(credencialesLogin);
            const data = result.data;
            login(data);
            setAnimation(false);
            navigate("/cuenta/detalle");
        } catch (err) {
            setShowError(true);
            setAnimation(false);
        }
    }

    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        const nDatos = { ...credencialesRegister, [name]:value };
        setCredencialesRegister(nDatos);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await registerUser(credencialesRegister);
            navigate("/cuenta/login");
        } catch (err){
            console.log(err);
        }
    }

    return(
        <div className="container-form">
            {loginRegister === "login" ? 
                <>
                    <h1 className="container-title">Inicio de Sesión</h1> 
                    <section className="section-form">
                        <span id="section-form-span">Inicie sesión con su correo electrónico</span>
                        <div className="form">
                            <div className="form-input">
                                <p>Correo electrónico<span className="required-input"> *</span></p>
                                <input required={true} onChange={handleChangeLogin} name="email" type="email" />
                            </div>
                            <div className="form-input">
                                <p>Contraseña<span className="required-input"> *</span></p>
                                <input required={true} onChange={handleChangeLogin} name="password" type="password" />
                            </div>
                            <span style={{display: !showError && "none"}} className="form-error-message">
                                <BiError /> Error al iniciar sesión. Intente nuevamente.
                            </span>
                            <div className="form-buttons">
                                <button className={`${animation ? 'animation-btn' : ''}`} onClick={handleLogin} type="submit">Iniciar Sesión</button>
                                <button><a href="/cuenta/register">Crear Cuenta</a></button>
                            </div>
                            <span className="required-input">* Campos obligatorios</span>
                        </div>
                    </section>
                </>
                                 
            : 
                <>
                    <h1 className="container-title">Registro de Usuario</h1>
                    <section className="section-form">
                        <div className="form">
                            <div className="form-input">
                                <p>Nombres<span className="required-input"> *</span></p>
                                <input required = {true} onChange={handleChangeRegister} name="nombre" type="text" />
                            </div>
                            <div className="form-input">
                                <p>Correo electrónico<span className="required-input"> *</span></p>
                                <input required = {true} onChange={handleChangeRegister} name="email" type="email"/>
                            </div>
                            <span style={{display : !showError && "none"}} className="form-error-message">
                                <BiError /> Este correo ya se encuentra en uso. Ingrese uno diferente.
                            </span>
                            <div className="form-input">
                                <p>Contraseña<span className="required-input"> *</span></p>
                                <input required = {true} onChange={handleChangeRegister} name="password" type="password" />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" onClick={handleRegister}>Crear Cuenta</button>
                            </div>
                            <span className="required-input">* Campos obligatorios</span>
                        </div>
                    </section>  
                </>                
                
            }
        </div>
    )
}

export default FormComponent;