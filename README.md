# Coderitz — Official Website & Project Platform

A clean, modern, and professional website for **Coderitz**, a technology and project development initiative focused on helping students plan, build, and understand academic and practical software projects.

Built with a **minimalist black-and-white visual identity**, sharp typography, subtle interactions, and modular architecture.

---

## 🛠️ Technology Stack

- **Frontend:** React + Vite, Tailwind CSS, Framer Motion, Lucide Icons, shadcn/ui aesthetic conventions
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (with automatic schema migration and graceful local persistence fallback)
- **Architecture:** Centralized data files for all content (services, projects, team members, workflow, site configuration)

---

## 📁 Project Structure

```
d:\Coderitx/
├── package.json                   # Root orchestrator (concurrent dev, unified start)
├── README.md                      # Complete documentation
│
├── client/                        # React + Vite Frontend
│   ├── index.html                 # Clean semantic HTML with Inter & JetBrains Mono fonts
│   ├── vite.config.js             # Vite config with /api reverse proxy
│   ├── tailwind.config.js         # Custom monochrome palette & dark mode class config
│   ├── src/
│   │   ├── main.jsx               # Entry point
│   │   ├── App.jsx                # Core application layout
│   │   ├── index.css              # Custom styling, dark mode tokens, scrollbars
│   │   ├── hooks/
│   │   │   └── useTheme.js        # Light/Dark mode state with localStorage persistence
│   │   ├── lib/
│   │   │   └── utils.js           # Class name merging utility (cn)
│   │   ├── data/                  # ⭐ CENTRALIZED DATA FILES (Editable by team)
│   │   │   ├── services.js        # 6 Technical services with highlights & stacks
│   │   │   ├── projects.js        # 7 Documented projects with architecture breakdowns
│   │   │   ├── team.js            # 5 Co-founders with factual credentials
│   │   │   ├── workflow.js        # 4-Step development & walkthrough process
│   │   │   └── siteConfig.js      # Brand copy, contact placeholders, FAQs
│   │   └── components/
│   │       ├── Navbar.jsx         # Sticky header, brand wordmark, theme toggle, drawer
│   │       ├── Hero.jsx           # Clean headline, CTAs, interactive engineering console
│   │       ├── Services.jsx       # Minimalist service cards with flexible scope callout
│   │       ├── Projects.jsx       # Portfolio grid with category filters & inspection modal
│   │       ├── ProjectModal.jsx   # Architectural layers, metrics & tech inspection
│   │       ├── Workflow.jsx       # 4-step process emphasizing "Deliver & Explain"
│   │       ├── AboutTeam.jsx      # Co-founders with factual credentials
│   │       ├── ProjectForm.jsx    # Project enquiry form with anti-spam & validation
│   │       ├── ContactFooter.jsx  # Closing CTA, FAQ accordion, footer links & copyright
│   │       └── ui/
│   │           ├── Button.jsx     # Reusable monochrome button component
│   │           └── Badge.jsx      # Reusable badge component
│
└── server/                        # Node.js + Express Backend
    ├── index.js                   # Express server, CORS, rate limiting, static serving
    ├── package.json               # Server dependencies (express, pg, cors, dotenv, etc.)
    ├── .env.example               # PostgreSQL connection string template
    ├── config/
    │   └── db.js                  # PostgreSQL pool, schema migration & fallback storage
    ├── routes/
    │   └── enquiries.js           # POST /api/enquiries, GET /api/enquiries, GET /api/health
    └── data/
        └── enquiries_fallback.json# Safe backup storage when PostgreSQL is offline
```

---

## 🚀 Getting Started

### 1. Installation
All packages are already installed. If installing on a new machine:
```bash
# Install root, client, and server dependencies
npm install
npm install --prefix client
npm install --prefix server
```

### 2. Development Mode
Run both the frontend (Vite on `http://localhost:5173`) and the backend (Express on `http://localhost:5000`) simultaneously with a single command:
```bash
npm run dev
```

### 3. Production Build & Run
Build the React frontend into static assets and serve them directly via Express:
```bash
npm run build
npm start
```
The unified application will be available at `http://localhost:5000`.

---

## 🗄️ PostgreSQL Setup

Coderitz includes an **automatic migration system** that creates the `enquiries` table on startup:

```sql
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  institution VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  preferred_tech VARCHAR(255),
  description TEXT NOT NULL,
  deadline VARCHAR(100),
  additional_requirements TEXT,
  ip_address VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Connecting Your PostgreSQL Database:
1. Create a `.env` file in `server/` (copy from `server/.env.example`).
2. Provide your connection string:
   ```env
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
   ```
3. Works with local PostgreSQL, Supabase, Neon, AWS RDS, ElephantSQL, or Railway.
4. **Resilient Fallback:** If PostgreSQL is unreachable or credentials are not yet configured, enquiries are safely saved to `server/data/enquiries_fallback.json` without any downtime or data loss.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/enquiries` | Submit student project enquiry (includes input validation, honeypot spam protection, and rate limiting). |
| `GET` | `/api/enquiries` | Retrieve list of submitted enquiries. |
| `GET` | `/api/health` | Server health, database status, and total enquiries counter. |

---

## 🎨 Design System & Philosophy

- **Monochrome & High Contrast:** Strictly black, white, and subtle neutral grays (`neutral-100` to `neutral-900`).
- **Dark Mode Support:** Clean toggle in Navbar; state persisted across sessions via `localStorage`.
- **Typography:** `Inter` for clean body and headings; `JetBrains Mono` for badges, metadata, and technical specifications.
- **Credible Software Studio:** No exaggerated claims, no fake stock photos, no inflated stats. Honest, transparent co-founder profiles and production-verified project architectures.

