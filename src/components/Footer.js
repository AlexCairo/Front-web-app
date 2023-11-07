import "../styles/Footer.css";
import { FooterLink } from "./LinkandNavLink";
import { BsGithub,BsLinkedin,BsTelephoneFill,BsEnvelopeAtFill } from "react-icons/bs";


const contactos = [
    {
        name : "LinkedIn",
        icon : <BsLinkedin />,
        path : "https://www.linkedin.com/in/alexcairo"
    },
    {
        name : "GitHub",
        icon : <BsGithub />,
        path : "https://github.com/AlexCairo"
    },
    {
        name : "alexcairof@gmail.com",
        icon : <BsEnvelopeAtFill />,
        path : "mailto:alexcairof@gmail.com"
    },
    {
        name : "957034285",
        icon : <BsTelephoneFill />,
        path : "tel:957034285"
    }
]


const Footer = () => {
    return(
        <footer className="footer">
            <span className="footer-title">Contactos</span>
            <div className="container-contactos">
                <ul>
                    {contactos.map( (item,index) => (
                        <li key={index}>
                            <FooterLink target="_blank" to={item.path}><i className="contacto-icon">{item.icon}</i> {item.name}</FooterLink>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}

export default Footer;