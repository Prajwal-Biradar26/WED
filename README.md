# Wedding Invitation Platform

## Run locally

The backend serves the frontend and starts an in-memory MongoDB automatically when `MONGODB_URI` is not configured.

```powershell
cd backend
npm.cmd start
```

Open the invitation at http://localhost:5000/w/prajwal-and-priya or use the API health check at http://localhost:5000/api/health.

The seeded demo account is `demo@wedding.com` with password `Password123!`. Configure `MONGODB_URI`, `JWT_SECRET`, and optional Cloudinary/Gemini variables in `backend/.env` for persistent production use.
