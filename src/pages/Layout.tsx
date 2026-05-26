import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import ScrollToTop from "@/scripts/ScrollToTop";
import { company } from "@/content/site";
import { ArrowUpRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";

const navigation = [
  { path: "/", label: "Start" },
  { path: "/services", label: "Usługi" },
  { path: "/about", label: "Studio" },
  { path: "/contact", label: "Kontakt" },
];

const Logo = ({ inverted = false }: { inverted?: boolean }) => (
  <Link to="/" className="group inline-flex items-center gap-3">
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium tracking-tight transition ${
        inverted ? "bg-white text-neutral-950" : "bg-neutral-950 text-white"
      }`}
    >
      V
    </span>
    <span className={`flex flex-col leading-tight ${inverted ? "text-white" : "text-neutral-950"}`}>
      <span className="text-[15px] font-medium">{company.name}</span>
      <span className={`text-[11px] uppercase tracking-[0.18em] ${inverted ? "text-neutral-400" : "text-neutral-500"}`}>
        Studio
      </span>
    </span>
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-all duration-500 ${
          isScrolled ? "mt-2 max-w-5xl px-3 sm:mt-3" : "mt-4 max-w-6xl px-4 sm:mt-5"
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "rounded-full border border-neutral-200/80 bg-white/80 px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] backdrop-blur-xl"
              : "rounded-full border border-neutral-200/70 bg-white/75 px-5 py-3.5 shadow-[0_10px_32px_-16px_rgba(15,23,42,0.12)] backdrop-blur-lg lg:px-7"
          }`}
        >
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "text-neutral-950"
                      : "text-neutral-500 hover:text-neutral-950"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-neutral-100" />
                  )}
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phone}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-300 lg:hidden"
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </div>

      <div
        className={`mx-auto overflow-hidden px-3 transition-all duration-300 lg:hidden ${
          isMenuOpen ? "mt-2 max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ maxWidth: "32rem" }}
      >
        <div className="rounded-3xl border border-neutral-200/80 bg-white/95 p-3 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.2)] backdrop-blur-xl">
          <div className="flex flex-col">
            {navigation.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base transition ${
                    isActive
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {label}
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </Link>
              );
            })}
          </div>

          <div className="mt-3 grid gap-2 border-t border-neutral-200 pt-3">
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-950 px-4 py-3.5 text-base font-medium text-white"
            >
              <Phone className="h-4 w-4" />
              {company.phone}
            </a>
            <a
              href={company.emailHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 px-4 py-3.5 text-base font-medium text-neutral-800"
            >
              <Mail className="h-4 w-4" />
              {company.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const MobileStickyCTA = () => (
  <div className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
    <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-neutral-200/80 bg-white/95 p-1.5 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <a
        href={company.phoneHref}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-3 text-sm font-medium text-white"
      >
        <Phone className="h-4 w-4" />
        Zadzwoń
      </a>
      <a
        href={company.emailHref}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-neutral-700"
      >
        <Mail className="h-4 w-4" />
        Email
      </a>
    </div>
  </div>
);

const Footer = () => (
  <footer className="border-t border-neutral-200 bg-white pb-32 pt-16 sm:pb-16 sm:pt-20">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600">
            Strony internetowe, pełny branding, aplikacje webowe, automatyzacje
            i dedykowane narzędzia AI &mdash; projektujemy je pod realny cel i konkretny proces w firmie.
          </p>
          <a
            href={company.phoneHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <Phone className="h-3.5 w-3.5" />
            {company.phone}
          </a>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            Serwis
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/" className="text-neutral-700 transition hover:text-neutral-950">
                Strona główna
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-neutral-700 transition hover:text-neutral-950">
                Usługi
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-neutral-700 transition hover:text-neutral-950">
                Studio
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-neutral-700 transition hover:text-neutral-950">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            Kontakt
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 text-neutral-700 transition hover:text-neutral-950"
              >
                <Phone className="h-3.5 w-3.5 text-neutral-400" />
                {company.phone}
              </a>
            </li>
            <li>
              <a
                href={company.emailHref}
                className="inline-flex items-center gap-2 break-all text-neutral-700 transition hover:text-neutral-950"
              >
                <Mail className="h-3.5 w-3.5 text-neutral-400" />
                {company.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-neutral-700">
              <MapPin className="h-3.5 w-3.5 text-neutral-400" />
              {company.location}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            Godziny
          </p>
          <p className="mt-5 text-sm leading-6 text-neutral-700">{company.hours}</p>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Odpowiadamy zwykle w ten sam dzień.
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {company.name}. Wszystkie prawa zastrzeżone.</p>
        <p>Zaprojektowane i zbudowane przez Vinseq Studio.</p>
      </div>
    </div>
  </footer>
);

const Layout = () => {
  const location = useLocation();
  const routes: Record<string, string> = {
    "/": "Vinseq Studio - Strony, branding, aplikacje i AI",
    "/contact": "Vinseq Studio - Kontakt",
    "/services": "Vinseq Studio - Usługi",
    "/about": "Vinseq Studio - Studio",
  };

  React.useEffect(() => {
    document.title = routes[location.pathname] || "Vinseq Studio - Strony, branding, aplikacje i AI";
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ScrollProgress className="fixed top-0 z-[60] h-[2px] bg-gradient-to-r from-blue-600 via-violet-500 to-fuchsia-500" />
      <Outlet />
      <Footer />
      <MobileStickyCTA />
    </>
  );
};

export default Layout;
