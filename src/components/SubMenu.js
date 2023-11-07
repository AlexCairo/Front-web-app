import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";

const MenuWithSubmenu = ({ menuItems }) => {
    const [openSubMenu, setOpenSubMenu] = useState(false);

    const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);

    return (
        <>
            <li className="menu-list">
                <div className="menu-list-principalMenu">
                    <a href={menuItems.path}>{menuItems.name}</a>
                    {menuItems.subMenuItems && 
                         <div className="div-more" onClick={toggleSubMenu}>
                            <GoTriangleDown className="div-more-icon" style={{transform : openSubMenu ? "rotate(0deg)" : "rotate(-90deg)"}}/>
                        </div>
                    }
                </div>
                    {menuItems.subMenuItems && openSubMenu && (
                        <ul className="submenu">
                            {menuItems.subMenuItems.map((submenu, index) => (
                                <li key={index}>
                                    <a href={submenu.path}><i className="submenu-icon">{submenu.icon}</i>{submenu.name}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
        </>
    );
};

export default MenuWithSubmenu;