import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { FAQSection } from "./Home";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Button } from "@/components/ui/button";

const SITE_CONTENT = {
    services: [
        {
            id: "web",
            title: "Tworzenie stron WWW",
            icon: "/src/assets/icons/browser.png",
            description: "Projektujemy nowoczesne strony internetowe",
            content: "Tworzymy szybkie, responsywne i przyjazne dla użytkownika strony internetowe. Każdy projekt jest dopasowany do potrzeb Twojej firmy i zoptymalizowany pod kątem konwersji.",
            features: [
                "Responsywny design",
                "Optymalizacja pod SEO",
                "Szybkie ładowanie",
                "Intuicyjny interfejs",
                "Zgodność z WCAG",
            ]
        },
        {
            id: "business",
            title: "Wizytówka Google",
            icon: "/src/assets/icons/id-card.png",
            description: "Poprawa pozycji w Google Maps",
            content: "Twoja wizytówka Google Moja Firma może przyciągać więcej klientów. Sprawimy, że Twoja firma będzie lepiej widoczna w lokalnych wynikach.",
            features: [
                "Optymalizacja profilu",
                "Zarządzanie opiniami",
                "Pozycjonowanie lokalne",
                "Aktualizacja danych",
                "Analiza konkurencji"
            ]
        },
        {
            id: "seo",
            title: "SEO & Pozycjonowanie",
            icon: "/src/assets/icons/search-engine-optimization.png",
            description: "Zwiększamy widoczność Twojej strony w Google",
            content: "Kompleksowa optymalizacja SEO, która pomoże Ci dotrzeć do klientów szukających Twoich usług. Używamy sprawdzonych technik i narzędzi.",
            features: [
                "Analiza słów kluczowych",
                "Optymalizacja techniczna",
                "Linkbuilding",
                "Audyt SEO",
                "Monitoring pozycji"
            ]
        },
        {
            id: "content",
            title: "Content Marketing",
            icon: "/src/assets/icons/content.png",
            description: "Tworzymy angażujące treści",
            content: "Profesjonalne teksty, które nie tylko przyciągają uwagę czytelników, ale także pomagają w pozycjonowaniu. Tworzymy wartościowe treści.",
            features: [
                "Copywriting SEO",
                "Artykuły blogowe",
                "Social media",
                "Newslettery",
                "Opisy produktów"
            ]
        }
    ],
    hero: {
        title: "Nasze Usługi",
        description: "Oferujemy kompleksowe rozwiązania dla Twojego biznesu online. Sprawdź, jak możemy pomóc Ci osiągnąć sukces w internecie."
    },
    whyChooseUs: {
        title: "Dlaczego my?",
        description: "Łączymy doświadczenie z innowacją, aby dostarczać rozwiązania, które naprawdę działają",
        benefits: [
            {
                title: "Doświadczenie",
                description: "Ponad 5 lat doświadczenia w branży i setki zadowolonych klientów",
                icon: "shield-check"
            },
            {
                title: "Indywidualne podejście",
                description: "Każdy projekt traktujemy indywidualnie, dostosowując się do potrzeb klienta",
                icon: "users"
            },
            {
                title: "Gwarancja jakości",
                description: "Zapewniamy najwyższą jakość usług i wsparcie na każdym etapie współpracy",
                icon: "check"
            }
        ]
    },
    cta: {
        title: "Rozpocznij swoją drogę do sukcesu online",
        description: "Skontaktuj się z nami, aby otrzymać bezpłatną wycenę i konsultację. Pomożemy Ci wybrać najlepsze rozwiązanie dla Twojego biznesu.",
        benefits: [
            "Bezpłatna analiza Twojej strony",
            "Indywidualna strategia działania",
            "Szczegółowa wycena projektu",
            "Plan wdrożenia rozwiązań",
            "Wsparcie na każdym etapie"
        ],
        buttons: {
            primary: "Otrzymaj bezpłatną wycenę",
            secondary: "Umów konsultację"
        }
    },
    caseStudies: {
        title: "Nasze realizacje",
        description: "Zobacz, jak pomogliśmy naszym klientom osiągnąć sukces w internecie",
        cases: [
            {
                title: "Sklep meblowy online",
                category: "E-commerce",
                metrics: [
                    { label: "Wzrost ruchu", value: "+180%" },
                    { label: "Pozycje w Google", value: "TOP 3" },
                    { label: "Konwersja", value: "+75%" }
                ],
                image: "/src/assets/case-studies/case1.jpg",
                gradient: "from-purple-500/20 to-blue-500/20"
            },
            {
                title: "Klinika stomatologiczna",
                category: "Lokalna firma",
                metrics: [
                    { label: "Nowi pacjenci", value: "+120%" },
                    { label: "Opinie Google", value: "4.9★" },
                    { label: "Leady", value: "+90%" }
                ],
                image: "/src/assets/case-studies/case2.jpg",
                gradient: "from-blue-500/20 to-cyan-500/20"
            },
            {
                title: "Blog kulinarny",
                category: "Content Marketing",
                metrics: [
                    { label: "Ruch organiczny", value: "+250%" },
                    { label: "Czas na stronie", value: "+85%" },
                    { label: "Subskrypcje", value: "+140%" }
                ],
                image: "/src/assets/case-studies/case3.jpg",
                gradient: "from-cyan-500/20 to-emerald-500/20"
            }
        ]
    }
};

