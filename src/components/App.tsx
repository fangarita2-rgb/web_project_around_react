import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import type {
  UserData,
  CardData,
  PopupConfig,
  UserFormData,
  AvatarFormData,
  CardFormData,
} from '../types/types';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

function App(): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        setCurrentUser(userData);
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleOpenPopup(popupConfig: PopupConfig): void {
    setPopup(popupConfig);
  }

  function handleClosePopup(): void {
    setPopup(null);
  }

  async function handleCardLike(card: CardData): Promise<void> {
    const isLiked = card.isLiked;
    try {
      const apiCall = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);
      const newCard = await apiCall;
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(card: CardData): Promise<void> {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateUser(data: UserFormData): Promise<void> {
    try {
      const updatedUser = await api.updateUserInfo(data);
      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateAvatar(data: AvatarFormData): Promise<void> {
    try {
      const updatedUser = await api.updateAvatar(data);
      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(data: CardFormData): Promise<void> {
    try {
      const newCard = await api.addCard(data);
      setCards((state) => [newCard, ...state]);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit }}
    >
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;