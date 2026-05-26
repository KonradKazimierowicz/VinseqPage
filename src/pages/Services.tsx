import { company, processSteps, serviceCards } from "@/content/site";
import { FAQSection } from "./Home";
import { motion } from "motion/react";
import { ArrowUpRight, Bot, Globe, Mail, Palette, Phone, Workflow, Wrench } from "lucide-react";

const serviceIcons = {
  websites: Globe,
  apps: Wrench,
  automation: Workflow,
  ai: Bot,
  branding: Palette,
};

const serviceDetails: Record<
  string,
  { title: string; description: string; deliverables: string[] }
> = {
  websites: {
    title: "Strony internetowe, które sprzedają i budują zaufanie",
    description:
      "Projektujemy nowoczesne strony firmowe i landing page &mdash; czytelne, szybkie i prowadzące użytkownika do kontaktu albo zakupu.",
    deliverables: [
      "Strona firmowa lub landing page",
      "Sekcje ofertowe i mocne CTA",
      "Responsywny design i dobra czytelność na telefonach",
    ],
  },
  apps: {
    title: "Aplikacje webowe szyte pod proces",
    description:
      "Budujemy systemy, panele i platformy, które mają być wygodne dla zespołu i czytelne dla klienta. Priorytetem jest użyteczność, wydajność i możliwość dalszego rozwoju.",
    deliverables: [
      "Panel administratora lub klienta",
      "Logika biznesowa i integracje",
      "Responsywny interfejs na desktop i mobile",
    ],
  },
  automation: {
    title: "Automatyzacje, które skracają drogę od zadania do wyniku",
    description:
      "Łączymy formularze, maile, CRM-y i inne narzędzia, żeby ograniczyć ręczną pracę. Automatyzacja ma być praktyczna i łatwa do utrzymania przez zespół.",
    deliverables: [
      "Obsługa leadów i powiadomień",
      "Synchronizacja danych między narzędziami",
      "Workflow dopasowany do obecnego procesu",
    ],
  },
  ai: {
    title: "Narzędzia AI, które pomagają w codziennej pracy",
    description:
      "Projektujemy asystentów i workflow AI pod konkretne zadania: obsługę danych, dokumentów, zapytań albo pracy zespołu. Bez sztucznych obietnic i bez wdrażania AI na siłę.",
    deliverables: [
      "Asystenci AI dla obsługi i sprzedaży",
      "Praca na wiedzy firmy i dokumentach",
      "Dopasowanie do wewnętrznych procesów",
    ],
  },
  branding: {
    title: "Pełny branding firmy &mdash; od kierunku po spójność",
    description:
      "Budujemy branding, który porządkuje odbiór marki i daje spójność między stroną, ofertą, komunikacją i materiałami sprzedażowymi.",
    deliverables: [
      "Kierunek wizualny i tożsamość marki",
      "Styl komunikacji i prezentacji oferty",
      "Spójność między marką, stroną i materiałami",
    ],
  },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
    <span className="h-px w-6 bg-neutral-300" />
    {children}
  </span>
);

const ServicesHero = () => (
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
        <span className="text-neutral-400">Usługi</span>
      </Eyebrow>
      <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        Projektujemy i wdrażamy narzędzia,
        <br className="hidden sm:block" />
        które naprawdę{" "}
        <span className="font-serif italic font-normal text-neutral-300">odciążają firmę</span>.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
        Od stron internetowych i brandingu, przez aplikacje webowe i automatyzacje, po rozwiązania AI.
        Zakres dobieramy do etapu biznesu i konkretnego problemu.
      </p>
    </motion.div>
  </section>
);

const ServicesGrid = () => (
  <section className="bg-neutral-50/60 py-24 sm:py-32">
    <div className="mx-auto max-w-6xl space-y-4 px-6 lg:px-8">
      {serviceCards.map((service, index) => {
        const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
        const details = serviceDetails[service.id];

        return (
          <motion.article
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group grid gap-10 rounded-3xl border border-neutral-200/80 bg-white p-8 transition hover:border-neutral-300 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-16"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-950 text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                  0{index + 1} / {serviceCards.length}
                </span>
              </div>

              <h2
                className="mt-8 text-balance text-3xl font-medium leading-tight text-neutral-950 sm:text-[2rem]"
                dangerouslySetInnerHTML={{ __html: details.title }}
              />
              <p
                className="mt-5 max-w-lg text-base leading-7 text-neutral-600"
                dangerouslySetInnerHTML={{ __html: details.description }}
              />
            </div>

            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                  Co dostajesz
                </p>
                <ul className="mt-5 space-y-3">
                  {details.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-neutral-100 pb-3 text-sm leading-6 text-neutral-800 last:border-0"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={company.phoneHref}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Porozmawiajmy o {service.title.toLowerCase()}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        );
      })}
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <Eyebrow>Proces</Eyebrow>
        <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] text-neutral-950 sm:text-4xl lg:text-[2.75rem]">
          Działamy etapami, żeby szybko dojść do sensownego{" "}
          <span className="font-serif italic font-normal text-neutral-700">wdrożenia</span>.
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-200/80 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="flex flex-col bg-white p-8"
          >
            <span className="font-serif text-3xl italic text-neutral-400">
              0{index + 1}
            </span>
            <h3 className="mt-5 text-lg font-medium leading-snug text-neutral-950">
              {step.title.replace(/^\d+\.\s*/, "")}
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="bg-neutral-50/60 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950 p-10 text-white sm:p-16 lg:p-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-blue-500/25 blur-[140px]"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <Eyebrow>
            <span className="text-neutral-400">Następny krok</span>
          </Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
            Powiedz, co chcesz{" "}
            <span className="font-serif italic font-normal text-neutral-400">zbudować</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-400">
            Najszybciej dojdziemy do konkretów po rozmowie telefonicznej. Mail jest świetną
            alternatywą, jeśli chcesz spokojnie opisać kontekst.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
            >
              <Phone className="h-4 w-4" />
              {company.phone}
            </a>
            <a
              href={company.emailHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              <Mail className="h-4 w-4" />
              {company.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <CTASection />
      <FAQSection />
    </main>
  );
};

export default Services;
