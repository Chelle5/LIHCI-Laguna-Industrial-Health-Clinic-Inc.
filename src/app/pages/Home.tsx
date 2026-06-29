import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";

// Specialties PNG Imports
// @ts-ignore
import branchImage from "../../imports/Branch_image.jpg";
// @ts-ignore
import logoQuote from "../../imports/lihci-logo-quote.png";
// @ts-ignore
import medicalVideo from "../../imports/Medical-Vid.mp4";
// @ts-ignore
import internalMedPng from "../../imports/specialties/Internal Medicine.png";
// @ts-ignore
import surgeryPng from "../../imports/specialties/Surgery.png";
// @ts-ignore
import pediaPng from "../../imports/specialties/Pediatrics.png";
// @ts-ignore
import cardioPng from "../../imports/specialties/Cardiology.png";
// @ts-ignore
import entPng from "../../imports/specialties/Ent.png";
// @ts-ignore
import ophthaPng from "../../imports/specialties/opthalmology.png";
// @ts-ignore
import orthoPng from "../../imports/specialties/Orthopedics.png";
// @ts-ignore
import neuroPng from "../../imports/specialties/Neurology.png";
// @ts-ignore
import obPng from "../../imports/specialties/obgyne.png";
// @ts-ignore
import radioPng from "../../imports/specialties/Radiology.png";
// @ts-ignore
import dermaPng from "../../imports/specialties/Dermatology.png";

// @ts-ignore
import accuratePng from "../../imports/home_icon/AccurateResult.png"; 
// @ts-ignore
import manningPng from "../../imports/home_icon/ClinicManning.png";   
// @ts-ignore
import corporatePng from "../../imports/home_icon/CorporateCare.png"; 

const specialties = [
  { name: "Internal Medicine", icon: internalMedPng },
  { name: "Surgery", icon: surgeryPng },
  { name: "Pediatrics", icon: pediaPng },
  { name: "Cardiology", icon: cardioPng }, 
  { name: "Pulmonology", icon: pediaPng },
  { name: "ENT", icon: entPng },
  { name: "Ophthalmology", icon: ophthaPng },
  { name: "Orthopedics", icon: orthoPng },
  { name: "Neurology", icon: neuroPng },
  { name: "OB-Gyne", icon: obPng },
  { name: "Radiology", icon: radioPng },
  { name: "Dermatology", icon: dermaPng },
];


const features = [
  {
    icon: accuratePng,
    title: "Accurate Results",
    desc: "Reliable diagnostic reporting for industrial healthcare programs."
  },
  {
    icon: manningPng,
    title: "Clinic Manning",
    desc: "Company physicians and BOSH-certified nurses for workplace clinics."
  },
  {
    icon: corporatePng,
    title: "Corporate Care",
    desc: "Efficient pre-employment and annual exams for companies in Laguna."
  }
];

const stats = [
  { value: 22, suffix: "+", label: "Years in service" },
  { value: 2, label: "Clinic branches" },
  { value: 12, label: "Specialties" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-center px-6 py-20 lg:px-14 lg:py-28">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              LIHCI
            </p>
            <h1 className="font-['Roboto_Slab'] text-5xl font-bold leading-[1.1] text-foreground md:text-6xl">
              Laguna Industrial<br />
              <span className="text-primary">Health Clinic, Inc.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              LIHCI is a multi-specialty and diagnostic industrial clinic serving pre-employment exams, annual physical exams, clinic manning, and specialty consultations across Laguna.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                Our Services <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>

            <div className="mt-14 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-['Roboto_Slab'] text-2xl font-bold text-primary">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix ?? ""} />
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative hidden h-[580px] lg:block">
            <ImageWithFallback
              src={branchImage}
              alt="LIHCI clinic branch"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-2xl bg-card border border-border">
          <ImageWithFallback
            src={branchImage}
            alt="LIHCI branch"
            className="h-72 w-full object-cover"
          />
          <div className="p-7">
            <ImageWithFallback
              src={logoQuote}
              alt="LIHCI logo"
              className="max-h-16 object-contain"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">About LIHCI</p>
          <h2 className="mt-3 font-['Roboto_Slab'] text-4xl font-bold leading-tight">
            Serving Laguna<br />since 2002.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Established on September 12, 2002 in Paciano Rizal, Calamba City, LIHCI has grown from a single out-patient diagnostic clinic into a multi-specialty industrial health institution with two branches across Laguna.
          </p>
          <div className="mt-6 space-y-2.5">
            {["Pre-employment & annual medical exams", "Clinic manning for industrial companies", "Multi-specialty and diagnostic services"].map(i => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <Check size={14} className="text-primary flex-shrink-0" />
                <span className="text-foreground">{i}</span>
              </div>
            ))}
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Read our story <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="border-y border-border bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Multi-Specialty Clinic</p>
              <h2 className="mt-2 font-['Roboto_Slab'] text-3xl font-bold">Specialties we offer.</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 mt-2 md:mt-0">
              All services <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {specialties.map(({ name, icon }) => (
              <div key={name} className="rounded-xl border border-border bg-white px-4 py-5 text-center transition-all hover:border-primary/40 hover:shadow-sm flex flex-col items-center justify-center">
                <img 
                  src={icon} 
                  alt={`${name} icon`} 
                  className="mb-3 h-8 w-8 object-contain" 
                />
                <p className="text-sm font-medium text-foreground">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Why Choose LIHCI</p>
          <h2 className="mt-2 font-['Roboto_Slab'] text-3xl font-bold">What we do best.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/40 hover:shadow-md transition-all">
              {/* 3. Pinalitan ang Lucide Icon ng <img> tag */}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <img 
                  src={icon} 
                  alt={`${title} icon`} 
                  className="h-6 w-6 object-contain" 
                />
              </div>
              <h3 className="font-['Roboto_Slab'] font-bold text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-['Roboto_Slab'] text-2xl font-bold text-white">Ready to schedule a medical exam?</h2>
            <p className="mt-1 text-sm text-white/75">Reach out and we'll respond within the business day.</p>
          </div>
          <Link to="/contact" className="flex-shrink-0 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary hover:bg-secondary transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}