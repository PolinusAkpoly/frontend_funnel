/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/04/2024 11:22:30
*/
import React, { FC, useEffect, useState } from 'react';
import './UpdateCarouselModal.css';
import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { getItem, removeItemByIdFromLocalStorage, updateItemByIdInLocalStorage } from '../../helpers/localsorage.service';
import { CarouselImage } from '../../models/Carousel';
import ChangeImageCarouselModal from '../ChangeImageCarouselModal/ChangeImageCarouselModal';



interface UpdateCarouselModalProps {
  updateCarouselModal: boolean;
  onClose: () => void;
}


const UpdateCarouselModal: FC<UpdateCarouselModalProps> = ({ updateCarouselModal, onClose }) => {
  const [carousels, setCarousels] = useState<CarouselImage[]>([]);
  
  const [show, setShow] = useState(false);
  const [carouselId, setCarouselId] = useState<string>('');

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
    const carouselsdata: CarouselImage[] | null = getItem('carouselsData')
    if (carouselsdata) {
      setCarousels(carouselsdata)
    }
    

    }
    runLocalData()
  },[carousels, carouselId])


  const openChangeImageCarouselModal = (_id: string)=>{
    setShow(true)
    setCarouselId(_id)


  }              
  const closeChangeImageCarouselModal = ()=>{
    setShow(false)

  }
  const updateDataStorage = (imageUrl: string)=>{
    const newCarousel: CarouselImage = {
      _id: carouselId,
      imageUrl: imageUrl
    }

    console.log(imageUrl);

    updateItemByIdInLocalStorage(carouselId, newCarousel);
    
    setShow(false)


  }



  return ( 
    <Modal show={updateCarouselModal} aria-labelledby="contained-modal-title-vcenter" className='scrollable'>

    <ChangeImageCarouselModal
    show={show}
    closeChangeImageCarouselModal={closeChangeImageCarouselModal}
    updateDataStorage={updateDataStorage}
     />

      <Modal.Header  >
        <Modal.Title id="contained-modal-title-vcenter">
          Update Carousel images
        </Modal.Title>
        <div onClick={onClose} className='cursor-pointer'>×</div>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>

          {
            carousels ?

              carousels.map((carousel: CarouselImage, index: number) => {
                return <>
                  <Row >
                    <div key={index} className='d-flex justify-content-between'>
                      <div className="col-xs-6" >
                        <div className="">
                          <img src={carousel.imageUrl} width={150} height={50} alt="" />

                        </div>
                      </div>
                      <div className=" d-flex  gap-2">
                        <button onClick={()=>openChangeImageCarouselModal(carousel._id)} className='btn btn-secondary'>Update</button>
                        <button onClick={() => removeItemByIdFromLocalStorage(carousel._id)} className='btn btn-danger'>Delete</button>
                      </div>
                    </div>
                  </Row>
                  <hr />
                </>
              })


              :
              null
          }




        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} className='cursor-pointer bg-black border-0'>Close</Button>
        {/* <Button onClick={onClose} className='cursor-pointer'>Save</Button> */}
      </Modal.Footer>
    </Modal>
    
  );
}

export default UpdateCarouselModal;