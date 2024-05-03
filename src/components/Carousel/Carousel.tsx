/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 23/04/2024 11:52:04
*/
import React, { FC, useEffect, useState } from 'react';
import './Carousel.css';
import { CarouselImage } from '../../models/Carousel';




interface CarouselProps {
  content: CarouselImage[] | null
}


const Carousel: FC<CarouselProps> = ({ content }) => {
  const [carousels, setCarousels] = useState<CarouselImage[] | null>(null);
  

console.log(carousels);



 

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      if (typeof content === 'string') {
        try {
          var parsedContent = JSON.parse(content);
          // console.log('parsedContent', parsedContent);
          setCarousels(parsedContent);
        } catch (error) {
          console.error("Erreur lors de l'analyse du contenu JSON :", error);
        }
      } else if (!Array.isArray(content)&&content) {
        setCarousels([JSON.parse(content)]);
      } else {
        setCarousels(content);
      }

     

    }
    runLocalData()
  }, [content])

 


  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        {
          carousels ?
            carousels.map((carousel: CarouselImage, index: number) => {
              return <div key={index} className="carousel-item active ">
                <img src={carousel.imageUrl} className="d-block w-100 " height={400} alt="..." />
              </div>
            })

            :
            null

        }

      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;