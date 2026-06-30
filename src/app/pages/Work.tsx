import { useState, FormEvent, ChangeEvent } from "react";
import { Check } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { apiUrl, fetchJson } from "../lib/api";
// @ts-ignore
import logoText from "../../imports/LIHCI-LOGO-TEXT-BLACK.svg";
// @ts-ignore
import aboutBanner from "../../imports/Medbannerbg.png";

const positions = [
  "Medical Technologist",
  "Nurse",
  "Radiologic Technologist",
  "Clinic Staff",
  "Others",
];

const requirements = [
  "TOR",
  "Diploma",
  "ID Picture — 2 pcs 2×2, 2 pcs 1×1",
  "Board results / certificate / license",
  "Relevant training certificates",
  "NSO birth certificate / Marriage certificate (if married)",
  "Resume and COE from previous employers",
  "SSS / PhilHealth / PagIBIG / TIN IDs",
  "NBI / Police / Barangay clearance",
];

interface FormFields {
  firstName: string;
  middleName: string;
  lastName: string;
  age: string;
  gender: string;
  civilStatus: string;
  email: string;
  contactNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  notes: string;
  otherPosition: string;
}

interface WorkExperience {
  workPosition: string;
  companyName: string;
  jobDescription: string;
  serviceStart: string;
  serviceEnd: string;
  additionalHistory: string;
}

interface FormErrors {
  pos?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  gender?: string;
  civilStatus?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  file?: string;
  otherPosition?: string;
}

interface WorkError {
  date?: string;
}

