# TaskFlow — Task Management Dashboard

A modern task management dashboard built with React, TypeScript, and Tailwind CSS. Features include task tracking, project overview, calendar view, and analytics.

🔗 **Live Demo:** [link will be added after deploy]

![Dashboard Preview](./screenshots/dashboard.png)

---

## Features

- 📊 **Dashboard** — overview stats, task trends chart, upcoming deadlines, project status
- ✅ **Tasks** — filter by status/priority, search, create and delete tasks
- 📁 **Projects** — project cards with task progress
- 📅 **Calendar** — monthly view with task deadlines, click to view details
- ⚙️ **Settings** — profile, theme (dark mode)
- 🔐 **Authentication** — login/logout flow with protected routes
- ⌨️ **Keyboard shortcuts** — `Ctrl+B` toggle sidebar, `Ctrl+M` quick new task
- 📱 **Responsive** — works on mobile and desktop

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **Zustand** — state management
- **React Router** — routing
- **Recharts** — charts and graphs
- **date-fns** — date utilities
- **react-icons** — icon set

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/pavlolab/taskflow.git
cd taskflow

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Demo Login

This project uses mock authentication. You can sign in with:
- **Email:** any valid email format (e.g. `demo@example.com`)
- **Password:** any password with 4+ characters

---

## Project Structure

```
src/
├── components/      # Reusable UI components (Header, Sidebar, Modals)
├── pages/            # Page components (Dashboard, Tasks, Projects, etc.)
├── store/            # Zustand stores (task state, UI state)
├── types/            # TypeScript type definitions
└── App.tsx           # Routes and app shell
```

---

## Roadmap

- [ ] Connect to Supabase for persistent data storage
- [ ] Task editing
- [ ] Drag & drop task board (Kanban view)
- [ ] Toast notifications
- [ ] Full i18n support (English / Ukrainian)

---

## Author

**Pavlo** — [GitHub](https://github.com/pavlolab)

Built as a learning project to practice React, TypeScript, and modern frontend tooling.
