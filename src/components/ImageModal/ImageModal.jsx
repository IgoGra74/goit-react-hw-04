import css from "./ImageModal.module.css";

const ImageModal = ({ image }) => {
  if (!image) {
    return null;
  }

  return (
    <div className={css.regular}>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={css.image}
      />
      <p className={css.text}>{image.alt_description}</p>
    </div>
  );
};

export default ImageModal;
