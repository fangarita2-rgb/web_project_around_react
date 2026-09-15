import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import type { PopupConfig, CardData } from '../../types/types';
import Popup from './Popup/Popup';
import NewCard from './Popup/NewCard/NewCard';
import EditProfile from './Popup/EditProfile/EditProfile';
import EditAvatar from './Popup/EditAvatar/EditAvatar';
import ImagePopup from './Popup/ImagePopup/ImagePopup';
import Card from './Card/Card';

type MainProps = {
  cards: CardData[];
  popup: PopupConfig | null;
  onOpenPopup: (popup: PopupConfig) => void;
  onClosePopup: () => void;
  onCardLike: (card: CardData) => void;
  onCardDelete: (card: CardData) => void;
};

export default function Main({
  cards,
  popup,
  onOpenPopup,
  onClosePopup,
  onCardLike,
  onCardDelete,
}: MainProps): React.JSX.Element {
  const { currentUser } = useContext(CurrentUserContext);

  const editProfilePopup: PopupConfig = {
    title: 'Editar perfil',
    children: <EditProfile />,
  };

  const newCardPopup: PopupConfig = {
    title: 'Nuevo lugar',
    children: <NewCard />,
  };

  const editAvatarPopup: PopupConfig = {
    title: 'Cambiar foto de perfil',
    children: <EditAvatar />,
  };

  function handleCardClick(card: CardData): void {
    onOpenPopup({
      children: <ImagePopup card={card} />,
    });
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <button
          aria-label="Edit avatar"
          className="profile__avatar-button"
          type="button"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name || 'Avatar de usuario'}
            className="profile__image"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Edit profile"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          isOpen={popup !== null}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}