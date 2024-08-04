import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <List className="gallery">
      {images.map(({ id, tags, webformatURL }) => (
        <ImageGalleryItem key={id} tags={tags} bigUrl={webformatURL} />
      ))}
    </List>
  );
};
