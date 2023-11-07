import React, { useEffect, useState } from 'react';
import '../styles/Carousel.css';

const images = [
    {
      src : '../img/img1Carrusel.webp',
      path : '/'
    },
    {
      src : '../img/img2Carrusel.webp',
      path : '/'
    },
    {
      src : '../img/img3Carrusel.webp',
      path : '/'
    },
]

const Carousel = () => {  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    
    const handleNext = () => {
      const newIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(newIndex);
    };

    const interval = setInterval(() => {
      handleNext();
    }, 5000); 

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);
  return (
        <div className="carousel"> 
          <div className="carousel-image-container">
            {images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={`Imagen ${index}`}
                  className={`carousel-image-item ${index === currentImageIndex ? 'active' : ''}`}
                  style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
                />
            ))}
          </div>
        </div>
    );
}

export default Carousel;