# Around The U.S. (React + Vite + TypeScript)

Migración modularizada de la plataforma interactiva **Around The U.S.** desde HTML/JS vainilla hacia una arquitectura moderna con **React**, **TypeScript** y **Vite**.

## 🚀 Características

- **Componentización Modular:** Estructura limpia separando `Header`, `Main`, `Footer`, `Card` y ventanas emergentes.
- **Control de Estado reactivo:** Manejo centralizado del ciclo de vida de modales mediante `useState` sin manipulación directa del DOM.
- **Tipado Estricto:** Definiciones de interfaces reutilizables (`CardData`, `PopupConfig`) centralizadas en `src/types/types.ts`.
- **Polimorfismo de Modales:** Componente contenedor `Popup` reutilizable que acepta `children` condicionales para formularios e imágenes ampliadas (`ImagePopup`).
- **Renderizado Dinámico:** Iteración de listas de tarjetas renderizadas a través de `.map()`.

## 🛠️ Tecnologías

- React 18+
- TypeScript
- Vite
- CSS3 / BEM Methodology

## 📂 Estructura del Proyecto

```text
src/
├── blocks/           # Hojas de estilo estructuradas por metodología BEM
├── components/       # Componentes React
│   ├── Footer/
│   ├── Header/
│   └── Main/
│       ├── Card/
│       └── Popup/    # Componentes de modales y formularios (EditProfile, EditAvatar, NewCard, ImagePopup)
├── types/            # Definiciones de tipos globalizados
│   └── types.ts
├── App.tsx
├── main.tsx
└── index.css
```
