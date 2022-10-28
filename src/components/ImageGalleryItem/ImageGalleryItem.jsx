// import { Component } from 'react';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import './ImageGalleryItem.scss';

export function ImageGalleryItem({ largeImageURL, webformatURL }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}

      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt="asdasdasdasd"
        onClick={toggleModal}
      />
    </>
  );
}
