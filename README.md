# 🥔 Supreme Potato

A simple authentication app built with **Next.js 14 App Router**, **Auth.js**, **Prisma**, and **PostgreSQL**. It supports login/signup with email + password, and also login with Google and GitHub.

---

## 🚀 Features

- Sign up and sign in with email/password
- Google and GitHub OAuth login
- Form validation using Zod
- Toast notifications using Sonner
- Protected routes using server-side auth
- Built with modern stack (Next.js App Router + TypeScript)

---

## 🛠 Tech Stack

- Next.js 14 (App Router)
- Auth.js
- Prisma
- PostgreSQL
- Tailwind CSS
- ShadCN UI
- Zod
- Sonner

---

## ⚙️ Getting Started

### 💻 Terminal Commands

```bash
# 1. Clone the repo
git clone https://github.com/s4mzai/supreme-potato.git
cd supreme-potato

# 2. Install dependencies
npm install
# or
yarn install

# 3. Create a .env file and paste the following:
# (open manually or use: touch .env && code .env)

# ------------------ .env TEMPLATE ------------------
# DATABASE_URL=your_postgres_url
# GITHUB_ID=your_github_client_id
# GITHUB_SECRET=your_github_client_secret
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# NEXTAUTH_SECRET=your_secret
# NEXTAUTH_URL=http://localhost:3000
# ---------------------------------------------------

# 4. Push Prisma schema to DB
npx prisma db push

# 5. Start development server
npm run dev
# or
yarn dev
```

Then visit: http://localhost:3000




## 🧠 Author
Made with ❤️ by Samar
If you found this helpful, star it ⭐ and tag me @s4mzai on X/Twitter