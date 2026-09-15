# Around The U.S. (React + Vite + TypeScript)

Migración modularizada de la plataforma interactiva **Around The U.S.** desde HTML/JS vainilla hacia una arquitectura moderna con **React**, **TypeScript** y **Vite**, conectada a un backend real mediante `fetch`.

## 🚀 Características

- **Componentización Modular:** Estructura limpia separando `Header`, `Main`, `Footer`, `Card` y ventanas emergentes, todo dentro de `src/components`.
- **Conexión a API real:** Capa de acceso a datos en `src/utils/api.ts` (clase `Api` tipada) para obtener el usuario y las tarjetas, y para editar perfil, avatar, tarjetas y "me gusta".
- **Context API:** El usuario actual (`currentUser`) y las funciones que actualizan sus datos se comparten a través de `CurrentUserContext`, evitando prop drilling.
- **Estado centralizado en `App.tsx`:** El componente `App` actúa como "cerebro" de la aplicación — guarda `currentUser`, `cards` y `popup`, hace la llamada inicial a la API y expone los handlers a los demás componentes.
- **Formularios controlados y no controlados:** `EditProfile` y `NewCard` usan `useState` (controlados); `EditAvatar` usa `useRef` (no controlado), como ejemplo de ambas técnicas de React.
- **Tipado Estricto:** Interfaces reutilizables (`CardData`, `UserData`, `PopupConfig`, `CardFormData`, `UserFormData`, `AvatarFormData`, `CurrentUserContextType`) centralizadas en `src/types/types.ts`.
- **Polimorfismo de Modales:** Componente contenedor `Popup` reutilizable que acepta `children` condicionales para formularios e imágenes ampliadas (`ImagePopup`).
- **Renderizado Dinámico:** Iteración de listas de tarjetas renderizadas a través de `.map()`, con "me gusta" y borrado conectados al backend.

## 🛠️ Tecnologías

- React 19
- TypeScript
- Vite
- ESLint
- Context API (`createContext`, `useContext`)
- Fetch API
- CSS3 / BEM Methodology

## 📂 Estructura del Proyecto

```text
src/
├── blocks/           # Hojas de estilo estructuradas por metodología BEM
├── images/           # Recursos gráficos (logo, avatar, etc.)
├── vendor/           # Fuentes y normalize.css
├── contexts/         # Context API
│   └── CurrentUserContext.tsx
├── utils/            # Acceso a la API
│   └── api.ts
├── components/       # Componentes React
│   ├── App.tsx       # Estado global, llamada inicial a la API y Provider del contexto
│   ├── Footer/
│   ├── Header/
│   └── Main/
│       ├── Card/
│       └── Popup/    # Componentes de modales y formularios (EditProfile, EditAvatar, NewCard, ImagePopup)
├── types/            # Definiciones de tipos globalizados
│   └── types.ts
├── main.tsx
└── index.css
```

## 📦 Cómo ejecutar el proyecto

```bash
npm install
npm run dev      # inicia el servidor de desarrollo en el puerto 3000
npm run lint     # corre ESLint
npm run build    # genera la versión de producción
```
