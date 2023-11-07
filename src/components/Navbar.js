import { BsWhatsapp } from "react-icons/bs";
import { BiUser, BiShoppingBag, BiLogOutCircle } from "react-icons/bi";
import { AiOutlineUserAdd, AiOutlineCloseSquare } from "react-icons/ai";
import "../styles/Navbar.css"
import { HiMiniBars3BottomLeft } from "react-icons/hi2"
import { useContext, useState, useEffect } from "react";
import { SiPlaystation5, SiPlaystation4, SiPlaystation3,SiNintendoswitch } from "react-icons/si"
import MenuWithSubmenu from "../components/SubMenu"; 
import { NavbarLink } from "../components/LinkandNavLink";
import { GoTriangleDown } from "react-icons/go";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { carritoContext } from "../context/CarritoContext";

const Navbar = () => {

    const navigate = useNavigate()
    const { lista } = useContext(carritoContext);
    const { user, logout } = useContext(UserContext);
    const [ showSubMenu, setShowSubMenu ] = useState(null);
    const [openMenu, SetOpenMenu] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const toggle = () => SetOpenMenu(!openMenu);

    const handleMenuItemClick = (index) => {
        if (selectedItem === index) {
            setSelectedItem(null);
        } else {
            setSelectedItem(index);
        }
    };
    
    const toggleSubMenu = (index) => {
        setShowSubMenu(showSubMenu === index ? null : index);
    };
    
    const closeMenuOnSmallScreen = () => {
        if (window.innerWidth <= 925) {
          SetOpenMenu(false);
        }
    }
    const handleLogout = () => {
        logout();
        navigate("/");
    } 

    const menuItems = [
        {
            name : "VIDEOJUEGOS",
            path : "/productos/videojuego/all",
            background : "#ffc9c9",
            subMenuItems : [
                {
                    icon : <SiPlaystation5/>,
                    name : "Playstation 5",
                    path : "/productos/videojuego/playstation-5"
                },
                {
                    icon : <SiPlaystation4/>,
                    name : "Playstation 4",
                    path : "/productos/videojuego/playstation-4"
                },
                {
                    icon : <SiPlaystation3/>,
                    name : "Playstation 3",
                    path : "/productos/videojuego/playstation-3"
                },
                {
                    icon : <SiNintendoswitch/>,
                    name : "Nintendo Switch",
                    path : "/productos/videojuego/nintendo-Switch"
                }
            ]
        },
        {
            name : "CONSOLAS",
            path : "/productos/consola/all",
            background : "#d2ffc9",
            subMenuItems : [
                {
                    icon : <SiPlaystation5/>,
                    name : "Playstation 5",
                    path : "/productos/consola/playstation-5",
                },
                {
                    icon : <SiPlaystation4/>,
                    name : "Playstation 4",
                    path : "/productos/consola/playstation-4"
                },
                {
                    icon : <SiPlaystation3/>,
                    name : "Playstation 3",
                    path : "/productos/consola/playstation-3"
                },
                {
                    icon : <SiNintendoswitch/>,
                    name : "Nintendo Switch",
                    path : "/productos/consola/nintendo-Switch"
                },
            ]
        },
        {
            name : "ACCESORIOS",
            path : "/productos/accesorio/all",
            background : "#ffcffe",
            subMenuItems : [
                {
                    icon : <SiPlaystation5/>,
                    name : "Playstation 5",
                    path : "/productos/accesorio/playstation-5",
                },
                {
                    icon : <SiPlaystation4/>,
                    name : "Playstation 4",
                    path : "/productos/accesorio/playstation-4"
                },
                {
                    icon : <SiPlaystation3/>,
                    name : "Playstation 3",
                    path : "/productos/accesorio/playstation-3"
                },
                {
                    icon : <SiNintendoswitch/>,
                    name : "Nintendo Switch",
                    path : "/productos/accesorio/nintendo-Switch"
                }
            ]
        },
    ]

    useEffect(() => {
        window.addEventListener('resize', closeMenuOnSmallScreen);

        return () => {
          window.removeEventListener('resize', closeMenuOnSmallScreen);
        };
      }, []);

    return (
        <header>
            <section className = "pre-navbar">
                <div className = "pre-navbar-logo">
                    <div onClick={toggle}>
                        <HiMiniBars3BottomLeft />
                    </div>
                    <NavbarLink to={"/"}>CYBER</NavbarLink>
                </div>
                <nav className="navbar-links">
                    <ul className="navbar-list-links">
                        {menuItems.map((menuItem, index) => (
                            <li key={index}>
                                <a className="navbar-list-link-item" href={menuItem.path}>
                                    {menuItem.name}
                                </a>
                                <GoTriangleDown className={`gotriangledown ${selectedItem === index ? 'selected' : ''}`} style={{cursor : "pointer"}} 
                                    onClick={() => {
                                        toggleSubMenu(index);
                                        handleMenuItemClick(index);
                                      }} />
                                {showSubMenu === index && (
                                    <ul className={`nav-bar-submenu`} >
                                        {menuItem.subMenuItems.map((subMenuItem, subIndex) => (
                                            <li className="nav-bar-submenu-item" key={subIndex}>
                                                <a href={subMenuItem.path} className="nav-bar-submenu-link-item">
                                                    {subMenuItem.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <ul>
                    <li>
                        <a className="pre-navbar-link" href="/">
                            <BsWhatsapp className = "pre-navbar-icon" /> <br/>
                            <strong>Escríbenos</strong>
                        </a>
                    </li>
                    <li>
                        <a className="pre-navbar-link" href={`/cuenta/${user ? "detalle" : "login"}`}>
                            <BiUser className = "pre-navbar-icon" /> <br/>
                            <strong>Mi Perfil</strong>
                        </a>
                    </li>
                    <li>
                        <a className="pre-navbar-link" href="/mi-bolsa">
                            <BiShoppingBag className = "pre-navbar-icon" /> <br/>
                            <strong>Mi Bolsa</strong>
                            <span>{lista.length}</span>
                        </a>
                    </li>
                </ul>
            </section>
            <div className="div" style={{ left: openMenu ? "0%" : "-100%"}}>
                    <div className="div-close-menu">
                        <AiOutlineCloseSquare className="icon-close-menu" onClick={toggle}/>
                    </div>
                    <ul className="div-list">
                        {menuItems.map((item,index) => (
                            <MenuWithSubmenu
                                key={index}
                                menuItems = {item}
                            /> 
                        ))}                  
                    </ul>
                    {user ? 
                    <>
                        <li className="div-menu-user">
                            <span><BiUser className="div-icon-user"/>{user}</span>
                        </li>
                        <button className="button-logout-user" onClick={handleLogout}>
                            <BiLogOutCircle className="icon-logout-user"/>Logout
                        </button>
                    </> : 
                    <>
                        <li className="div-menu-user">
                            <a href="/cuenta/login"><BiUser className="div-icon-user"/>iniciar sesión</a>
                        </li>
                        <li className="div-menu-user">
                            <a href="/cuenta/register"><AiOutlineUserAdd className="div-icon-user"/>crear cuenta</a>
                        </li>
                    </>
                    }
            </div>
        </header>
    )
}

export default Navbar;