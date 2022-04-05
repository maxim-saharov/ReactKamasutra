//
import React from "react";
import PreloaderPhoto from '../../../assets/images/loading-slow-net.gif';

let Preloader = () => {

   return (
      <div style={{backgroundColor: '#7fc6c6'}}>
         <img src={PreloaderPhoto} alt={'PreloaderPhoto'} />
      </div>
   )
}

export default Preloader;