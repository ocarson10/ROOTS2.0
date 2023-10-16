import React from 'react';
import ImageGallery from "react-image-gallery";
import '../style/PhotoGallery.css'
//import { getPhotos } from "../services/api-client/photoService";

export const photoGalleryProps = {
  photos: []
}

const MyGallery = (props) => {
    return (
      <>
        <ImageGallery items={props.photos} />
      </>
    );
  };

export default MyGallery;