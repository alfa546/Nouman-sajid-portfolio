# Nouman Sajid — Portfolio Website (React + TypeScript)

A cybersecurity-inspired personal portfolio built with **React**, **TypeScript**, and **Vite**, showcasing **Full-Stack Web Development** and **Agentic AI Engineering**. A charcoal canvas, emerald accents, technical typography, and a custom animated orbital graphic bring the interface together.

---

## 👨‍💻 Developer Profile

- **Name:** Muhammad Nouman Sajid
- **Title:** Full-Stack Developer & Agentic AI developer
- **Education:** BS Computer Science, National Textile University (2024 – 2028)
- **Location:** Okara, Pakistan (Available for Global Remote & Freelance Roles)
- **Specialization:** Autonomous Agentic Workflows (LangChain, LangGraph), High-Performance Web Applications (React, Next.js, TypeScript), and Scalable Backend Architectures.

---

## ✨ Key Features

- **Responsive interface:** A shared navigation and visual system for the home page and project archive, with layouts for desktop, tablet, and mobile.
- **Interactive portfolio terminal:** Explore with `whoami`, `skills`, `projects`, `education`, `contact`, `help`, and `clear`. Press `/` outside a form field to focus the terminal. Commands only read local portfolio information.
- **Project gallery:** Filter real projects by Full-Stack, Agentic AI, or Tools, with local screenshots, technology lists, and external links. Missing screenshots fall back to a local visual.
- **Project archive (`/myworks`):** Browse all projects using the same filters and design system.
- **Chess arena (`/play`):** The existing Chess.js and Redox engine experience, styled to match the portfolio. Its optional conversational companion uses the server-side `/api/chat` endpoint and requires `GROQ_API_KEY` on the hosting platform.
- **Contact:** Copy the email address or prepare a prefilled draft in your email application. The form does **not** send mail or report delivery; you send the draft in your mail app.
- **Accessibility:** Skip links, visible keyboard focus, labelled inputs, announced interaction results, an Escape-dismissable mobile menu, reduced-motion support, and a motion pause control.
- **Typography:** Space Grotesk and IBM Plex Mono, served by Google Fonts with local system fallbacks.
- **Fast entry:** The portfolio opens without a blocking intro animation; secondary routes load on demand.

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
