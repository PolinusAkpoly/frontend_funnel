/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 18:49:35
*/
import React, { FC, useEffect, useState } from 'react';
import './Banner.css';
import { getDatas } from '../../api/api-entity';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


interface BannerProps {

}


const Banner: FC<BannerProps> = () => {

  const [sliders, setSliders] = useState<any[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      const data = await getDatas('slide')
      if (data.isSuccess) {
        setSliders(data.results)
      }
    }
    runLocalData()
  }, [])

  return (
    <header className="bg-dark">
      <Carousel>
        {
          sliders.map((slide) => {
            return <Carousel.Item key={slide?._id}>
              <div className="container px-5 pb-5">
                <div className="row gx-5 align-items-center justify-content-center">
                  <div className="col-lg-8 col-xl-7 col-xxl-6">
                    <div className="my-5 text-center text-xl-start">
                      <h1 className="display-5 fw-bolder text-white mb-2">{slide.title}</h1>
                      <p className="lead fw-normal text-white-50 mb-4">{slide.description}</p>
                      <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                        {(slide?.button_link_one && slide?.button_link_one) && <Link className="btn btn-primary btn-lg px-4 me-sm-3" to={slide.button_link_one}>{slide.button_text_one}</Link>}
                        {(slide?.button_link_two && slide?.button_link_two) && <Link className="btn btn-outline-light btn-lg px-4" to={slide.button_link_to}>{slide.button_text_two}</Link>}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                    <img className="img-fluid rounded-3 my-5"
                      src={slide.imageUrl ? slide.imageUrl : "/assets/images/home.png"} alt="..." />
                  </div>
                </div>
              </div>
            </Carousel.Item>
          })
        }

      </Carousel>
    </header>
  );
}

export default Banner;