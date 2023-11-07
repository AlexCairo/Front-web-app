import React, { useEffect, useState } from "react";

const carritoContext = React.createContext();
const { Provider } = carritoContext;

function CarritoProvider({children}){

  const [lista, setLista] = useState([]);

  function agregar(producto, cantidad) {
    const productoIndex = lista.findIndex(item => item.nombre === producto.nombre);
  
    if (productoIndex !== -1) {
      const nLista = lista.slice();
      nLista[productoIndex].cantidad += cantidad;
      setLista(nLista);
    } else {
      const nProducto = { ...producto, cantidad };
      setLista([...lista, nProducto]);
    }
  }  

  function quitar(id) {
    const nLista = lista.filter((elem) => elem._id !== id);
    setLista(nLista);
  }

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setLista(JSON.parse(carritoGuardado));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(lista));
  },[lista]);

    return(
        <Provider value={{lista, agregar, quitar}}>
            {children}
        </Provider>
    )
}

export { CarritoProvider, carritoContext };