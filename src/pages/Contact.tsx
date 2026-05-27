import { company, serviceCards } from "@/content/site";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { FAQSection } from "./Home";

interface ContactFormState {
  name: string;
  companyName: string;
  email: string;
  service: string;
  message: string;
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
    <span className="h-px w-6 bg-neutral-300" />
    {children}
  </span>
);

const ContactHero = () => (
  <section className="relative isolate overflow-hidden bg-neutral-950 px-6 pb-24 pt-32 text-white sm:pb-28 lg:px-8 lg:pt-40">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[140px]" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl text-center"
    >
      <Eyebrow>
        <span className="text-neutral-400">Kontakt</span>
      </Eyebrow>
      <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        Najlepiej{" "}
        <span className="font-serif italic font-normal text-neutral-300">zadzwoń</span>.
        <br className="hidden sm:block" />
        Jeśli wolisz &mdash; napisz mail.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
        Chcesz zbudować stronę internetową, uporządkować branding, wdrożyć aplikację webową,
        automatyzację albo narzędzie AI? Zaczniemy od krótkiej rozmowy i ustalenia, co da Ci
        najszybszy efekt.
      </p>
    </motion.div>
  </section>
);

const ContactInfo = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    companyName: "",
    email: "",
    service: serviceCards[0].title,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitError(null);

    const apiUrl = `${import.meta.env.BASE_URL}api/contact`.replace(/\/{2,}/g, "/");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (response.status === 404) {
        throw new Error("API_NOT_FOUND");
      }

      if (!response.ok) {
        throw new Error(data?.error || "SEND_FAILED");
      }

      setSubmitState("success");
      setFormData({
        name: "",
        companyName: "",
        email: "",
        service: serviceCards[0].title,
        message: "",
      });
    } catch (error) {
      setSubmitState("error");
      setSubmitError(error instanceof Error ? error.message : null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-neutral-50/60 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <a
            href={company.phoneHref}
            className="group relative block overflow-hidden rounded-3xl bg-neutral-950 p-8 text-white transition sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full bg-blue-500/25 blur-[100px]"
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <Eyebrow>
                  <span className="text-neutral-400">Priorytetowo</span>
                </Eyebrow>
                <span className="rounded-full border border-white/15 bg-white/10 p-2.5">
                  <Phone className="h-4 w-4 text-white" />
                </span>
              </div>

              <p className="mt-8 text-3xl font-medium tracking-tight sm:text-4xl">
                {company.phone}
              </p>
              <p className="mt-4 text-sm text-neutral-400">{company.hours}</p>
              <p className="mt-6 max-w-md text-sm leading-6 text-neutral-300">
                Najszybciej ustalimy kierunek po kilku minutach rozmowy. Powiedz, czy chodzi o stronę,
                branding, aplikację, automatyzację albo proces, który chcesz uprościć.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white">
                Zadzwoń teraz
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </a>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={company.emailHref}
              className="group rounded-3xl border border-neutral-200/80 bg-white p-6 transition hover:border-neutral-300"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-neutral-200 p-2.5 text-neutral-700">
                  <Mail className="h-4 w-4" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-950" />
              </div>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                Email
              </p>
              <p className="mt-2 break-all text-base font-medium text-neutral-950">
                {company.email}
              </p>
              <p className="mt-3 text-xs leading-5 text-neutral-500">
                Dla osób, które wolą spokojnie opisać kontekst.
              </p>
            </a>

            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-neutral-200 p-2.5 text-neutral-700">
                  <MapPin className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                Lokalizacja
              </p>
              <p className="mt-2 text-base font-medium text-neutral-950">{company.location}</p>
              <p className="mt-3 text-xs leading-5 text-neutral-500">
                Pracujemy zdalnie i projektowo.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          id="contact-form"
          className="rounded-3xl border border-neutral-200/80 bg-white p-8 sm:p-10"
        >
          <Eyebrow>Formularz</Eyebrow>
          <h2 className="mt-5 text-balance text-2xl font-medium leading-tight text-neutral-950 sm:text-3xl">
            Przygotuj wiadomość w 30 sekund.
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Po kliknięciu formularz wyśle wiadomość bezpośrednio przez Resend API.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Imię i nazwisko"
                value={formData.name}
                onChange={(value) => setFormData((current) => ({ ...current, name: value }))}
                placeholder="Jan Kowalski"
                required
              />
              <Field
                id="companyName"
                label="Firma"
                value={formData.companyName}
                onChange={(value) => setFormData((current) => ({ ...current, companyName: value }))}
                placeholder="Nazwa firmy"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="email"
                label="Email kontaktowy"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData((current) => ({ ...current, email: value }))}
                placeholder="jan@firma.pl"
              />
              <div>
                <label
                  htmlFor="service"
                  className="block text-xs font-medium uppercase tracking-[0.18em] text-neutral-500"
                >
                  Obszar
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, service: event.target.value }))
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                >
                  {serviceCards.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Inny temat">Inny temat</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium uppercase tracking-[0.18em] text-neutral-500"
              >
                Opis potrzeby
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, message: event.target.value }))
                }
                rows={6}
                placeholder="Np. potrzebujemy nowej strony, pełnego brandingu, panelu klienta, automatyzacji leadów albo narzędzia AI..."
                required
                className="mt-2 block w-full resize-none rounded-2xl border border-neutral-200 bg-white p-4 text-sm leading-6 text-neutral-900 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-4 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              {isSubmitting
                ? "Wysyłanie..."
                : submitState === "success"
                  ? "Wiadomość wysłana"
                  : "Wyślij wiadomość"}
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            {submitState === "success" && (
              <p className="text-xs leading-5 text-emerald-700">
                Dziękujemy! Wiadomość została wysłana. Odezwiemy się najszybciej, jak to możliwe.
              </p>
            )}

            {submitState === "error" && (
              <p className="text-xs leading-5 text-red-600">
                {submitError && submitError !== "SEND_FAILED"
                  ? submitError
                  : "Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się telefonicznie."}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Field = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs font-medium uppercase tracking-[0.18em] text-neutral-500"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      required={required}
      className="mt-2 h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
    />
  </div>
);

const Contact = () => {
  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <FAQSection />
    </main>
  );
};

export default Contact;
