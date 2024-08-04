import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ closeModal, src, alt }) => {
  useEffect(() => {
    console.log('render, inst listener');
    const onCloseModalByEsc = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onCloseModalByEsc);

    return () => {
      window.removeEventListener('keydown', onCloseModalByEsc);
      console.log('unmount');
    };
  }, [closeModal]);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.onCloseModalByEsc);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeModalByEsc);
  // }

  const onCloseModal = () => {
    closeModal();
  };
  return (
    <>
      <Overlay onClick={onCloseModal} />
      <ModalWindow>
        <img src={src} alt={alt} width="600" />
      </ModalWindow>
    </>
  );
};
