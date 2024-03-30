import css from "./ImageCard.module.css";

const ImageCard = ({ image, openModal }) => {
  return (
    <div>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
        key={image.id}
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;
