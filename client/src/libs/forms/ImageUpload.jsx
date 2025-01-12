import React from 'react';
import ImageUploading from 'react-images-uploading';

function ImageUpload(props) {
	const [images, setImages] = React.useState([]);
	const maxNumber = 1;

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		// Get the first image from the list (assuming only one image is selected)
		const selectedImage = imageList.length > 0 ? imageList[0] : null;
		console.log(imageList, addUpdateIndex);
		// Call the parent component's function to pass the selected image
		props.onImageSelect(selectedImage);
		setImages(imageList);
	};

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <h1>Photo Upload</h1>
            <div className="button-div"> 
              <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
            </div>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageUpload;
