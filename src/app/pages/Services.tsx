    import { Link } from "react-router";
    import { ArrowRight, Check } from "lucide-react";
    import { ImageWithFallback } from "../components/figma/ImageWithFallback";
    // @ts-ignore
    import aboutBanner from "../../imports/Medbannerbg.png";
    // @ts-ignore
    import doBetterBanner from "../../imports/do-things-better_banner.png";
    // @ts-ignore
    import preEmploymentImg from "../../imports/our_services/Pre_Employment_Medical.png";
    // @ts-ignore
    import apeImg from "../../imports/our_services/Annual_Physical_Exam.png";
    // @ts-ignore
    import clinicManningImg from "../../imports/our_services/clinic-manning.png";
    // @ts-ignore
    import diagnosticClinicImg from "../../imports/our_services/Diagnostic_Clinic.png";
    // @ts-ignore
    import specialProceduresImg from "../../imports/our_services/Special_Procedures.png";
    // @ts-ignore
    import multiSpecialtyImg from "../../imports/our_services/Multi-Specialty_Clinic.png";

    const services = [
      {
        title: "Pre-employment Medical Exam",
        desc: "Fast, accurate pre-employment screening to help companies hire with confidence.",
        features: ["Pre-employment database available", "Kind and accommodating medical staff", "Simple and efficient processes", "Accurate and reliable results", "24-hour or less delivery of results"],
        image: preEmploymentImg,
      },
      {
        title: "Annual Physical Exam (APE)",
        desc: "Comprehensive annual exams with efficient paperless processing and clear reporting.",
        features: ["Mobile X-ray vans available", "Efficient paperless APE system", "Graphical presentation and analysis", "Fast delivery of results"],
        image: apeImg,
      },
      {
        title: "Clinic Manning",
        desc: "On-site clinic support staffed by certified physicians and nurses for industrial worksites.",
        features: ["Company physicians and nurses certified in BOSH", "Easy clinic system for secure data storage", "On-site support for industrial health programs"],
        image: clinicManningImg,
      },
      {
        title: "Diagnostic Clinic",
        desc: "Laboratory, imaging, and cardiovascular diagnostics under one roof.",
        features: ["Laboratory services for fast, accurate results", "X-ray imaging and ultrasound examinations", "ECG and cardiovascular screenings"],
        image: diagnosticClinicImg,
      },
      {
        title: "Special Procedures",
        desc: "Advanced assessments for occupational health and cardiac fitness evaluation.",
        features: ["Cardio Station and 2D Echo testing", "Treadmill stress tests", "Audiometry and spirometry assessments"],
        image: specialProceduresImg,
      },
      {
        title: "Multi-specialty Clinic",
        desc: "Integrated specialist consultations covering medical, dental, and optical care.",
        features: ["Specialty consultations across multiple fields", "Dental clinic support", "Optical clinic services", "Integrated care for industrial healthcare needs"],
        image: multiSpecialtyImg,
      },
    ];

    export default function Services() {
      return (
        <>
          {/* PAGE HEADER */}
          <section className="relative border-b border-border px-6 py-20"
            style={{
              backgroundImage: `url(${aboutBanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-slate-950/70" />
            <div className="relative mx-auto max-w-7xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Services</p>
              <h1 className="mt-3 font-['Roboto_Slab'] text-5xl font-bold text-white">LIHCI — Industrial Health Services</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
                A multi-specialty and diagnostic industrial clinic serving companies across Laguna.
              </p>
            </div>
          </section>

          {/* BANNER */}
          <section className="mx-auto max-w-7xl px-6 py-12">
            <div className="overflow-hidden rounded-2xl border border-border">
              <ImageWithFallback
                src={doBetterBanner}
                alt="LIHCI — Do things better"
                className="w-full object-cover"
              />
            </div>
          </section>

          {/* SERVICE GRID */}
          <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, desc, features, image }) => (
              <article key={title} className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="h-40 overflow-hidden bg-secondary">
                  <ImageWithFallback
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <div className="mb-4 h-1 w-10 rounded-full bg-primary" />
                  <h2 className="font-['Roboto_Slab'] text-xl font-bold text-black">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-black/80">{desc}</p>
                  <ul className="mt-5 flex-1 space-y-2">
                    {features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-black/80">
                        <Check size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
                  >
                    Inquire <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </section>

          {/* CTA */}
          <section className="border-t border-border bg-primary px-6 py-14 text-center text-white">
            <h2 className="font-['Roboto_Slab'] text-3xl font-bold">Need a tailored health program?</h2>
            <p className="mt-2 text-white/75">We'll work with your company to design the right package.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary hover:bg-secondary transition-colors">
              Get in Touch <ArrowRight size={14} />
            </Link>
          </section>
        </>
      );
    }
