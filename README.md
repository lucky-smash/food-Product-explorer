# Food Product Explorer 🥗🔍

A full-stack web application to search and explore food products using public food APIs.  
The project follows a **clean monorepo architecture** with separate frontend and backend folders.

---

## 🌍 Live Demo

Frontend is deployed on **Vercel**:

🔗 https://food-product-explorer-omega.vercel.app/

> Backend deployment will be added once API layer is completed.



## 📁 Project Structure

food-Product-explorer/
├── frontend/ # React + Vite frontend
├── backend/ # Node.js + Express backend (in progress)
├── .gitignore # Global git ignore rules
└── README.md # Project documentation


---

## 🧠 Architecture Overview

This repository uses a **single GitHub repo (monorepo)** with **multiple applications**:

### Frontend
- Built with **React + Vite**
- Handles UI, routing, and API consumption
- Uses React Router for navigation
- Fetches data from public food APIs
- Runs independently from backend

Location: /frontend

### Backend (currently being set up)
- Will be built using **Node.js + Express**
- Will act as a secure API layer
- Planned to support:
  - AI voice-to-text features
  - API proxying
  - Future authentication

Location: /backend


---

## 🚀 Running the Project Locally

### Frontend

```bash
cd frontend
npm install
npm run dev


http://localhost:5173 (or next available port)
