import { useState } from 'react';
import avatarPath from '../images/avatar.jpg';
import type { PopupConfig, CardData } from '../types/types';
import Popup from './Popup/Popup';
import NewCard from './Popup/NewCard/NewCard';
import EditProfile from './Popup/EditProfile/EditProfile';
import EditAvatar from './Popup/EditAvatar/EditAvatar';
import ImagePopup from './Popup/ImagePopup/ImagePopup';
import Card from './Card/Card';

const initialCards: CardData[] = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

export default function Main(): React.JSX.Element {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

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

  function handleOpenPopup(popupConfig: PopupConfig): void {
    setPopup(popupConfig);
  }

  function handleClosePopup(): void {
    setPopup(null);
  }

  function handleCardClick(card: CardData): void {
    setPopup({
      children: <ImagePopup card={card} />,
    });
  }

  function handleCardDelete(cardToDelete: CardData): void {
    setCards((prevCards) => prevCards.filter((c) => c._id !== cardToDelete._id));
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <button
            aria-label="Edit avatar"
            className="profile__avatar-button"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img
              src={avatarPath}
              alt="Avatar de Jacques Cousteau"
              className="profile__avatar"
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            aria-label="Edit profile"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />
          <p className="profile__subtitle">Explorador</p>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      <section className="elements page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          isOpen={popup !== null}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}