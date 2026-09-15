import { useState, useContext, type FormEvent } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || '');
  const [about, setAbout] = useState(currentUser?.about || '');

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleUpdateUser({ name, about });
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="profile-name"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nombre"
          minLength={2}
          maxLength={40}
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__error" id="profile-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          id="profile-about"
          className="popup__input popup__input_type_about"
          name="about"
          placeholder="Acerca de mí"
          minLength={2}
          maxLength={200}
          required
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <span className="popup__error" id="profile-about-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}