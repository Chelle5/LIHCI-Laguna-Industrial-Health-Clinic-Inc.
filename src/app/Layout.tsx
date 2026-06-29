import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { Menu, X, Phone, MapPin, Clock, Mail, Facebook, Linkedin } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
// @ts-ignore
import logoText from "../imports/LIHCI-LOGO.png";
// @ts-ignore
import footerBg from "../imports/LIHCI_Banner.jpg";
// @ts-ignore
import blacklogoText from "../imports/LIHCI-LOGO-TEXT-BLACK.svg";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Clients", to: "/clients" },
  { label: "Clinics", to: "/clinics" },
  { label: "Work With Us", to: "/work" },
  { label: "Contact Us", to: "/contact" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <ImageWithFallback
          src={light ? logoText : blacklogoText}
          alt="LIHCI logo"
          className="h-11 w-32 object-contain"
        />
      </div>
      {light && <p className="hidden text-xs text-white/100 sm:block">Laguna Industrial Health Clinic, Inc.</p>}
    </div>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const item = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2.5 text-sm font-medium transition-all text-muted-foreground hover:text-primary ${
      isActive ? "text-primary" : ""
    } before:absolute before:bottom-0 before:left-4 before:h-0.5 before:bg-primary before:transition-all before:duration-300 ${
      isActive ? "before:w-[calc(100%-32px)]" : "before:w-0 hover:before:w-[calc(100%-32px)]"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-background font-['Instrument_Sans'] text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-[linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7)),url('/images/bg.jpg')] bg-cover bg-center">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <Link to="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={item}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/contact" className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
              Message Us
            </Link>
          </div>

          <button
            className="inline-flex items-center justify-center p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-white/95 px-5 py-5 shadow-lg lg:hidden">
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)} className={item}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Need an appointment?</p>
              <p className="mt-1">Call us at (049) 502-4072, (049) 508-0847 or send a message for fast assistance.</p>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <footer 
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/78" />
        
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/90">
              Laguna Industrial Health Clinic, Inc. is committed to deliver good
              service and on-time results for companies across Laguna.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h4>

            <div className="grid gap-2">
              {navLinks.slice(1).map((link) => (
                <Link
                  className="text-sm text-white/80 transition-colors hover:text-primary"
                  to={link.to}
                  key={link.to}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Reach Us
            </h4>

            {/* Inayos ang flex alignment ng mga detalye rito gamit ang items-start at mt-0.5 */}
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-sm text-white/80">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>National Road, Paciano Rizal, Calamba City, Laguna</span>
              </p>

              <p className="flex items-start gap-2 text-sm text-white/80">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>(049) 502-4072</span>
              </p>

              <p className="flex items-start gap-2 text-sm text-white/80">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>(0916) 669-4979</span>
              </p>

              <p className="flex items-start gap-2 text-sm text-white/80">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>Mon–Sat, 8:00 AM–5:00 PM</span>
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:info@lihci.com.ph"
                  className="flex items-start gap-2 text-sm text-white/80"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>info@lihci.com.ph</span>
                </a>
                <a
                  href="mailto:admin@lihci.com.ph"
                  className="flex items-start gap-2 text-sm text-white/80"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>admin@lihci.com.ph</span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Newsletter
            </h4>

            <p className="text-sm text-white/80">
              For latest update and news subscribe now.
            </p>

            <div className="mt-4 flex rounded-full border border-white/30 bg-white/10 p-1">
              <input
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/50"
                placeholder="Email address"
              />

              <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/20 px-5 py-5 text-xs text-white/70 sm:flex-row">
          <span>© Copyright 2026 LIHCI. All rights reserved.</span>

          {/* Social Media Section na may gumaganang Links */}
          <span className="flex gap-4">
            <a 
              href="https://www.facebook.com/LIHCIclinics" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Visit our Facebook page"
              className="text-white/70 hover:text-primary transition-colors"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="https://linkedin.com/company/iyong-company-url" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Visit our LinkedIn profile"
              className="text-white/70 hover:text-primary transition-colors"
            >
              <Linkedin size={16} />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}