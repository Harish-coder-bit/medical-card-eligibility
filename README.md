# Medical Card Eligibility Checker

A Next.js app for submitting and viewing medical card eligibility applications.

## Setup

### Requirements

- Node.js 18+
- npm

### Install and Run

```bash
git clone <repo-url>
cd medical-card-eligibility
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## What This App Does

**Users:**

- Fill out a form with their info (name, email, age, medical condition, state)
- Submit for eligibility check

**Admins:**

- Login to `/admin/submissions`
- View all submitted applications in a table

## Main Routes

- `/` - Home page
- `/admin/submissions` - Admin dashboard (requires login)

## Tech Stack

- **Framework:** Next.js
- **Frontend:** React, Tailwind CSS
- **HTTP Client:** Axios

## Key Features

- User form submission
- Admin login and dashboard
- Responsive design with Tailwind CSS
- API endpoints for authentication and data management

See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details.
