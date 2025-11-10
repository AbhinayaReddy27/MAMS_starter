
# Military Asset Management System (MAMS)

A production-style full‑stack project (React + Node/Express + MongoDB) showcasing secure, role‑based logistics for managing military assets across bases, with audit logs and transfers.

## Quick Start

### Prereqs
- Node.js 20+ and pnpm (or npm/yarn)
- MongoDB Atlas (or local MongoDB)

### Backend
```bash
cd backend
cp .env.example .env        # fill in MONGODB_URI and JWT secrets
pnpm install                # or npm install
pnpm dev                    # starts API on http://localhost:8080
# (Optional) Seed demo data:
pnpm seed
```

### Frontend
```bash
cd frontend
cp .env.example .env        # set VITE_API_URL=http://localhost:8080
pnpm install
pnpm dev                    # opens web on http://localhost:5173
```

### Default Ports
- API: http://localhost:8080
- Web: http://localhost:5173

## Notes
- This is a minimal, runnable scaffold with example models/routes (Bases, Assets, Transfers) and stubbed auth to get you started.
- For production, harden auth/RBAC, add tests, and follow the blueprint.
