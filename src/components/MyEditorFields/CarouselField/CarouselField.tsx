import React, { useEffect, useState } from 'react';
import './CarouselField.css'
import { BlockTemplate } from '../../../models/BlockTemplate';
import Carousel from '../../Carousel/Carousel';
import FileDropModal from '../../FileDropModal/FileDropModal';
import { fileToDataURL } from '../../../helpers/utiles';
import { getItem, setItem } from '../../../helpers/localsorage.service';
import { CarouselImage } from '../../../models/Carousel';
import { generateId } from '../../../helpers/utils';
import UpdateCarouselModal from '../../UpdateCarouselModal/UpdateCarouselModal';

interface CarouselFieldProps {
    template: BlockTemplate
    handleSetting: (setting: any) => void
}

const CarouselField: React.FC<CarouselFieldProps> = ({ template, handleSetting }) => {
    const [mouseLeave, setMouseLeave] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [updateCarouselModal, setUpdateCarouselModal] = useState<boolean>(false);
    const newCarousel: CarouselImage[] | null= getItem('carouselsData')
    // const [carousel, setCarousel] = useState<CarouselImage[]>([]);
    // setItem('carouselsData', carousel);
    // console.log(carousel);
    

    const handleSetOption = (option: string) => {
        if (option === 'gear') {
            handleSetting({ action: 'SETTING' });
        } else if (option === 'trash') {
            handleSetting({ action: 'DELETE' });
        } else if (option === 'copy') {
            handleSetting({ action: 'DUPLICATE' });
        }
        //  else if (option === 'save') {
        //   handleSave(editorState); // Appel de la fonction pour sauvegarder
        // }
    }

    const openModal = () => {
        setShowModal(true);
      };
      const closeModal = () => {
        setShowModal(false);
      }
      const openUpdateCarouselModal = () => {
        setUpdateCarouselModal(true);
      };
      const closeUpdateCarouselModal = () => {
        setUpdateCarouselModal(false);
      }

    const { content } = template
    // console.log(template);

    useEffect(() => {
      if (!newCarousel?.length) {  
        if (typeof content === 'string') {
            try {
                var parsedContent = JSON.parse(content);
                // console.log('parsedContent', parsedContent);
                // setCarousel(parsedContent);
                setItem('carouselsData', parsedContent);
            } catch (error) {
                console.error("Erreur lors de l'analyse du contenu JSON :", error);
            }
        } else if (!Array.isArray(content)) {
            // setCarousel([JSON.parse(content)]);
            setItem('carouselsData', [JSON.parse(content)]);
        } else {
            setItem('carouselsData', content);
            // setCarousel(content);

        }
      }
    },[]);

    const handleFilesDrop = async (files: FileList) => {
      let carouselsData: CarouselImage[] = [];
    
      for (const file of Array.from(files)) {
        const imageUrl = await fileToDataURL(file);
        const oneCarousel = {
          _id: generateId(),
          imageUrl: imageUrl
        };
    
        carouselsData.push(oneCarousel);
      }
    
      if (newCarousel) {
        carouselsData = [...newCarousel, ...carouselsData];
      }
    
      setItem('carouselsData', carouselsData);
      setShowModal(false);
    };
    
      

      const getCarousel = () =>{
        // let data: CarouselImage[] = carousel
        //  if (newCarousel) {
        //  data = [...data, ...newCarousel]

    //  }
        // console.log(data);
        // setItem('carouselsData', data)

        return <Carousel content={newCarousel}/>
        
      }

    return (
        <div>  

       <FileDropModal
        showModal={showModal}
        onClose={closeModal}
        onFilesDrop={handleFilesDrop}
      />

      <UpdateCarouselModal
        updateCarouselModal={updateCarouselModal}
        onClose={closeUpdateCarouselModal}
    
      />


        <div
            onMouseLeave={() => setMouseLeave(true)}
            onMouseEnter={() => setMouseLeave(false)}
            className='CarouselField position-relative'
        >
            <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
                <div>Carousel</div>
                <div>
                    {/* Icônes pour les actions d'édition */}
                    {['gear', 'copy', 'save', 'trash'].map((icon) => (
                        <span key={icon} onMouseDown={() => handleSetOption(icon)} className='header-button'>
                            <i className={`fa-solid fa-${icon}`} />
                        </span>
                    ))}
                </div>
                {/* <div ><strong className='mr-2 btn cursor-pointer'>SRC</strong> </div> */}
                <button onClick={openModal} className="border-0"><strong>SRC</strong></button>
                <button onClick={openUpdateCarouselModal} className="border-0"><strong>IMG</strong></button>
            </div>

            {/* <a  style={ styles} {...template?.attributes}>
                { 
                buttonIcon &&  
                <span dangerouslySetInnerHTML={{__html: buttonIcon}} 
                /> 
                }
               
                <span dangerouslySetInnerHTML={{__html:  content}} />
            </a> */}


           {getCarousel()}




        </div>
        </div>
    );
};

export default CarouselField;
