import { useContext, useEffect, useState } from 'react';
import '../styles/CarruselProductos.css';
import { MdOutlineNavigateNext,MdOutlineNavigateBefore } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IMG_URL } from "../helpers/config";
import { useNavigate } from 'react-router-dom';
import { carritoContext } from "../context/CarritoContext";
import { BsSearch } from "react-icons/bs";

const CarruselProductos = ({ productosCarrusel }) => {

    const navigate = useNavigate();
    const { agregar } = useContext(carritoContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesPerSlide, setImagesPerSlide] = useState(2);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const irDetalle = (id) => {
      navigate(`/detalle/${id}`);
    }

    const handleAddProduct = (producto, cantidad) => {
      agregar(producto,cantidad);
    }

    const handlePrevClick = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? productosCarrusel.length - imagesPerSlide : prevIndex - imagesPerSlide
      );
    };
  
    const handleNextClick = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === productosCarrusel.length - imagesPerSlide ? 0 : prevIndex + imagesPerSlide
      );
    };

    useEffect(() => {
     
      const handleResize = () => {
        setWindowWidth(window.innerWidth); 
      };
  
      window.addEventListener('resize', handleResize);

      if (windowWidth >= 585) {
        setImagesPerSlide(3);
      } else if (windowWidth >= 810) {
        setImagesPerSlide(4);
      } else if (windowWidth >= 1400){
        setImagesPerSlide(5);
      } else {
        setImagesPerSlide(2);
      }
  
      setCurrentIndex(0);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [windowWidth]); 

    return (
        <section className="carousel-container">
          <MdOutlineNavigateBefore className="button button-prev" onClick={handlePrevClick} />
          <div className="carousel-productos">
            <div
              className="carousel-productos-inner"
              style={{ transform: `translateX(-${currentIndex * (100 / imagesPerSlide)}%)` }}
            >
              {productosCarrusel.map((producto) => (
                <div key={producto._id} className="carousel-productos-item">
                    <div className='container-img'>
                      <img src={`${IMG_URL}${producto.imagen}`} alt={producto.nombre} />
                      <button onClick={()=>handleAddProduct(producto,1)} className='overlay'>Añadir al carrito</button>
                      <div className='box-detail'>                        
                        <BsSearch onClick={()=>irDetalle(producto._id)} className='overlay-detail' />
                        <span className='action-overlay'>Ver detalle</span>
                      </div>
                    </div>
                  <p>
                      <span>{producto.nombre}</span> <br/>
                      <strong>{`S/${producto.precio}.00`}</strong>
                  </p>
                  <AiOutlineShoppingCart className="icon-add-cart" onClick={()=>handleAddProduct(producto,1)}/>
                </div>
              ))}
            </div>
          </div>
          <MdOutlineNavigateNext className="button button-next" onClick={handleNextClick} />
        </section>
      );
    };

export default CarruselProductos;