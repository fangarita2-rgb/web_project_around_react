import { useRef, useContext, type FormEvent } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (avatarRef.current) {
      handleUpdateAvatar({ avatar: avatarRef.current.value });
    }
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      name="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="avatar-url"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace de la foto de perfil"
          required
          type="url"
          ref={avatarRef}
        />
        <span className="popup__error" id="avatar-url-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}