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

