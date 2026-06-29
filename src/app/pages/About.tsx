import { Check } from "lucide-react";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
// @ts-ignore
import aboutBanner from "../../imports/Medbannerbg.png";
// @ts-ignore
import logoQuote from "../../imports/lihci-logo-quote.png";
// @ts-ignore
import branchImage from "../../imports/Branch_image.jpg";

const milestones = [
  { year: "2002", text: "LIHCI established on September 12 at San Antonio Village, Paciano Rizal, Calamba City — operating as an out-patient diagnostic clinic for pre-employment and annual medical exams." },
  { year: "2003", text: "On November 29, LIHCI opened its first branch at Carlos Arcade, Pulong Sta. Cruz, Sta. Rosa, Laguna." },
  { year: "2004", text: "In August, the original clinic transferred to a larger site at National Road, Paciano Rizal, Calamba City." },
  { year: "2009", text: "The Sta. Rosa branch transferred to its own lot and building at Mercado Village, opening its first Multi-Specialty Clinic." },
];

const statsData = [
  { number: 2002, label: "Year Established", animated: false },
  { number: 2, label: "Clinic Branches", animated: true },
  { number: 12, label: "Specialties", animated: true },
  { number: 22, label: "Years of Service", animated: true },
];

export default function About() {
  return (
    <>
      {/* PAGE HEADER */}
      <section
        className="relative border-b border-border px-6 py-20"
        style={{
          backgroundImage: `url(${aboutBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">About Us</p>
          <h1 className="mt-3 font-['Roboto_Slab'] text-5xl font-bold text-white">LIHCI — Management Team</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            Over 22 years of trusted industrial health services across Laguna.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Beginnings</p>
          <h2 className="mt-3 font-['Roboto_Slab'] text-4xl font-bold leading-tight">A clinic built<br />on reliability.</h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            LIHCI was established on September 12, 2002 at San Antonio Village, Paciano Rizal, Calamba City. It operated primarily as an out-patient diagnostic clinic catering to the pre-employment and annual medical exam needs of companies in and around Laguna.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            Over two decades, LIHCI has grown into a multi-specialty industrial health institution — expanding its facilities, services, and reach across the region while maintaining its founding commitment to timely and accurate results.
          </p>

          {/* Timeline */}
          <div className="mt-10 space-y-5">
            {milestones.map(({ year, text }) => (
              <div key={year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {year.slice(2)}
                  </div>
                  <div className="mt-1 flex-1 w-px bg-border" />
                </div>
                <div className="pb-5 pt-1">
                  <p className="text-xs font-semibold text-primary tracking-wide">{year}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="overflow-hidden rounded-2xl border border-border">
            <ImageWithFallback
              src={branchImage}
              alt="LIHCI branch"
              className="h-64 w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-8">
            <ImageWithFallback
              src={logoQuote}
              alt="LIHCI logo with quote"
              className="max-h-32 object-contain"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="border-y border-border bg-muted px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Purpose</p>
            <h2 className="mt-2 font-['Roboto_Slab'] text-4xl font-bold">Mission & Vision</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-primary p-8 text-white">
              <h3 className="font-['Roboto_Slab'] text-2xl font-bold">Mission</h3>
              <div className="mt-2 h-0.5 w-10 rounded bg-white/30" />
              <p className="mt-5 leading-7 text-white/85">
                Through continuous improvement in our processes and development of our staff, we will satisfy our clients by providing products and services that are of good quality, of reasonable price and always delivered on time.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-8">
              <h3 className="font-['Roboto_Slab'] text-2xl font-bold text-foreground">Vision</h3>
              <div className="mt-2 h-0.5 w-10 rounded bg-primary" />
              <p className="mt-5 leading-7 text-muted-foreground">
                We shall become the most preferred industrial clinic and medical provider in the region.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
                <Check size={15} className="text-primary flex-shrink-0" />
                <p className="text-sm text-primary font-medium">Committed to excellence in industrial healthcare</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {statsData.map(({ number, label, animated }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-7 text-center">
              <p className="font-['Roboto_Slab'] text-4xl font-bold text-primary">
                {animated ? (
                  <AnimatedNumber value={number} suffix="+" />
                ) : (
                  number
                )}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
