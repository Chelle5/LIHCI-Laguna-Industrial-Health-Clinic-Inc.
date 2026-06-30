import os
import json
import smtplib
from email.message import EmailMessage

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465

SENDER_EMAIL = "rachelleterrible05@gmail.com"
SENDER_PASSWORD = "vruj cvyf yqlk jhmi"

RECIPIENT_EMAIL = "rachelleterrible05@gmail.com"


def send_contact_message(name, email, company, message_body):
    msg = EmailMessage()
    msg["Subject"] = f"Inquiry from {name} ({company})"
    msg["From"] = SENDER_EMAIL
    msg["To"] = RECIPIENT_EMAIL
    msg["Reply-To"] = email

    msg.set_content(f"""
Full Name: {name}
Email: {email}
Company: {company}

Message:
{message_body}
""".strip())

    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as smtp:
        smtp.login(SENDER_EMAIL, SENDER_PASSWORD)
        smtp.send_message(msg)

    return True


def send_job_application(first_name, last_name, position, email, phone, city, state, work_history):
    msg = EmailMessage()
    msg["Subject"] = f"Job Application from {first_name} {last_name} - {position}"
    msg["From"] = SENDER_EMAIL
    msg["To"] = RECIPIENT_EMAIL
    msg["Reply-To"] = email

    work_history_text = "\n\n".join(
        [
            f"Position: {w.get('workPosition', 'N/A')}\nCompany: {w.get('companyName', 'N/A')}\nStart: {w.get('serviceStart', 'N/A')}\nEnd: {w.get('serviceEnd', 'N/A')}"
            for w in work_history
        ]
    )

    msg.set_content(
        f"""
Job Application Received

Applicant Information:
Name: {first_name} {last_name}
Position: {position}
Email: {email}
Phone: {phone}
City: {city}
State: {state}

Work History:
{work_history_text}

Please review the attachment for the full application and resume.
""".strip()
    )

    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as smtp:
        smtp.login(SENDER_EMAIL, SENDER_PASSWORD)
        smtp.send_message(msg)

    return True


@app.route("/apply", methods=["POST"])
def apply():
    data = request.get_json(silent=True) or {}

    first_name = (data.get("firstName") or "").strip()
    last_name = (data.get("lastName") or "").strip()
    position = (data.get("position") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("contactNumber") or "").strip()
    city = (data.get("city") or "").strip()
    state = (data.get("state") or "").strip()
    work_history = data.get("workExperiences", [])

    if not all([first_name, last_name, position, email, phone, city, state]):
        return jsonify({"success": False, "error": "All required fields must be provided."}), 400

    try:
        send_job_application(first_name, last_name, position, email, phone, city, state, work_history)
        return jsonify({"success": True, "message": "Application submitted successfully."})
    except Exception as exc:
        return jsonify({"success": False, "error": str(exc)}), 500



if __name__ == "__main__":
    app.run(debug=True)