// Icon mapping object
const IconMap = {
    "shield-check": (props: any) => (
        <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    "users": (props: any) => (
        <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    "check": (props: any) => (
        <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    )
};

const ServicesHero = () => (
    <section className="relative bg-slate-100 flex flex-col justify-center items-center h-[40vh] pt-20 pb-10 overflow-hidden">
        <GridPattern
            width={40}
            height={40}
            className="absolute inset-0 opacity-50 [mask-image:linear-gradient(180deg,white_0%,white_10%,transparent_100%)]"
        />
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 text-center"
        >
            <h1 className="text-5xl font-bold mb-4">Nasze Usługi</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Oferujemy kompleksowe rozwiązania dla Twojego biznesu online.
                Sprawdź, jak możemy pomóc Ci osiągnąć sukces w internecie.
            </p>
        </motion.div>
    </section>
);

const ServiceCard = ({ service, index }: { service: typeof SITE_CONTENT.services[0], index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="w-full"
    >
        <MagicCard className="h-full p-6">
            <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                    <img src={service.icon} alt={service.title} className="w-12 h-12" />
                    <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-blue-600">{service.description}</p>
                    </div>
                </div>
                <p className="text-muted-foreground mb-6">{service.content}</p>
                <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto">
                    <a href="/contact" rel="noopener noreferrer">
                        <ShimmerButton className="w-full">
                            Dowiedz się więcej
                        </ShimmerButton>
                    </a>
                </div>
            </div>
        </MagicCard>
    </motion.div>
);

const ServicesGrid = () => (
    <section className="pb-20 px-4 md:px-8 bg-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {SITE_CONTENT.services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
            ))}
        </div>
    </section>
);

const WhyChooseUs = () => (
    <section className="relative py-20 px-4 md:px-8 bg-slate-100">
        <div className="absolute inset-0 overflow-hidden">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "absolute inset-0 backdrop-blur-sm",
                    "[mask-image:linear-gradient(20deg,white,transparent_60%,transparent)]"
                )}
            />
        </div>

        <div className="relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto text-center mb-16"
            >
                <h2 className="text-4xl font-bold mb-6">Dlaczego my?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Łączymy doświadczenie z innowacją, aby dostarczać rozwiązania,
                    które naprawdę działają
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        title: "Doświadczenie",
                        description: "Ponad 5 lat doświadczenia w branży i setki zadowolonych klientów",
                        icon: (
                            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        )
                    },
                    {
                        title: "Indywidualne podejście",
                        description: "Każdy projekt traktujemy indywidualnie, dostosowując się do potrzeb klienta",
                        icon: (
                            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )
                    },
                    {
                        title: "Gwarancja jakości",
                        description: "Zapewniamy najwyższą jakość usług i wsparcie na każdym etapie współpracy",
                        icon: (
                            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )
                    }
                ].map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
const GetQuoteCTA = () => (
    <section className="relative py-20 px-4 md:px-8 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/patterns/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 text-center lg:text-left"
            >
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                    Rozpocznij swoją drogę do sukcesu online
                </h2>
                <p className="text-xl text-blue-50 mb-8 max-w-2xl leading-relaxed">
                    <span className="font-medium">Skontaktuj się z nami</span>, aby otrzymać bezpłatną wycenę i konsultację.
                    Pomożemy Ci wybrać najlepsze rozwiązanie dla Twojego biznesu.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <a href="/contact" rel="noopener noreferrer">
                        <ShimmerButton className="min-w-[200px] bg-white " >
                            Otrzymaj bezpłatną wycenę
                        </ShimmerButton>
                    </a>

                    <a href="https://cal.com/konrad-kazimierowicz-xdabk3/15min" target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="outline"
                            className="min-w-[200px] h-12 rounded-full border-white text-white bg-white/20 text-base"
                        >
                            Umów konsultację
                        </Button>
                    </a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 max-w-md"
            >
                <div className="bg-white/[0.08] backdrop-blur-sm rounded-2xl p-8 border border-white/20 
                    shadow-[0_0_50px_rgba(0,0,0,0.1)] hover:shadow-[0_0_50px_rgba(0,0,0,0.15)] transition-shadow">
                    <ul className="space-y-5">
                        {[
                            "Bezpłatna analiza Twojej strony",
                            "Indywidualna strategia działania",
                            "Szczegółowa wycena projektu",
                            "Plan wdrożenia rozwiązań",
                            "Wsparcie na każdym etapie"
                        ].map((item, index) => (
                            <motion.li
                                key={item}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-300 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-blue-50 font-medium">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    </section>
);

const CaseStudies = () => (
    <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="absolute inset-0 overflow-hidden">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "absolute inset-0",
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent_80%)]"
                )}
            />
        </div>

        <div className="relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto text-center mb-16"
            >
                <h2 className="text-4xl font-bold mb-6">{SITE_CONTENT.caseStudies.title}</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {SITE_CONTENT.caseStudies.description}
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SITE_CONTENT.caseStudies.cases.map((study, index) => (
                    <motion.div
                        key={study.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-xl bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative p-8 flex flex-col h-full">
                            <div className="flex-1">
                                <div className="mb-6">
                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        {study.category}
                                    </span>
                                    <h3 className="text-xl font-bold mt-3">{study.title}</h3>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {study.metrics.map((metric, idx) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {metric.value}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {metric.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <InteractiveHoverButton className="w-full mt-auto">
                                Zobacz szczegóły
                            </InteractiveHoverButton>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const Services = () => {
    return (
        <main>
            <ServicesHero />
            <ServicesGrid />
            <WhyChooseUs />
            <GetQuoteCTA />
            <CaseStudies />
            <FAQSection />
        </main>
    );
};

export default Services;
