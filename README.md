# Internship Management System 
 
> A web-based internship management platform connecting TVET students in Rwanda with verified tech companies. Built with Next.js and TypeScript.
 
---

## Live Demo
 
- **Frontend:** [https://internship-management-system-tau.vercel.app](https://internship-management-system-tau.vercel.app)
---
 
##  About the Project
 
SkillBridge Tech bridges the gap between TVET education and the tech industry in Rwanda by providing:
 
- **Students** — Browse and apply for internships matched to their course area
- **Companies** — Post internship opportunities and track student progress
- **School Supervisors** — Monitor students remotely through a dedicated dashboard
- **System Admin** — Manage users, verify companies and schools, resolve disputes
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, React |
| Styling | Inline styles + Tailwind CSS |
| Auth | JWT (Access + Refresh tokens) |
| API | Django REST Framework (Backend) |
| Deployment | Vercel (Frontend), Render (Backend) |
 
---
 
##  Project Structure
 
```
internship-management-system/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── dashboard/
│   │   ├── student/
│   │   ├── company/
│   │   └── supervisor/
│   └── layout.tsx
├── lib/
|   └── api.js 
│   └── auth.js          # All API calls live here
├── components/
├── public/
```
 
---
 
## Prerequisites
 
Before setting up this project, make sure you have the following installed:
 
- **Node.js** v18 or higher → [Download here](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)
- **Git** → [Download here](https://git-scm.com)
---
 
## Getting Started
 
### Step 1 — Clone the repository
 
```bash
git clone https://github.com/YOUR_USERNAME/internship-management-system.git
cd internship-management-system
```
 
### Step 2 — Install dependencies
 
```bash
npm install
```
 
### Step 3 — Set up environment variables
 
Create a `.env.local` file in the root of the project:
 
```bash
# On Windows
type nul > .env.local
 
# On Mac/Linux
touch .env.local
```
 
Then open `.env.local` and add the following:
 
```env
NEXT_PUBLIC_API_URL=API
```
 
### Step 4 — Run the development server
 
```bash
npm run dev
```
 
Open your browser and visit:
 
```
http://localhost:3000
```
 

---
 
##  User Roles & Access
 
The platform has four user roles. Each role gets a different dashboard after login:
 
| Role | Dashboard URL | What they can do |
|---|---|---|
| Student | `/dashboard/student` | Browse internships, apply, view progress reports |
| Company | `/dashboard/company` | Post internships, manage applications, submit weekly reports |
| Supervisor | `/dashboard/supervisor` | Monitor students, view progress reports remotely |
| Admin | `/dashboard/admin` | Manage users, verify companies and schools |
 
---
 
## Authentication Flow
 
1. User registers at `/register` with role selection
2. On successful registration, JWT tokens are stored in `localStorage`
3. All protected API calls include the `Authorization: Bearer <token>` header
4. When the access token expires, the user is redirected to `/login`
---
 
## Available Scripts
 
| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check for code issues |
 
---
 
 
##  Common Issues & Fixes
 
| Problem | Cause | Fix |
|---|---|---|
| `Module not found` error | Dependencies not installed | Run `npm install` |
| API calls return 401 | Token missing or expired | Log out and log back in |
| Blank page after login | Wrong API URL in `.env.local` | Check `NEXT_PUBLIC_API_URL` is correct |
| Backend takes long to respond | Render free tier sleep | Wait 30-50 seconds for first request |
| CORS error in console | Backend not configured for your URL | Use the deployed backend URL |
 
---
 
##  Contributing
 
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request
---
 
## Author
 
**Nyiramanzi Igihozo**
- Email: n.igihozo@alustudent.com
- GitHub: [@nIgihozo](https://github.com/nIgihozo)
---
 
## 📄 License
 
This project is for educational purposes.
 
---
 
> Built with  in Kigali, Rwanda · Internship Management System © 2026