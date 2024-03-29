import css from "./ImageCard.module.css";

const ImageCard = ({ image }) => {
  return (
    <div>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
        key={image.id}
      />
    </div>
  );
};

export default ImageCard;
