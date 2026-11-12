# Nouman Sajid — Portfolio Website (React + TypeScript)

A simple personal portfolio built with **React**, **TypeScript**, and **Vite**, showcasing **Full-Stack Web Development** and **Agentic AI Engineering**. The interface uses a white background, dark text, a readable system font, and a compact layout.

---

## 👨‍💻 Developer Profile

- **Name:** Muhammad Nouman Sajid
- **Title:** Full-Stack Developer & Agentic AI developer
- **Education:** BS Computer Science, National Textile University (2024 – 2028)
- **Location:** Okara, Pakistan (Available for Global Remote & Freelance Roles)
- **Specialization:** Autonomous Agentic Workflows (LangChain, LangGraph), High-Performance Web Applications (React, Next.js, TypeScript), and Scalable Backend Architectures.

---

## ✨ Key Features

- **Simple home page:** A short introduction, four selected projects, About, skills, experience, and contact details in one readable column.
- **Project previews:** Real local screenshots with concise summaries, technologies, and clearly labelled website or GitHub links. Unavailable images display the project name.
- **Project archive (`/myworks`):** All five projects with Full-Stack, Agentic AI, and Tools filters.
- **Direct contact:** Email links open your mail application. The copy button includes a fallback if clipboard access is unavailable.
- **Résumé:** The existing PDF is linked directly from navigation.
- **Responsive layout:** Two project columns on desktop and one on mobile. Navigation wraps on small screens without a hidden menu.
- **Accessibility:** Semantic headings, skip links, visible keyboard focus, labelled controls, and announced copy results.
- **Lightweight presentation:** System typography, static layouts, and no decorative artwork, terminal, animated backgrounds, or loading intro on the portfolio.
- **Chess (`/play`):** The existing optional chess experience remains available from the footer. Its conversational companion requires a server-side `GROQ_API_KEY`.

---

## 🌟 Featured Projects

1. **[Think-Space.dev](https://think-space.dev):** Modern, dynamic blogging and technical publication platform built with React, Next.js, and TypeScript, featuring content management, category filtering, and optimized reading experience.
2. **Auto-Apply-AI:** Autonomous agentic automation tool engineered in Python. Dynamically parses resumes and job postings to match application criteria and streamline job submissions.
3. **LIMO AGENT:** Intelligent multimodal AI agent integrating Google Veo 3.1 Lite for generative video synthesis and conversational task automation.
4. **Pak Job Portal:** Full-stack recruitment and employment platform built with Next.js, React, Tailwind CSS, and secure database integration.
5. **[Crawler](https://github.com/alfa546/Crawler):** Enterprise-grade, open-source technical SEO crawler and audit platform supporting deep URL tree analysis, JavaScript rendering, and CSV/Excel data exports.

---

## 🧰 Tech Stack

- **Frontend:** React 18, TypeScript, Vite, CSS, Lucide Icons, React Icons
- **Agentic AI & Backend:** Python, LangChain, LangGraph, RAG Pipelines, Tool Calling, Vector DBs, Flask, REST APIs
- **DevOps & Core Tools:** Docker, Linux, GitHub, Git, SQL / Relational Databases, Vercel
- **Engines & Utilities:** Chess.js, Redox chess engine

---

## 🚀 Getting Started

### 1) Clone the Repository

```bash
git clone https://github.com/alfa546/Nouman-sajid-portfolio.git
cd Nouman-sajid-portfolio
```

### 2) Install Dependencies

```bash
npm ci
```

### 3) Start the Local Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 4) Build for Production

```bash
npm run build
```

---

## Validation

```bash
npm run build  # TypeScript checks and production bundle
npm run lint
```

Profile, project, experience, and contact content lives in `src/config.ts`.
The home page is `src/pages/Portfolio.tsx`; shared tokens and layouts live in
`src/index.css` and `src/App.css`. Project cards are shared with `/myworks`.

Deploy `dist/` after building. Keep the existing Vercel SPA rewrites so direct
visits to `/myworks` and `/play` resolve correctly. Deploying only static files
will not provide the optional `/api/chat` endpoint.

---

## 🤝 Connect & Socials

- **GitHub:** [@alfa546](https://github.com/alfa546)
- **LinkedIn:** [Muhammad Nouman Sajid](https://www.linkedin.com/in/muhammad-nouman-sajid-92343842b)
- **Twitter / X:** [@NoumanSajid1234](https://x.com/NoumanSajid1234)
- **Email:** [noumansajid623@gmail.com](mailto:noumansajid623@gmail.com)

---

## 🪪 License

This project is open-source and licensed under the [MIT License](LICENSE).
