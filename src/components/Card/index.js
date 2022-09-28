import React from "react";
import cardStyles from "./Card.module.scss";

function Card({
  id,
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  favorited = false,
}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ imageUrl, title, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, imageUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/likeOn.svg" : "/img/likeOff.svg"}
          alt="plus"
        ></img>
      </div>
      <img width={133} height={112} src={imageUrl} alt="ботинок"></img>
      <p>{title}</p>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <h5>Цена:</h5>
          <b>{price} руб.</b>
        </div>

        <img
          className={cardStyles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btnChecked.svg" : "/img/buttonCard.svg"}
          alt="plus"
        ></img>
      </div>
    </div>
  );
}

export default Card;
