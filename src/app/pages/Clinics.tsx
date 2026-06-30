import { useState } from "react";
import { MapPin, Phone, Smartphone, Mail, X, ZoomIn } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// @ts-ignore
import aboutBanner from "../../imports/Medbannerbg.png";
// @ts-ignore
import calambaBranchImg from "../../imports/LIHCI_Calamba.png";
// @ts-ignore
import pulongBranchImg from "../../imports/LIHCI-Pulong-StaCruz.png";

const clinics = [
  {
    name: "LIHCI — Paciano",
    address: "National Road, Paciano Rizal, Calamba City, Laguna",
    phones: ["(049) 502-4072", "(049) 508-0847"],
    mobile: "(0916) 669-4979",
    emails: ["info@lihci.com.ph", "admin@lihci.com.ph"],
    image: calambaBranchImg,
  },
  {
    name: "LIHCI — Pulong",
    address: "Pulong Sta. Cruz, Sta. Rosa City, Laguna",
    phones: ["(049) 502-4671", "(049) 508-4681"],
    mobile: "(0975) 796-7991",
    emails: ["info@lihci.com.ph", "admin@lihci.com.ph"],
    image: pulongBranchImg,
  },
];

const amenities = [
  "On-site laboratory", "X-ray & ultrasound",
  "ECG services", "Accessible facilities",
  "Digital records", "Comfortable waiting area",
  "Ample parking", "Courteous medical staff",
];

export default function Clinics() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      {/* PAGE HEADER */}
      <section         className="relative border-b border-border px-6 py-20"
        style={{
          backgroundImage: `url(${aboutBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Clinics</p>
          <h1 className="mt-3 font-['Roboto_Slab'] text-5xl font-bold text-white">A Multi-Specialty Diagnostic Industrial Clinic</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            Two fully equipped branches in Laguna sharing the same standard of service.
          </p>
        </div>
      </section>

      {/* CLINIC CARDS */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2">
        {clinics.map(({ name, address, phones, mobile, emails, image }) => (
          <div key={name} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm flex flex-col justify-between transition hover:border-primary/30 hover:shadow-sm">
            <div>
              {/* CLICKABLE BRANCH IMAGE CONTAINER */}
              <button
                onClick={() => setActiveImage(image)}
                className="group relative block h-52 w-full overflow-hidden bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary"
                title="Click to view full image"
              >
                <ImageWithFallback
                  src={image}
                  alt={`${name} branch`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                
                {/* HOVER OVERLAY PREVIEW */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-lg border border-border">
                    <ZoomIn size={14} className="text-primary" />
                    <span>View Image</span>
                  </div>
                </div>
              </button>

              <div className="p-8 pb-0">
                <h2 className="font-['Roboto_Slab'] text-2xl font-bold">{name}</h2>
                <div className="mt-5 space-y-4">
                  
                  {/* Address Row */}
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                    <span>{address}</span>
                  </div>
                  
                  {/* Landline Row */}
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                    <p>{phones.join(" · ")}</p>
                  </div>

                  {/* Mobile Row */}
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Smartphone size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                    <span>{mobile}</span>
                  </div>

                  {/* Emails Row */}
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Mail size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                    <div className="flex flex-col gap-0.5">
                      {emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className="hover:text-primary transition-colors">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="p-8 pt-6">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
              >
                Book at this location
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* FULLSCREEN LIGHTBOX PREVIEW */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          onClick={() => setActiveImage(null)}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 z-[110] rounded-full bg-black/40 p-3 text-white hover:bg-black/60 transition-colors shadow-lg border border-white/10"
            aria-label="Close preview"
          >
            <X size={24} />
          </button>

          {/* LIGHTBOX PANEL CONTAINER */}
          <div 
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-2xl bg-white p-2 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Clinic Full Preview"
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* AMENITIES */}
      <section className="border-y border-border bg-muted px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Facilities</p>
            <h2 className="mt-2 font-['Roboto_Slab'] text-3xl font-bold text-black">What you'll find at every LIHCI branch.</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {amenities.map(a => (
              <div key={a} className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5">
                <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-sm text-foreground">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP LOCATION */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Find Us</p>
          <h2 className="mt-2 font-['Roboto_Slab'] text-3xl font-bold">Locate our clinics.</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Calamba Branch Map */}
          <div className="flex flex-col rounded-2xl border border-border overflow-hidden">
            <iframe
              title="LIHCI Paciano Calamba Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.6788234560044!2d121.13361152341298!3d14.213566273254524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63adb7bf609b%3A0x2cf9fbdf2cdeb35b!2sLaguna%20Industrial%20Health%20Clinic%2C%20Incorporated!5e0!3m2!1sen!2sph!4v1719667200000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
            <div className="p-6 bg-card">
              <h3 className="font-['Roboto_Slab'] text-lg font-bold text-foreground">LIHCI — Paciano</h3>
              <p className="text-xs text-muted-foreground mt-2">National Road, Paciano Rizal, Calamba City, Laguna</p>
              <a
                href="https://maps.app.goo.gl/aGG7tfU7KynayE24A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold text-primary hover:underline mt-3"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Sta. Rosa Branch Map */}
          <div className="flex flex-col rounded-2xl border border-border overflow-hidden">
            <iframe
              title="LIHCI Pulong Sta Rosa Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.8472356418947!2d121.08397342341364!3d14.278689373285946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d81c68c36375%3A0x12cda4f68584a425!2sLaguna%20Industrial%20Health%20Clinic%2C%20Inc.%20Sta.%20Rosa!5e0!3m2!1sen!2sph!4v1719667200000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
            <div className="p-6 bg-card">
              <h3 className="font-['Roboto_Slab'] text-lg font-bold text-foreground">LIHCI — Pulong</h3>
              <p className="text-xs text-muted-foreground mt-2">Pulong Sta. Cruz, Sta. Rosa City, Laguna</p>
              <a
                href="https://www.google.com/maps/dir//Laguna+Industrial+Health+Clinic,+Inc.,+73HM%2B5JP,+Santa+Rosa+-+Tagaytay+Rd,+Pulong+Santa+Cruz,+City+of+Santa+Rosa,+4026+Laguna/@14.333975,121.0548224,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397d81c68c36375:0x12cda4f68584a425!2m2!1d121.0839734!2d14.2786893?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold text-primary hover:underline mt-3"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}