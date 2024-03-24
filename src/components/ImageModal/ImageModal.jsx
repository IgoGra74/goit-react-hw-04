import css from "./ImageModal.module.css";

const ImageModal = ({ image }) => {
  if (!image) {
    return null;
  }

  return (
    <div className={css.сontainer}>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={css.image}
      />
      <p>{image.description}</p>
    </div>
  );
};

export default ImageModal;
