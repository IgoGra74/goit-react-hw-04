import { useEffect } from "react";
import css from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ image, modalOpen, closeModal }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  if (!image) {
    return null;
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        contentLabel="Selected Image Modal"
        overlayClassName="overlay"
        className="modal"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            position: "absolute",
            overflow: "hidden",
            WebkitOverflowScrolling: "touch",
            borderRadius: "3px",
            outline: "none",
          },
        }}
      >
        <div className={css.regular}>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={css.image}
          />
          <p className={css.text}>{image.alt_description}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
