import Carousel from "../components/Carrusel";
import "../styles/PrincipalPage.css";
import CarruselProductos from "../components/CarruselProductos";
import { obtenerProductos } from "../services/Productos.service";
import { useState,useEffect } from "react";
import Loader from "../components/Loader";

const categorias = ["videojuego", "accesorio","consola"];

const PrincipalPage = () => {
  const [productosCarrusel, setProductosCarrusel] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductos = async (categoria) => {
    const res = await obtenerProductos(categoria, "all");
    return res.data.slice(-6);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      const productosPromises = categorias.map(async (categoria) => {
        const productos = await getProductos(categoria);
        return { categoria, productos };
      });

      const productosResults = await Promise.all(productosPromises);
      const productosCarrusel = productosResults.reduce(
        (acc, { categoria, productos }) => {
          acc[categoria] = productos;
          return acc;
        },
        {}
      );

      setProductosCarrusel(productosCarrusel);
      setLoading(false);
    };

    fetchProductos();
  }, []);

  return (
        <>
          <section className="carrusel-principal">
            <Carousel />
          </section>
          <section className="categorias">          
          {loading ? (
              <Loader />
            ) : (
              categorias.map((categoria, index) => (
                <div key={index}>
                  <div className="categoria-title">
                    {categoria === "videojuego" ? <h3>Últimos lanzamientos</h3> : <h3>{categoria}s</h3>}
                  </div>
                  <CarruselProductos productosCarrusel={productosCarrusel[categoria]} />
                </div>
              ))
            )}
          </section>
        </>
      )}

export default PrincipalPage;