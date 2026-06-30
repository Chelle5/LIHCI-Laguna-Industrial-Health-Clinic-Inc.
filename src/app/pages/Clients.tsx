import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// @ts-ignore
import aboutBanner from "../../imports/Medbannerbg.png";
// @ts-ignore
import corporateClients from "../../imports/Corporate-Clients.jpg";
// @ts-ignore
import hmoClients from "../../imports/HMO-Clients.jpg";
// @ts-ignore
import clinicManningClients from "../../imports/Clinic-Manning-Clients.jpg";
// @ts-ignore
import hmoLogos from "../../imports/client-logos-hmo_2_orig.jpg";

const cats = [
  { title: "Our Corporate Clients", img: corporateClients, alt: "Corporate partner logos" },
  { title: "HMO Accreditation", img: hmoClients, alt: "HMO accreditation logos" },
  { title: "Clinic Manning Clients", img: clinicManningClients, alt: "Clinic manning client logos" },
  { title: "APE Clients", img: hmoLogos, alt: "APE and HMO client logos" },
];

export default function Clients() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Clients</p>
          <h1 className="mt-3 font-['Roboto_Slab'] text-5xl font-bold text-white">LIHCI — Satisfied Clients</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            LIHCI works with companies across Laguna to provide dependable pre-employment and annual medical exam services with timely diagnostics and clear reporting.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-border px-6">
          {[["200+", "Corporate Partners"], ["Daily", "Medical Exams Processed"], ["2002", "Serving clients since"]].map(([n, l]) => (
            <div key={l} className="py-10 text-center">
              <p className="font-['Roboto_Slab'] text-4xl font-bold text-primary">{n}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-2">
        {cats.map(({ title, img, alt }) => (
          <div key={title} className="overflow-hidden rounded-2xl border border-border bg-white flex flex-col justify-between transition hover:border-primary/40 hover:shadow-md">
            
            <button
              onClick={() => setActiveImage(img)}
              className="group relative flex min-h-56 w-full items-center justify-center bg-white p-6 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              title="Click to view full image"
            >
              <ImageWithFallback
                src={img}
                alt={alt}
                className="max-h-64 w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-lg border border-border">
                  <ZoomIn size={14} className="text-primary" />
                  <span>Click to view</span>
                </div>
              </div>
            </button>

            <div className="border-t border-border px-7 py-5 bg-white">
              <h2 className="font-['Roboto_Slab'] text-xl font-bold text-foreground">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Trusted industrial healthcare partnerships.</p>
            </div>

          </div>
        ))}
      </section>

      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          onClick={() => setActiveImage(null)}
        >
          
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 z-[110] rounded-full bg-black/40 p-3 text-white hover:bg-black/60 transition-colors shadow-lg border border-white/10"
            aria-label="Close preview"
          >
            <X size={24} />
          </button>


          <div 
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-2xl bg-white p-4 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Fullscreen Preview"
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}


      <section className="border-t border-border bg-muted px-6 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Join Our Network</p>
        <h2 className="mt-2 font-['Roboto_Slab'] text-3xl font-bold">Interested in a partnership?</h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">Reach out to discuss how LIHCI can support your company's occupational health needs.</p>
        <a href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
          Contact Us
        </a>
      </section>
    </>
  );
}