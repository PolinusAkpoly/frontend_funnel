/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 02/05/2024 10:19:53
*/
import React, { FC, useEffect, useState } from 'react';
import './Reviews.css';
import { formattedDate, generateId } from '../../helpers/utils';
import { Review } from '../../models/reviews';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/selectors/selectors';


interface ReviewsProps {
  // content: Review[]
}


const Reviews: FC<ReviewsProps> = () => {
  const [comment, setComment] = useState<Review[]>([]);
  const [commentv, setCommentv] = useState<Review[]>([]);
  const user = useSelector(getCurrentUser)
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
  const [isActiveBgColor, setIsActiveBgColor] = useState<boolean>(false);
  const [isActiveBtnComm, setIsActiveBtnComm] = useState<boolean>(false);
  const [afficheComment, setAfficheComment] = useState<boolean>(false);
  // console.log(user);
  // console.log(isActiveBgColor);





  useEffect(() => {
    window.scrollTo(0, 0)
     const runLocalData = async () => {

    //   if (typeof content === 'string') {
    //     try {
    //       var parsedContent = JSON.parse(content);
    //       // console.log('parsedContent', parsedContent);
    //       setComment(parsedContent);

    //     } catch (error) {
    //       console.error("Erreur lors de l'analyse du contenu JSON :", error);
    //     }
    //   } else if (!Array.isArray(content)) {

    //     setComment([JSON.parse(content)]);

    //   } else {

    //     setComment(content);

    //   }

    }
    runLocalData()
  }, [user])

  const handleClick = () => {
    setIsActiveInput(true)
    setIsActiveBtnComm(true)

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsActiveBtnComm(false);
    setIsActiveBgColor(true);
    const { value } = event.target;
  
    const newComment: Review = {
      _id: generateId(),
      fullname: user.fullname,
      profileImageUrl: "http://localhost/assets/images/profil.png",
      comment: value,
      created_at: new Date()
    };
  
    // Utilisation du spread operator pour ajouter le nouveau commentaire à la liste existante
    setCommentv([newComment]);
  
    console.log(newComment);
  }
  



  

const saveComment = ()=>{
  setAfficheComment(true)

  setComment(commentv)

  setIsActiveInput(false)
    setIsActiveBtnComm(false)
    setIsActiveBgColor(false)
}
const initInput = ()=>{
  
  setIsActiveInput(false)
    setIsActiveBtnComm(false)
    setIsActiveBgColor(false)
}

  return (
    <div className="container">

      <div className="row d-flex mt-4">
        <div className="col-sm-1 profileimage mt-2">
          <img src="http://localhost/assets/images/profil.png" className="" alt="Profile Image" />
        </div>
        <div className="col-lg-11 inputComment ml-n4">
          <input type="text" name="comment" onChange={(event) => handleChange(event)} onClick={handleClick}  placeholder="Ajoutez un commentaire…" />
          <hr className={`mt-n1 ${isActiveInput ? 'hrLine' : ''}`} />
          <div className="row">
            <div className="col-lg-7 col-sm-1 col-md-1"></div>
            <div className="col-lg-5 col-sm-11 col-md-11 mb-2">
              <button onClick={initInput} className={` ${isActiveInput ? 'buttonAnnuler mr-3' : 'd-none'}`}>Annuler</button>
              <button className={` ${isActiveBtnComm ? 'buttonComment' : 'd-none'}  `}>Ajoutez un commentaire</button>
              {
                isActiveBgColor && <button onClick={saveComment} className='buttonComment1'>Ajoutez un commentaire</button>
              }
            </div>
          </div>
        </div>
      </div>


      {
        comment.length && afficheComment?
          comment.map((review: Review, index: number) => {
            return <div key={index} className="row mt-5">
              <div className="col-md-8 d-flex">
                <div className="profileimage mt-2">
                  <img src={review.profileImageUrl} className="" alt="Profile Image" />
                </div>
                <div className="ml-3">

                  <div className="">
                    <div className="d-flex">
                      <h5 className="">{user.fullname}</h5>
                      <p className="ml-2"><small className="text-muted">{formattedDate(review.created_at)}<span id="created_at" /></small></p>
                    </div>

                    <p className="">{review.comment}</p>
                    <div className="iconeHand mt-2">
                      <i className="fa-regular fa-thumbs-up mr-5"></i> <i className="fa-regular fa-thumbs-down"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 "></div>
            </div>
          })
          :
          null
      }

      {/* <div className='row'>
        <div className='col-8'></div>
        <div className='col-4 mb-2'>
          <button className='btn btn-secondary mr-3'>Comment</button>
          <button className='btn btn-primary '>Save</button>
        </div>
      </div> */}


    </div>
  );
}

export default Reviews;