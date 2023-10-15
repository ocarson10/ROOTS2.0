import React from 'react';
import ImageGallery from "react-image-gallery";
import '../style/PhotoGallery.css'
//import { getPhotos } from "../services/api-client/photoService";

const MyGallery = () => {
    //const images = getPhotos(1);
    const images = [
        {
          original: 'client/src/libs/images/cnr-logo.png',
          thumbnail: 'client/src/libs/images/cnr-logo.png',
          description: 'Image 1',
        },
        {
          original: 'client/src/libs/images/forest-1.png',
          thumbnail: 'client/src/libs/images/forest-1.png',
          description: 'Image 2',
        },
        // Add more images as needed
      ];
    return (
      <div>
        <ImageGallery items={images} />
      </div>
    );
  };

export default MyGallery;