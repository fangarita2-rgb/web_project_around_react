import type { CardData } from '../../types/types';

type CardProps = {
  card: CardData;
  onCardClick: (card: CardData) => void;
  onCardDelete: (card: CardData) => void;
};

export default function Card({ card, onCardClick, onCardDelete }: CardProps): React.JSX.Element {
  const { name, link } = card;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => onCardDelete(card)}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className="card__like-button"
        />
      </div>
    </li>
  );
}