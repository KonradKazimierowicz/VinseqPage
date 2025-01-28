import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const ABOUT_CONTENT = {
    hero: {
        title: "Poznaj naszą historię",
        subtitle: "Tworzymy strategie, które działają. Dołącz do grona zadowolonych klientów i zobacz, jak możemy pomóc Twojej firmie rosnąć w internecie.",
        description: "Pomagamy firmom zwiększyć widoczność w sieci i budować konwertujące strony internetowe. Działamy z pasją, wykorzystując nowoczesne technologie i najlepsze praktyki marketingu cyfrowego.",
        cta: [
            { text: "Zobacz, jak możemy pomóc", href: "/services" },
            { text: "Umów darmową konsultację", href: "/contact" }
        ]
    },
    mission: {
        title: "Nasza misja: Twoja przewaga w internecie",
        content: "Naszą misją jest dostarczanie rozwiązań, które pomagają firmom rosnąć w internecie. Łączymy strategię SEO, optymalizację UX i nowoczesne technologie, aby zwiększać Twoją widoczność i konwersje."
    },
    process: {
        title: "Jasny proces, konkretne efekty",
        subtitle: "Współpraca z nami jest przejrzysta i efektywna. Skupiamy się na wynikach, a nie pustych obietnicach.",
        steps: [
            {
                title: "Analiza i strategia",
                description: "Badamy Twoją branżę i konkurencję",
                icon: "🔍"
            },
            {
                title: "Projekt i optymalizacja",
                description: "Tworzymy nowoczesne strony, które angażują użytkowników",
                icon: "💻"
            },
            {
                title: "SEO i widoczność",
                description: "Optymalizujemy treści, by zwiększyć ruch organiczny",
                icon: "📈"
            },
            {
                title: "Mierzenie wyników",
                description: "Analizujemy efektywność i stale ulepszamy strategię",
                icon: "📊"
            }
        ]
    },
    values: {
        title: "Wartości, które kierują naszą pracą",
        items: [
            {
                title: "Innowacja",
                description: "Stale śledzimy trendy i wdrażamy nowe technologie",
                icon: "🚀"
            },
            {
                title: "Skuteczność",
                description: "Skupiamy się na wynikach, które realnie wpływają na Twój biznes",
                icon: "🎯"
            },
            {
                title: "Transparentność",
                description: "Jesteśmy otwarci i komunikujemy się jasno na każdym etapie współpracy",
                icon: "🤝"
            }
        ]
    },
    standards: {
        title: "Nasze standardy",
        items: [
            { number: "100%", label: "zaangażowania w każdy projekt" },
            { number: "2x", label: "lepsza widoczność w Google" },
            { number: "100%", label: "responsywnych stron" },
            { number: "A+", label: "Core Web Vitals" }
        ]
    },
    technologies: {
        title: "Technologie, z którymi pracujemy",
        items: [
            { name: "Next.js", icon: "⚡" },
            { name: "React", icon: "⚛️" },
            { name: "Tailwind CSS", icon: "🎨" },
            { name: "Framer Motion", icon: "✨" }
        ]
    },
    cta: {
        title: "Chcesz zwiększyć swoją widoczność online?",
        subtitle: "Skorzystaj z darmowej konsultacji i dowiedz się, jak możemy pomóc Twojej firmie",
        buttons: [
            { text: "Umów darmową konsultację", href: "/contact", primary: true },
            { text: "Zobacz nasze usługi", href: "/services", primary: false }
        ]
    }
};

const AboutHero = () => (
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
            <h1 className="text-5xl font-bold mb-4">{ABOUT_CONTENT.hero.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {ABOUT_CONTENT.hero.subtitle}
            </p>
        </motion.div>
    </section>
);

const Stats = () => (
    <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {ABOUT_CONTENT.standards.items.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                    >
                        <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                        <p className="text-white">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const Mission = () => (
    <section className="py-20 bg-slate-100 relative overflow-hidden">
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
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-3xl font-bold mb-6">{ABOUT_CONTENT.mission.title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {ABOUT_CONTENT.mission.content}
                </p>
            </motion.div>
        </div>
    </section>
);

const Values = () => (
    <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{ABOUT_CONTENT.values.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ABOUT_CONTENT.values.items.map((value, index) => (
                    <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <MagicCard className="h-full p-8">
                            <div className="text-4xl mb-4">{value.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                        </MagicCard>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);


const Process = () => {
    const [activeTab, setActiveTab] = useState("step-1");
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveTab(current => {
                const currentStep = parseInt(current.split('-')[1]);
                return currentStep >= ABOUT_CONTENT.process.steps.length
                    ? "step-1"
                    : `step-${currentStep + 1}`;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <section className="pb-20 pt-10 bg-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title & Subtitle */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{ABOUT_CONTENT.process.title}</h2>
                    <p className="text-lg sm:text-xl text-muted-foreground">{ABOUT_CONTENT.process.subtitle}</p>
                </div>

                {/* Responsive Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="flex flex-col md:flex-row w-full gap-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Tab List - Horizontal on small screens, Vertical on medium+ screens */}
                    <TabsList className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible whitespace-nowrap md:whitespace-normal border-l border-border bg-transparent p-0">
                        {ABOUT_CONTENT.process.steps.map((step, index) => (
                            <TabsTrigger
                                key={step.title}
                                value={`step-${index + 1}`}
                                className="relative flex-shrink-0 px-3 py-2 text-lg md:text-xl text-muted-foreground hover:text-blue-600 transition-all md:w-full border-b md:border-l-0 md:border-b-0 md:border-border last:border-b-0 md:last:border-l-0 data-[state=active]:text-blue-600"
                            >
                                {step.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Tab Content */}
                    <div className="grow rounded-lg border border-border text-start p-4 sm:p-6">
                        {ABOUT_CONTENT.process.steps.map((step, index) => (
                            <TabsContent key={step.title} value={`step-${index + 1}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
                                        <div className="text-4xl">{step.icon}</div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                            <p className="text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>

                                    {/* Step Content (Grid on Larger Screens) */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                    >
                                        {ABOUT_CONTENT.process.steps.map((item, i) => (
                                            <MagicCard key={i} className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="text-2xl">{item.icon}</div>
                                                    <div>
                                                        <h4 className="font-medium mb-1">{item.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                                    </div>
                                                </div>
                                            </MagicCard>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </section>
    );
};




const FinalCTA = () => (
    <section className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-3xl font-bold mb-4">{ABOUT_CONTENT.cta.title}</h2>
                <p className="text-xl text-muted-foreground mb-8">{ABOUT_CONTENT.cta.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                    <a href="https://cal.com/konrad-kazimierowicz-xdabk3/15min" target="_blank" rel="noopener noreferrer">
                        <InteractiveHoverButton className="min-w-[200px] h-12 rounded-full bg-blue-600 text-white text-base">
                            Umów konsultację
                        </InteractiveHoverButton>
                    </a>

                </div>
            </motion.div>
        </div>
    </section>
);

const About = () => {
    return (
        <main>
            <AboutHero />
            <Process />
            <Stats />
            <Mission />
            <Values />
            <FinalCTA />
        </main>
    );
};

export default About;
