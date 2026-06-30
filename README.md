# LIHCI-Laguna-Industrial-Health-Clinic-Inc.

## Running the frontend

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Running the contact backend

1. Install Python dependencies:
   - `pip install flask flask-cors`
2. Set these environment variables before starting the server:
   - `SMTP_USERNAME=your-gmail-address@gmail.com`
   - `SMTP_PASSWORD=your-gmail-app-password`
   - `SMTP_RECIPIENT=info@lihci.com.ph`
3. Start the backend:
   - `python backend/app.py`

> For Gmail, use an App Password instead of your normal password. You can generate one in your Google Account security settings.

## Deploying to Vercel

1. Create a Vercel project from this repository.
2. In Vercel Environment Variables, add:
   - `SMTP_USERNAME` = your SMTP username
   - `SMTP_PASSWORD` = your SMTP password or app password
   - `SMTP_RECIPIENT` = the email address that should receive submissions
   - `SMTP_HOST` = optional (default is `smtp.gmail.com`)
   - `SMTP_PORT` = optional (default is `465`)
3. Leave `VITE_API_URL` empty unless you want to point the frontend to a separate external backend.
4. Deploy the project.

After deployment, the contact form sends requests to `/api/contact` and the apply form sends requests to `/api/apply`.

## Vercel deployment notes

- Set `VITE_API_URL` in Vercel environment variables to your deployed backend URL, for example `https://your-backend.vercel.app`.
- If the backend is served from the same domain as the frontend, leave `VITE_API_URL` empty and use the relative proxy path.
- The frontend uses `apiUrl(path)` so the same code works for both local dev and deployed production.

