# Notes Studier Frontend

Modern minimalist frontend for Notes Studier with glassmorphism design.

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Routing**: React Router
- **HTTP**: Axios
- **State Management**: TanStack Query

## Features

- Notes CRUD (Create, Read, Update, Delete)
- Search and filter notes
- Responsive design
- Glassmorphic UI components
- Real-time data fetching with optimistic updates

## Getting Started

### Prerequisites

- Node.js 18+
- Backend server running on `http://localhost:5001`

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── notes.ts          # API service for notes endpoints
│   ├── components/
│   │   ├── NoteCard.tsx      # Glassmorphic note display card
│   │   ├── NoteForm.tsx      # Create/edit note modal
│   │   ├── Header.tsx        # App header with glass effect
│   │   ├── Layout.tsx        # Main layout wrapper
│   │   └── DeleteModal.tsx   # Delete confirmation modal
│   ├── pages/
│   │   └── Home.tsx          # Dashboard with notes list
│   ├── hooks/
│   │   └── useNotes.ts       # React Query hooks for notes
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```

## Design System

### Glassmorphism

The app uses a custom glassmorphism design system with:

- **Glass**: `bg-white/10 backdrop-blur-md border border-white/20`
- **Glass Strong**: `bg-white/15 backdrop-blur-lg border border-white/30`
- **Glass Dark**: `bg-black/20 backdrop-blur-md border border-white/10`
- **Glass Button**: Glass effect with hover states and scale animations
- **Glass Input**: Translucent input with focus states

### Colors

- Primary gradient: Purple to Pink (`from-purple-500 to-pink-500`)
- Background: Slate to Purple gradient (`from-slate-900 via-purple-900 to-slate-900`)
- White with varying opacity levels for glass effects

## API Integration

The frontend connects to the backend API via Vite proxy:

- `GET /api/notes` - Fetch all notes
- `POST /api/notes` - Create a note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Running with Backend

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser

## Notes

- The frontend uses a Vite proxy to forward API requests to the backend, avoiding CORS issues
- TanStack Query handles caching, optimistic updates, and automatic refetching
- The design is fully responsive and works on mobile, tablet, and desktop
