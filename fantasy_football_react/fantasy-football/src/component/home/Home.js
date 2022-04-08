import React from "react";
import backGround from "../../images/sequan.webp"
export const Home =()=>{
    return (
       
        <div className="home-page d-flex align-items-center">
           <img src={backGround} alt='Sequan' style={{width: '150%' }} className="img-fluid" />
        </div>
    )
}