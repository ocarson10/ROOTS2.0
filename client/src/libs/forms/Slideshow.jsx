import React, { useState } from 'react';
import '../style/Slideshow.css';

const Slideshow = ({ photos }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle the next image in the slideshow
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle the previous image in the slideshow
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <h1>Image Gallery</h1>
      <div className="slideshow-container">
        <div className="slideshow-image">
          <img src={`${photos[currentImageIndex]}`} alt={`Image ${currentImageIndex + 1}`} />
        </div>
        <button className="prev" onClick={prevImage}>
          &#10094;
        </button>
        <button className="next" onClick={nextImage}>
          &#10095;
        </button>
      </div>
    </>
  );
};

export default Slideshow;