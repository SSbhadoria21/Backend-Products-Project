# Product Browser - Scalable Cursor Pagination

A production-ready full-stack application demonstrating high-performance cursor pagination over a dataset of 200,000+ records. Designed to be scalable, duplicate-proof, and resilient to concurrent inserts.

## Features

- **Cursor Pagination (Keyset Pagination)**: Eliminates duplicates and missing records that occur with OFFSET pagination.
- **High Performance**: Optimized PostgreSQL queries utilizing compound indexes for fast lookups.
- **Concurrent Insert Resilient**: Simulate inserts while browsing to verify that pagination remains stable without UI glitches.
- **Modern UI**: Built with React, Vite, TailwindCSS, Framer Motion, and Lucide React. Apple/Linear inspired glassmorphism design.
- **Robust Backend**: Node.js, Express, Prisma ORM, and Zod validation.

---

## Why Cursor Pagination?

When using `OFFSET` pagination, the database essentially counts and skips rows. If new items are inserted at the beginning of the table (newest-first ordering) while a user is paginating, the offsets shift. 
- A user on Page 1 clicks "Next Page" (Offset 20).
- If 5 new items were just inserted, the first 5 items on Page 2 will be the same as the last 5 items they saw on Page 1 (duplicates).
- If items were deleted, they might miss items entirely.

**Cursor Pagination** solves this by keeping a reference (cursor) to the last item seen.
Instead of `OFFSET 20`, the query looks like:
```sql
WHERE (created_at < cursor.createdAt)
   OR (created_at = cursor.createdAt AND id < cursor.id)
ORDER BY created_at DESC, id DESC
LIMIT 20
```
This guarantees the user continues exactly where they left off, regardless of how many new records were inserted.

---

## Project Structure

```text
project/
├── backend/
│   ├── prisma/             # Schema & Migrations
│   ├── scripts/seed.ts     # Script to generate 200k products
│   └── src/
│       ├── controllers/    # API Request handlers
│       ├── routes/         # Express routes
│       ├── types/          # Zod schemas & types
│       └── utils/          # Cursor encoding/decoding utilities
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Main UI
│   │   ├── index.css       # Global styles & Tailwind
│   │   └── main.tsx        # React entry
└── README.md
```

---

## Setup & Running Locally

### 1. Database Setup (Supabase / PostgreSQL)

You will need a PostgreSQL database. You can quickly get a free one from [Supabase](https://supabase.com).

1. Create a project in Supabase.
2. Go to Project Settings -> Database -> Connection String (URI).
3. Copy the URI.

### 2. Environment Variables

**Backend** (`backend/.env`):
```env
PORT=3000
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL="http://localhost:3000/api"
```

### 3. Running Backend & Seeding

```bash
cd backend
npm install
# Push schema to the database
npx prisma db push
# Seed the database with 200,000 products (~1 minute)
npm run seed
# Start the backend API
npm run dev
```

### 4. Running Frontend

In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Deployment

### Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your repository.
4. Set the Root Directory to `backend`.
5. Build Command: `npm install && npx prisma generate && npm run build`
6. Start Command: `node dist/index.js`
7. Add `DATABASE_URL` to the Environment Variables.

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and create a new project.
2. Connect your repository.
3. Select the `frontend` directory as the Root Directory.
4. Framework Preset: `Vite`.
5. Add `VITE_API_URL` to point to your Render backend URL.
6. Click Deploy.
