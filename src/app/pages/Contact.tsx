import { useState, FormEvent } from "react";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
// @ts-ignore
import logoText from "../../imports/LIHCI-LOGO-TEXT-BLACK.svg";
// @ts-ignore
import aboutBanner from "../../imports/Medbannerbg.png";

interface ContactFormFields {
  fullName: string;
  email: string;
  company: string;
  message: string;
}

interface ContactFormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  message?: string;
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormFields>({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleInputChange = (key: keyof ContactFormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: ContactFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address (e.g. user@gmail.com)";
      }
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required. Please enter 'N/A' if not applicable.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitError(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      setSent(true);
      setFormData({
        fullName: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your message right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section         className="relative border-b border-border px-6 py-20"
        style={{
          backgroundImage: `url(${aboutBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Contact Us</p>
          <h1 className="mt-3 font-['Roboto_Slab'] text-5xl font-bold text-white">Get in Touch</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            Need reliable medical exam services or clinic support for your company? Contact LIHCI to schedule exams, ask questions, or book a consultation.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="mb-7">
            <ImageWithFallback src={logoText} alt="LIHCI logo" className="max-h-14 object-contain" />
          </div>
          <h2 className="font-['Roboto_Slab'] text-3xl font-bold text-black">Reach Us</h2>
          <p className="mt-3 leading-7 text-black/80">
            For inquiries, appointments, or partnerships, send us a message. We serve businesses across Laguna with timely medical diagnostics and annual exam services.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                <MapPin size={15} className="text-primary" />
              </div>
              <div>
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Address</p>
                <p className="text-sm text-foreground">National Road, Paciano Rizal, Calamba City, Laguna</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Phone size={15} className="text-primary" />
              </div>
              <div>
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone</p>
                <p className="text-sm text-foreground">(049) 502-4072 · (049) 508-0847</p>
                <p className="text-sm text-foreground">Mobile: (0916) 669-4979</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Mail size={15} className="text-primary" />
              </div>
              <div>
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</p>
                <p className="text-sm text-foreground">info@lihci.com.ph </p>
                <p className="text-sm text-foreground">admin@lihci.com.ph</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-secondary px-5 py-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Office Hours</p>
            <p className="text-sm text-foreground">Monday – Saturday · 8:00 AM – 5:00 PM</p>
          </div>
        </div>

        <div className="space-y-6">
          {sent ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-border bg-white p-10 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <Check size={24} className="text-primary" />
              </div>
              <h3 className="mb-2 font-['Roboto_Slab'] text-2xl font-bold">Message Sent</h3>
              <p className="max-w-xs text-muted-foreground">Thank you for reaching out. We'll get back to you within the business day.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-primary hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 rounded-2xl border border-border bg-white p-8 shadow-sm"
            >
              <h2 className="mb-2 font-['Roboto_Slab'] text-2xl font-bold">Send a Message</h2>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Your full name"
                  className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                    errors.fullName ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="you@company.com"
                  className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Company / Organization <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name (Enter N/A if none)"
                  className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                    errors.company ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                  }`}
                />
                {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
              </div>
              
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  placeholder="How can LIHCI help your organization?"
                  className={`w-full resize-none rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                    errors.message ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                  }`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>
              
              {submitError && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border px-5 py-4">
                <p className="text-sm font-semibold text-foreground">LIHCI Paciano Calamba</p>
                <p className="text-xs text-muted-foreground">National Road, Paciano Rizal, Calamba City</p>
              </div>
              <iframe
                title="LIHCI Paciano Calamba Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.6788234560044!2d121.13361152341298!3d14.213566273254524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63adb7bf609b%3A0x2cf9fbdf2cdeb35b!2sLaguna%20Industrial%20Health%20Clinic%2C%20Incorporated!5e0!3m2!1sen!2sph!4v1719667200000"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border px-5 py-4">
                <p className="text-sm font-semibold text-foreground">LIHCI Pulong Sta. Rosa</p>
                <p className="text-xs text-muted-foreground">Sta. Rosa, Laguna</p>
              </div>
              <iframe
                title="LIHCI Pulong Sta Rosa Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.8472356418947!2d121.08397342341364!3d14.278689373285946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d81c68c36375%3A0x12cda4f68584a425!2sLaguna%20Industrial%20Health%20Clinic%2C%20Inc.%20Sta.%20Rosa!5e0!3m2!1sen!2sph!4v1719667200000"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}