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


def send_job_application(first_name, middle_name, last_name, age, gender, civil_status, position, email, phone, address, city, state, zip_code, notes, work_history, resume=None):
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
Name: {first_name} {middle_name} {last_name}
Age: {age}
Gender: {gender}
Civil Status: {civil_status}
Position: {position}
Email: {email}
Phone: {phone}
Address: {address}
City: {city}
State: {state}
Zip Code: {zip_code}

Additional Notes:
{notes if notes else 'N/A'}

Work History:
{work_history_text}

Resume and documents are attached.
""".strip()
    )

    if resume:
        resume.seek(0)
        msg.add_attachment(
            resume.read(),
            maintype="application",
            subtype="octet-stream",
            filename=resume.filename,
        )

    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as smtp:
        smtp.login(SENDER_EMAIL, SENDER_PASSWORD)
        smtp.send_message(msg)

    return True


@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}

    name = (data.get("fullName") or "").strip()
    email = (data.get("email") or "").strip()
    company = (data.get("company") or "").strip()
    message = (data.get("message") or "").strip()

    if not all([name, email, company, message]):
        return jsonify({"success": False, "error": "All fields are required."}), 400

    try:
        send_contact_message(name, email, company, message)
        return jsonify({"success": True, "message": "Message sent successfully."})
    except Exception as exc:
        return jsonify({"success": False, "error": str(exc)}), 500


@app.route("/apply", methods=["POST"])
def apply():
    first_name = (request.form.get("firstName") or "").strip()
    middle_name = (request.form.get("middleName") or "").strip()
    last_name = (request.form.get("lastName") or "").strip()
    age = (request.form.get("age") or "").strip()
    gender = (request.form.get("gender") or "").strip()
    civil_status = (request.form.get("civilStatus") or "").strip()
    position = (request.form.get("position") or "").strip()
    email = (request.form.get("email") or "").strip()
    phone = (request.form.get("contactNumber") or "").strip()
    address = (request.form.get("address") or "").strip()
    city = (request.form.get("city") or "").strip()
    state = (request.form.get("state") or "").strip()
    zip_code = (request.form.get("zipCode") or "").strip()
    notes = (request.form.get("notes") or "").strip()
    
    work_history_str = request.form.get("workExperiences", "[]")
    try:
        work_history = json.loads(work_history_str)
    except (json.JSONDecodeError, TypeError):
        work_history = []
    
    resume = request.files.get("resume")

    if not all([first_name, last_name, position, email, phone, city, state]):
        return jsonify({"success": False, "error": "All required fields must be provided."}), 400

    try:
        send_job_application(first_name, middle_name, last_name, age, gender, civil_status, position, email, phone, address, city, state, zip_code, notes, work_history, resume)
        return jsonify({"success": True, "message": "Application submitted successfully."})
    except Exception as exc:
        return jsonify({"success": False, "error": str(exc)}), 500


if __name__ == "__main__":
    app.run(debug=True)

