import { useContext } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import type { CardData } from '../../../types/types';

type CardProps = {
  card: CardData;
  onCardClick: (card: CardData) => void;
  onCardDelete: (card: CardData) => void;
  onCardLike: (card: CardData) => void;
};

export default function Card({
  card,
  onCardClick,
  onCardDelete,
  onCardLike,
}: CardProps): React.JSX.Element {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked, owner } = card;

  const isOwn = currentUser?._id === owner;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />
      {isOwn && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={() => onCardDelete(card)}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}