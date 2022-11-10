import './ImageGallery.scss';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos }) => {
  return (
    <ul className="ImageGallery">
      {photos.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <li key={id} className="ImageGalleryItem">
            <ImageGalleryItem
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          </li>
        );
      })}
    </ul>
  );
};
