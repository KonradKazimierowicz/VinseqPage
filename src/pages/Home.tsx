import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { company, faqs, processSteps, serviceCards, valuePoints } from "@/content/site";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Globe,
  Mail,
  Palette,
  Phone,
  Workflow,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

const serviceIcons = {
  websites: Globe,
  apps: Wrench,
  automation: Workflow,
  ai: Bot,
  branding: Palette,
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
    <span className="h-px w-6 bg-neutral-300" />
    {children}
  </span>
);

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) => (
  <div className={`mb-14 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] text-neutral-950 sm:text-4xl lg:text-[2.75rem]">
      {title}
    </h2>
    {description && (
      <p className="mt-5 text-pretty text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
        {description}
      </p>
    )}
  </div>
);

const HeroSection = () => (
  <section className="relative isolate overflow-hidden bg-neutral-950 pt-32 text-white">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute -top-32 left-1/2 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[140px]" />
      <div className="absolute bottom-[-40%] right-[-10%] h-[480px] w-[480px] rounded-full bg-violet-500/15 blur-[160px]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at top, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        }}
      />
    </div>

    <div className="mx-auto max-w-6xl px-6 pb-28 lg:px-8 lg:pb-36">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl text-center"
      >
        <Eyebrow>
          <span className="text-neutral-300">Vinseq Studio</span>
        </Eyebrow>

        <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Projektujemy{" "}
          <span className="font-serif italic font-normal text-neutral-200">cyfrowe produkty</span>{" "}
          dla firm,
          <br className="hidden sm:block" />{" "}
          które chcą być zauważone.
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
          Strony internetowe, pełny branding, aplikacje webowe, automatyzacje
          i dedykowane narzędzia AI &mdash; dopasowane do konkretnego celu, bez szablonów.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={company.phoneHref}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            Zadzwoń: {company.phone}
          </a>
          <Link
            to="/contact#contact-form"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.06] sm:w-auto"
          >
            <Mail className="h-4 w-4" />
            Napisz mail
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Dostępni: {company.hours}
          </span>
          <span className="hidden h-4 w-px bg-neutral-700 sm:inline-block" />
          <span>Bezpłatna rozmowa wstępna</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto mt-20 grid max-w-5xl gap-3 sm:grid-cols-3"
      >
        {[
          { label: "Strony i landing page", value: "Web" },
          { label: "Aplikacje webowe i AI", value: "Build" },
          { label: "Branding i automatyzacje", value: "Brand" },
        ].map((item) => (
          <div
            key={item.label}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                {item.label}
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-neutral-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="relative bg-neutral-50/60 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="Co tworzymy"
        title={
          <>
            Pięć obszarów, jedno{" "}
            <span className="font-serif italic font-normal text-neutral-700">studio</span>.
          </>
        }
        description="Zakres dobieramy do celu biznesowego. Czasem potrzebna jest sama strona albo branding, czasem aplikacja z automatyzacją i warstwą AI."
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {serviceCards.map((service, index) => {
          const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
          const isWide = index >= 3;

          return (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className={`group relative flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-7 transition hover:border-neutral-300 hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)] ${
                isWide ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-950 text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-medium text-neutral-950">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {service.short}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-neutral-100 pt-5 text-sm text-neutral-700">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                    <span className="leading-6">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

const ValueSection = () => (
  <section className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="Dlaczego Vinseq"
        title={
          <>
            Estetyka, która{" "}
            <span className="font-serif italic font-normal text-neutral-700">pracuje</span>{" "}
            na wynik.
          </>
        }
        description="Nowoczesny wygląd to początek. Liczy się to, czy produkt naprawdę pomaga klientowi podjąć decyzję i ułatwia codzienną pracę w firmie."
      />

      <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-200/80 sm:grid-cols-2 lg:grid-cols-4">
        {valuePoints.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="flex flex-col bg-white p-8"
          >
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              0{index + 1}
            </span>
            <h3 className="mt-5 text-lg font-medium leading-snug text-neutral-950">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="relative overflow-hidden bg-neutral-950 py-24 text-white sm:py-32">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />

    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>
            <span className="text-neutral-400">Jak pracujemy</span>
          </Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
            Cztery kroki od pierwszej rozmowy do{" "}
            <span className="font-serif italic font-normal text-neutral-400">wdrożenia</span>.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-neutral-400">
            Nie komplikujemy. Najpierw rozumiemy, potem projektujemy, na końcu wdrażamy i rozwijamy
            razem z Tobą.
          </p>
        </div>

        <div className="space-y-3">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/25 hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-6">
                <span className="font-serif text-3xl italic text-neutral-500 transition group-hover:text-white">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-white">
                    {step.title.replace(/^\d+\.\s*/, "")}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-neutral-900/5 bg-neutral-950 p-10 text-white sm:p-16 lg:p-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-500/25 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[140px]"
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Eyebrow>
              <span className="text-neutral-400">Następny krok</span>
            </Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
              Krótka rozmowa, jasny{" "}
              <span className="font-serif italic font-normal text-neutral-400">kierunek</span>.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-neutral-400">
              Najszybciej dojdziemy do konkretów po telefonie. Jeśli wolisz, opisz wszystko
              w mailu &mdash; odpowiemy z propozycją kierunku i kolejnych kroków.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={company.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                Pełna strona kontaktu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={company.phoneHref}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Telefon
                </p>
                <p className="mt-1 text-lg font-medium text-white">{company.phone}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-neutral-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </a>

            <a
              href={company.emailHref}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Email
                </p>
                <p className="mt-1 break-all text-lg font-medium text-white">
                  {company.email}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-neutral-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </a>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                Lokalizacja
              </p>
              <p className="mt-1 text-sm text-neutral-300">{company.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const FAQSection = () => (
  <section className="bg-neutral-50/60 py-24 sm:py-32">
    <div className="mx-auto max-w-5xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Pytania, które{" "}
            <span className="font-serif italic font-normal text-neutral-700">słyszymy najczęściej</span>.
          </>
        }
        description="Jeśli czegoś tu brakuje, najszybciej odpowiemy po telefonie."
      />

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white px-6 transition hover:border-neutral-300"
          >
            <AccordionTrigger className="py-5 text-left text-base font-medium text-neutral-950 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base leading-7 text-neutral-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ValueSection />
      <ProcessSection />
      <ContactSection />
      <FAQSection />
    </main>
  );
};

export default Home;
