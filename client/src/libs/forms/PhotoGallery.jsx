import ImageGallery from "react-image-gallery";
import { getPhotos } from "../services/api-client/photoService";

const images = getPhotos(1);


class MyGallery extends React.Component {
  render() {
    return <ImageGallery items={images} />;
  }
}

export default MyGallery;