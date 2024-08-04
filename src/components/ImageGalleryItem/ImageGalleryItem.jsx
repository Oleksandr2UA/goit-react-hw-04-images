import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, bigUrl }) => {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState('');

  const openModal = event => {
    setOpen(true);
    setSrc(event.currentTarget.src);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Item className="ImageGalleryItem">
        <Image
          className="ImageGalleryItem-image "
          src={bigUrl}
          alt={tags}
          width="400px"
          onClick={openModal}
        />
      </Item>
      {open && <Modal closeModal={closeModal} src={src} alt={tags} />}
    </>
  );
};