export default function Work() {
  const [pos, setPos] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormFields>({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    gender: "",
    civilStatus: "",
    email: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
    otherPosition: "",
  });

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    {
      workPosition: "",
      companyName: "",
      jobDescription: "",
      serviceStart: "",
      serviceEnd: "",
      additionalHistory: "",
    },
  ]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [workErrors, setWorkErrors] = useState<WorkError[]>([]);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
  const currentDay = String(today.getDate()).padStart(2, "0");
  const todayStr = `${currentYear}-${currentMonth}-${currentDay}`;

  const handleInputChange = (key: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleWorkChange = (index: number, field: keyof WorkExperience, value: string) => {
    const newWorks = [...workExperiences];
    newWorks[index][field] = value;

    if (field === "additionalHistory" && value === "Yes" && index === workExperiences.length - 1) {
      newWorks.push({
        workPosition: "",
        companyName: "",
        jobDescription: "",
        serviceStart: "",
        serviceEnd: "",
        additionalHistory: "",
      });
    }

    if (field === "additionalHistory" && value === "No" && index < workExperiences.length - 1) {
      newWorks.splice(index + 1);
    }

    setWorkExperiences(newWorks);

    if (workErrors[index]) {
      const newWorkErrors = [...workErrors];
      newWorkErrors[index] = {};
      setWorkErrors(newWorkErrors);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setErrors((prev) => ({ ...prev, file: undefined }));
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    const newWorkErrors: WorkError[] = [];
    let hasWorkError = false;

    if (!pos) newErrors.pos = "Please select a position";
    if (pos === "Others" && !formData.otherPosition.trim()) {
      newErrors.otherPosition = "Please specify the position you are applying for";
    }

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.civilStatus) newErrors.civilStatus = "Civil status is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (isNaN(Number(formData.contactNumber.trim()))) {
      newErrors.contactNumber = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

    if (!file) {
      newErrors.file = "Please attach your resume or relevant documents";
    }

    workExperiences.forEach((work, index) => {
      const wErr: WorkError = {};
      if (work.serviceStart && work.serviceEnd) {
        if (work.serviceStart > work.serviceEnd) {
          wErr.date = "End date cannot be earlier than start date.";
          hasWorkError = true;
        }
      }
      newWorkErrors[index] = wErr;
    });

    if (Object.keys(newErrors).length > 0 || hasWorkError) {
      setErrors(newErrors);
      setWorkErrors(newWorkErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("middleName", formData.middleName);
      form.append("lastName", formData.lastName);
      form.append("age", formData.age);
      form.append("gender", formData.gender);
      form.append("civilStatus", formData.civilStatus);
      form.append("position", pos === "Others" ? formData.otherPosition : pos);
      form.append("email", formData.email);
      form.append("contactNumber", formData.contactNumber);
      form.append("address", formData.address);
      form.append("city", formData.city);
      form.append("state", formData.state);
      form.append("zipCode", formData.zipCode);
      form.append("notes", formData.notes);
      form.append("workExperiences", JSON.stringify(workExperiences));
      if (file) {
        form.append("resume", file);
      }

      const { response, data: result } = await fetchJson(apiUrl("/apply"), {
        method: "POST",
        body: form,
      });

      if (!response.ok || !result.success) {
        const message = result.error || "Unable to submit your application right now.";
        throw new Error(message.startsWith("<") ? "Unexpected non-JSON backend response. Check your API URL or backend deployment." : message);
      }

      setSubmitted(true);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        age: "",
        gender: "",
        civilStatus: "",
        email: "",
        contactNumber: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        notes: "",
        otherPosition: "",
      });
      setFile(null);
      setPos("");
      setAgreed(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your application right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative border-b border-border px-6 py-20"
        style={{
          backgroundImage: `url(${aboutBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Careers</p>
          <h1 className="mt-3 font-['Roboto_Slab'] text-5xl font-bold text-white">Work With Us</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            LIHCI is always looking for dedicated professionals in healthcare and operations. Apply online below.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_1.8fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-8">
          <div className="mb-6 flex justify-center">
            <ImageWithFallback src={logoText} alt="LIHCI Logo" className="max-h-16 object-contain" />
          </div>
          <h2 className="font-['Roboto_Slab'] text-xl font-bold">Applicant Requirements</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Applicants must be of legal age. Please prepare the following documents:
          </p>
          <ul className="mt-5 space-y-2.5">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        </aside>

        {submitted ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-12 text-center h-96">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <Check size={24} className="text-primary" />
            </div>
            <h3 className="mb-2 font-['Roboto_Slab'] text-2xl font-bold">Application Submitted</h3>
            <p className="max-w-xs text-muted-foreground mb-6">Thank you for your interest in joining LIHCI. We've received your application and will review it shortly.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <h2 className="font-['Roboto_Slab'] text-2xl font-bold mb-6">Online Application</h2>

            <div className="grid gap-8">
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Position applying for <span className="text-red-500">*</span>
                </label>
                <select
                  value={pos}
                  onChange={(e) => {
                    setPos(e.target.value);
                    setErrors((prev) => ({ ...prev, pos: undefined, otherPosition: undefined }));
                  }}
                  className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all appearance-none ${
                    errors.pos ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                  }`}
                >
                  <option value="" disabled>-- Select --</option>
                  {positions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.pos && <p className="mt-1 text-xs text-red-500">{errors.pos}</p>}
              </div>

              {pos === "Others" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Please specify position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.otherPosition}
                    onChange={(e) => handleInputChange("otherPosition", e.target.value)}
                    placeholder="Enter your position title"
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.otherPosition ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.otherPosition && <p className="mt-1 text-xs text-red-500">{errors.otherPosition}</p>}
                </div>
              )}
            </div>

            <hr className="border-border" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="First Name *"
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.firstName ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                </div>
                <div>
                  <input
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                    placeholder="Middle Name"
                    className="w-full rounded-xl border border-border bg-input-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Last Name *"
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.lastName ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <input
                    type="tel"
                    value={formData.age}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      handleInputChange("age", onlyNumbers);
                    }}
                    placeholder="Age *"
                    maxLength={2}
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.age ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                </div>
                <div>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all appearance-none ${
                      errors.gender ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  >
                    <option value="" disabled>Gender *</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
                </div>
                <div>
                  <select
                    value={formData.civilStatus}
                    onChange={(e) => handleInputChange("civilStatus", e.target.value)}
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all appearance-none ${
                      errors.civilStatus ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  >
                    <option value="" disabled>Civil Status *</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Separated">Separated</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  {errors.civilStatus && <p className="mt-1 text-xs text-red-500">{errors.civilStatus}</p>}
                </div>
              </div>
            </div>

            <hr className="border-border" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Contact & Address</h3>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Email Address *"
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.email ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      handleInputChange("contactNumber", onlyNumbers);
                    }}
                    placeholder="Phone / Mobile *"
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.contactNumber ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.contactNumber && <p className="mt-1 text-xs text-red-500">{errors.contactNumber}</p>}
                </div>
              </div>

              <div>
                <input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Address Line *"
                  className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                    errors.address ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                  }`}
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <input
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City *"
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.city ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>
                <div>
                  <input
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State *"
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.state ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    maxLength={4}
                    value={formData.zipCode}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      handleInputChange("zipCode", onlyNumbers);
                    }}
                    placeholder="Zip Code *"
                    className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                      errors.zipCode ? "border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                    }`}
                  />
                  {errors.zipCode && <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>}
                </div>
              </div>
            </div>

            <hr className="border-border" />

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
                <p className="mt-1 text-sm text-muted-foreground">(Please start with your most recent work. If no work experience, indicate "N/A")</p>
              </div>
              
              {workExperiences.map((work, index) => (
                <div key={index} className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 relative">
                  {workExperiences.length > 1 && (
                    <h4 className="text-sm font-semibold text-primary">Experience #{index + 1}</h4>
                  )}
                  
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      value={work.workPosition}
                      onChange={(e) => handleWorkChange(index, "workPosition", e.target.value)}
                      placeholder="Position / Title"
                      className="w-full rounded-xl border border-border bg-input-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                    <input
                      value={work.companyName}
                      onChange={(e) => handleWorkChange(index, "companyName", e.target.value)}
                      placeholder="Company Name"
                      className="w-full rounded-xl border border-border bg-input-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <textarea
                    value={work.jobDescription}
                    onChange={(e) => handleWorkChange(index, "jobDescription", e.target.value)}
                    rows={3}
                    placeholder="Job Description"
                    className="w-full rounded-xl border border-border bg-input-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  />

                  <div className="grid gap-3 md:grid-cols-2 items-start">
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                        Service Period Start
                      </label>
                      <input
                        type="date"
                        value={work.serviceStart}
                        max={work.serviceEnd || todayStr}
                        onChange={(e) => handleWorkChange(index, "serviceStart", e.target.value)}
                        className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                          workErrors[index]?.date ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }`}
                      />
                      {workErrors[index]?.date && (
                        <p className="mt-2 text-xs text-red-500">{workErrors[index].date}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                        Service Period End
                      </label>
                      <input
                        type="date"
                        value={work.serviceEnd}
                        min={work.serviceStart}
                        max={todayStr}
                        onChange={(e) => handleWorkChange(index, "serviceEnd", e.target.value)}
                        className={`w-full rounded-xl border bg-input-background px-4 py-3 text-sm outline-none transition-all ${
                          workErrors[index]?.date ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Additional work history?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name={`additionalHistory-${index}`}
                          value="Yes"
                          checked={work.additionalHistory === "Yes"}
                          onChange={(e) => handleWorkChange(index, "additionalHistory", e.target.value)}
                          className="accent-primary"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name={`additionalHistory-${index}`}
                          value="No"
                          checked={work.additionalHistory === "No"}
                          onChange={(e) => handleWorkChange(index, "additionalHistory", e.target.value)}
                          className="accent-primary"
                        />
                        No
                      </label>
                    </div>
                  </div>
                  
                  {index < workExperiences.length - 1 && (
                    <div className="mt-6 mb-2 border-b border-dashed border-border" />
                  )}
                </div>
              ))}
            </div>

            <hr className="border-border" />

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Attach Resume / Documents <span className="text-red-500">*</span>
                </label>
                <div className={`rounded-xl border border-dashed p-4 text-center text-sm text-muted-foreground bg-input-background ${errors.file ? "border-red-500" : "border-border"}`}>
                  <input type="file" onChange={handleFileChange} className="w-full text-sm cursor-pointer" />
                </div>
                {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  I certify that the information provided above is true and accurate to the best of my knowledge. <span className="text-red-500">*</span>
                </span>
              </label>

              {submitError && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={!agreed || isSubmitting}
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </form>
        )}
      </section>
    </>
  );
}