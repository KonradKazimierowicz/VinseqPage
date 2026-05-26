import { aboutHighlights, company, processSteps, valuePoints } from "@/content/site";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
    <span className="h-px w-6 bg-neutral-300" />
    {children}
  </span>
);

const AboutHero = () => (
  <section className="relative isolate overflow-hidden bg-neutral-950 px-6 pb-24 pt-32 text-white sm:pb-28 lg:px-8 lg:pt-40">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[140px]" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl text-center"
    >
      <Eyebrow>
        <span className="text-neutral-400">Studio</span>
      </Eyebrow>
      <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        Łączymy{" "}
        <span className="font-serif italic font-normal text-neutral-300">estetykę</span>,
        logikę produktu i konkretne cele biznesowe.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
        Vinseq Studio rozwija nowoczesne produkty cyfrowe dla firm, które chcą uporządkować procesy,
        przyspieszyć obsługę i zbudować przewagę przez strony, branding i dobrze zaprojektowany software.
      </p>
    </motion.div>
  </section>
);

const MissionSection = () => (
  <section className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Eyebrow>Misja</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] text-neutral-950 sm:text-4xl lg:text-[2.5rem]">
            Tworzymy{" "}
            <span className="font-serif italic font-normal text-neutral-700">rozwiązania</span>,
            nie tylko ekrany.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600">
            Dla nas dobry projekt to taki, który wygląda nowocześnie, wzmacnia odbiór marki
            i przede wszystkim upraszcza pracę, poprawia przepływ informacji i wspiera realne
            decyzje w firmie.
          </p>
        </motion.div>

        <div className="space-y-3">
          {aboutHighlights.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex items-start gap-5 rounded-2xl border border-neutral-200/80 bg-white p-5 transition hover:border-neutral-300"
            >
              <span className="font-serif text-2xl italic leading-none text-neutral-400">
                0{index + 1}
              </span>
              <p className="text-base leading-7 text-neutral-800">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PrinciplesSection = () => (
  <section className="bg-neutral-50/60 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <Eyebrow>Proces</Eyebrow>
        <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] text-neutral-950 sm:text-4xl lg:text-[2.75rem]">
          Prosty proces i czytelna{" "}
          <span className="font-serif italic font-normal text-neutral-700">współpraca</span>.
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
            <p className="mt-3 text-sm leading-6 text-neutral-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ValuesSection = () => (
  <section className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <Eyebrow>Standard</Eyebrow>
        <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] text-neutral-950 sm:text-4xl lg:text-[2.75rem]">
          Co ma znaczenie w{" "}
          <span className="font-serif italic font-normal text-neutral-700">każdym</span>{" "}
          projekcie.
        </h2>
      </div>

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
            <p className="mt-3 text-sm leading-6 text-neutral-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="bg-neutral-50/60 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950 p-10 text-white sm:p-16 lg:p-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-violet-500/25 blur-[140px]"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <Eyebrow>
            <span className="text-neutral-400">Następny krok</span>
          </Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
            Masz temat do zbudowania albo{" "}
            <span className="font-serif italic font-normal text-neutral-400">usprawnienia</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-400">
            Najszybciej przejdziemy dalej po telefonie. Mail zostawiamy jako wygodny fallback,
            kiedy chcesz spokojnie opisać kontekst.
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

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-500">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Krótka rozmowa wystarczy, żeby ustalić sensowny pierwszy krok.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const About = () => {
  return (
    <main>
      <AboutHero />
      <MissionSection />
      <PrinciplesSection />
      <ValuesSection />
      <FinalCTA />
    </main>
  );
};

export default About;
