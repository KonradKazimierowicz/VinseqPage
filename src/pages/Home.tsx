import { GradientWordRotate } from "@/components/gradient-word-rotate";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Ripple } from "@/components/ui/ripple";
import { MagicCard } from "@/components/ui/magic-card";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PhoneIcon, MailIcon } from "lucide-react";


const texts = {
	hero: {
		rotatingWords: [
			"Twoja strona internetowa, która ",
			"przyciąga klientów",
			"wyprzedza konkurencję",
			"pojawia się na szczycie Google",
			"zwiększa Twoje zyski",
		],
		mainTitle: "Twoja strona internetowa, która",
		endTitle: "zaczyna się tutaj!",
		subtitle: "Czy Twoja firma jest widoczna w Google? Sprawdźmy to!",
		ctaButton: "Zobacz, jak możemy pomóc",
		footnote: "*Strona zoptymalizowana pod SEO już w 7 dni 🚀"
	},
	statistics: {
		visibility: "średnio wzrostu widoczności w Google",
		clients: "klientów zaufało nam i poleca nasze usługi! Dołącz już dziś!"
	},
	whyUs: {
		sectionTitle: "Dlaczego warto nas wybrać?",
		subtitle: "Tworzymy skuteczne strategie, które zwiększają widoczność Twojej strony w Google, przyciągają klientów i pomagają Ci wyprzedzić konkurencję. Oto, co nas wyróżnia:",
		items: [
			{
				icon: "/src/assets/icons/statistics.png",
				title: "Gwarantowany wzrost",
				description: "Poprawimy Twoją pozycję w Google",
				content: "Optymalizujemy Twoją stronę pod kątem SEO i UX, aby użytkownicy nie tylko trafili na nią, ale także dokonali zakupu lub kontaktu.",
			},
			{
				icon: "/src/assets/icons/storm.png",
				title: "Szybkie efekty",
				description: "Pierwsze wyniki już po 30 dniach",
				content: "Dzięki zaawansowanym technikom SEO i reklamowym widoczne rezultaty osiągniesz nawet w 30 dni!",
			},
			{
				icon: "/src/assets/icons/raport.png",
				title: "Transparentność i raporty",
				description: "Na bieżąco śledzisz efekty naszych działań",
				content: "Otrzymujesz szczegółowe raporty dotyczące efektów naszych działań, więc zawsze wiesz, na czym stoisz.",
			},
		]
	},
	services: {
		sectionTitle: "Co oferujemy?",
		subtitle: "Zajmujemy się wszystkim, co jest związane z SEO i reklamą w Google. Oto, co oferujemy:",
		items: [
			{
				id: "web",
				title: "Tworzenie stron WWW",
				icon: "/src/assets/icons/browser.png",
				description: "Projektujemy nowoczesne strony internetowe",
				content: "Tworzymy szybkie, responsywne i przyjazne dla użytkownika strony internetowe. Każdy projekt jest dopasowany do potrzeb Twojej firmy i zoptymalizowany pod kątem konwersji.",
			},
			{
				id: "seo",
				title: "SEO & Pozycjonowanie",
				icon: "/src/assets/icons/search-engine-optimization.png",
				description: "Zwiększamy widoczność Twojej strony w Google",
				content: "Kompleksowa optymalizacja SEO, która pomoże Ci dotrzeć do klientów szukających Twoich usług. Używamy sprawdzonych technik i narzędzi, aby Twoja strona pojawiała się wysoko w wynikach wyszukiwania.",
			},
			{
				id: "business",
				title: "Optymalizacja wizytówki Google",
				icon: "/src/assets/icons/id-card.png",
				description: "Poprawa pozycji w Google Maps",
				content: "Twoja wizytówka Google Moja Firma może przyciągać więcej klientów, jeśli jest poprawnie skonfigurowana i zoptymalizowana. Sprawimy, że Twoja firma będzie lepiej widoczna w lokalnych wynikach wyszukiwania i mapach Google.",
			},
			{
				id: "content",
				title: "Content marketing",
				icon: "/src/assets/icons/content.png",
				description: "Tworzymy angażujące treści",
				content: "Profesjonalne teksty, które nie tylko przyciągają uwagę czytelników, ale także pomagają w pozycjonowaniu. Tworzymy wartościowe treści, które budują Twoją markę.",
			}
		]
	},
	faq: {
		sectionTitle: "FAQ - Najczęściej zadawane pytania",
		items: [
			{
				id: "1",
				title: "Czy moja strona będzie dostosowana do urządzeń mobilnych?",
				content: "Tak! Tworzymy strony w technologii responsive web design (RWD), dzięki czemu wyglądają i działają świetnie na komputerach, tabletach i smartfonach.",
			},
			{
				id: "2",
				title: "Co to jest SEO i dlaczego jest ważne?",
				content: "SEO (Search Engine Optimization) to optymalizacja strony pod kątem wyszukiwarek internetowych, dzięki czemu Twoja witryna pojawia się wyżej w wynikach Google. Dobre SEO zwiększa widoczność Twojej firmy i przyciąga więcej klientów.",
			},
			{
				id: "3",
				title: "Czy oferujecie reklamę Google Ads??",
				content: "Tak, pomagamy w prowadzeniu kampanii reklamowych Google Ads i Facebook Ads, które mogą szybko zwiększyć liczbę klientów. Możemy zoptymalizować kampanię pod kątem konwersji i budżetu.",
			},
			{
				id: "4",
				title: "Jak mogę zamówić stronę internetową lub SEO?",
				content: "To proste! Skontaktuj się z nami poprzez formularz na stronie, e-mail lub telefon, a umówimy się na konsultację i omówimy Twoje potrzeby.",
			},
			{
				id: "5",
				title: "Czy po zakończeniu projektu otrzymam wsparcie techniczne?",
				content: "Tak! Oferujemy wsparcie techniczne i utrzymanie strony po zakończeniu projektu. Możesz skorzystać z abonamentu serwisowego, który obejmuje aktualizacje, kopie zapasowe i poprawki techniczne.",
			},
		]
	}
};

const StatisticsCard = ({ value, text, className }: { value: number; text: string; className?: string }) => (
	<div className={cn("flex flex-col justify-center items-center w-[22rem] h-[10rem] bg-white z-10 rounded-3xl shadow-2xl", className)}>
		<div className="flex flex-col justify-center items-center p-2">
			<div className="flex flex-row items-center justify-center">
				<NumberTicker value={value} className="text-5xl font-bold relative text-purple-600" />
				<h4 className="text-5xl font-bold ml-1 text-purple-600">%</h4>
			</div>
			<h4 className="text-xl font-medium text-center">{text}</h4>
		</div>
	</div>
);

const HeroSection = () => (
	<section className="bg-slate-100 flex flex-row justify-center items-center h-screen">
		<div className="flex flex-1 flex-col h-full">
			<div className="flex flex-col justify-center h-full relative pl-20">
				<GridPattern
					width={60}
					height={60}
					className="absolute gap-y-10 [mask-image:linear-gradient(100deg,white_0%,white_10%,transparent_100%)]"
				/>
				<StatisticsCard 
					value={200}
					text={texts.statistics.visibility}
					className="absolute top-[60%] right-[-15rem]"
				/>
				<h2 className="text-5xl font-medium relative">{texts.hero.mainTitle}</h2>
				<GradientWordRotate className="inline-block text-5xl font-bold" words={texts.hero.rotatingWords} />
				<h2 className="text-5xl font-medium m-0">{texts.hero.endTitle}</h2>
				<h4 className="text-xl font-medium pt-10">{texts.hero.subtitle}</h4>
				<ShimmerButton className="mt-5 w-fit">{texts.hero.ctaButton}</ShimmerButton>
				<h4 className="text-sm font-light pt-5">{texts.hero.footnote}</h4>
			</div>
		</div>
		
		<div className="flex flex-1 flex-col h-full justify-center items-center relative">
			<StatisticsCard 
				value={98}
				text={texts.statistics.clients}
				className="absolute top-[12rem] left-1 rounded-br-none"
			/>
			<div className="flex flex-col  items-center justify-end h-[40rem] relative" >
				<div className="w-[40rem] h-[20rem] rounded-2xl bg-blue-600 absolute z-0 overflow-hidden">
					<Ripple />
				</div>

				<img src="/src/assets/img/hero.webp" alt="hero" className="h-[40rem] z-10" />

			</div>
		</div>
	</section>
);

const WhyUsSection = () => (
	<section className="bg-slate-100 flex flex-col justify-center items-center h-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-64">
		<h2 className="text-3xl font-bold text-center text-gray-900">
			{texts.whyUs.sectionTitle}
		</h2>
		<p className="text-center text-lg pt-5 max-w-[50rem] px-4 text-muted-foreground">{texts.whyUs.subtitle}</p>
		<div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-10 py-10 w-full max-w-[90rem]">
			{texts.whyUs.items.map((item) => (
				<MagicCard
					key={item.title}
					className="w-full sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-none lg:flex-1 cursor-pointer flex-col items-center justify-center text-4xl shadow-2xl h-[18rem] p-5 mx-auto"
					gradientColor="#262626"
				>
					<img src={item.icon} alt={item.title} className="w-12 h-12 mx-auto" />
					<h5 className="text-2xl font-bold text-center pt-3">{item.title}</h5>
					<p className="text-lg text-center font-medium text-blue-600">{item.description}</p>
					<p className="text-lg text-center pt-2">{item.content}</p>
				</MagicCard>
			))}
		</div>
	</section>
);

const ServicesSection = () => {
	const [activeTab, setActiveTab] = useState(texts.services.items[0].id);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (isHovered) return; 

		const interval = setInterval(() => {
			setActiveTab(currentTab => {
				const currentIndex = texts.services.items.findIndex(item => item.id === currentTab);
				const nextIndex = (currentIndex + 1) % texts.services.items.length;
				return texts.services.items[nextIndex].id;
			});
		}, 3000);

		return () => clearInterval(interval);
	}, [isHovered]); // Re-run effect when hover state changes

	return (
		<section className="bg-slate-100 flex flex-col justify-center items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-20">
			<h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
				{texts.services.sectionTitle}
			</h2>
			<p className="text-center text-base sm:text-lg font-medium pt-3 sm:pt-5 max-w-[50rem] px-4 text-muted-foreground">
				{texts.services.subtitle}
			</p>
			
			<div className="flex flex-col w-full max-w-5xl mt-6 sm:mt-10">
				{/* Services Navigation */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
					{texts.services.items.map((service) => (
						<button
							key={service.id}
							onClick={() => setActiveTab(service.id)}
							className={cn(
								"flex flex-row sm:flex-col items-center gap-2 p-3 sm:p-4 rounded-xl transition-all duration-300",
								"hover:bg-white/50 hover:shadow-lg",
								activeTab === service.id ? "bg-blue-50 shadow-xl" : "bg-transparent"
							)}
						>
							<img src={service.icon} alt={service.title} className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
							<div className="flex flex-col sm:items-center">
								<h3 className="text-sm sm:text-base lg:text-lg font-semibold">{service.title}</h3>
								<p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
									{service.description}
								</p>
							</div>
						</button>
					))}
				</div>

				{/* Content */}
				<AnimatePresence mode="wait">
					{texts.services.items.map((service) => (
						service.id === activeTab && (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
								className="bg-blue-50 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl"
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
									<img 
										src={service.icon} 
										alt={service.title} 
										className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
									/>
									<div>
										<h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center sm:text-left">
											{service.title}
										</h3>
										<p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center sm:text-left">
											{service.content}
										</p>
									</div>
								</div>
							</motion.div>
						)
					))}
				</AnimatePresence>
			</div>
		</section>
	);
};

const ContactSection = () => (
	<section className="flex flex-col items-center py-12 px-4 md:px-8 bg-slate-100 relative">
		{/* Background Pattern */}
		<div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none" />
		
		<div className="w-full max-w-6xl z-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
				{/* Contact Info */}
				<div className="space-y-6">
					<h2 className="text-2xl md:text-3xl font-bold">Skontaktuj się z nami!</h2>
					<p className="text-muted-foreground max-w-md">
						Jesteśmy gotowi pomóc Ci osiągnąć sukces w internecie. Skontaktuj się z nami i rozpocznij swoją drogę do lepszej widoczności online.
					</p>
					
					<div className="space-y-4">
						{/* Contact Details */}
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-blue-100">
								<PhoneIcon className="w-5 h-5 text-blue-600" />
							</div>
							<div>
								<p className="text-sm font-medium">Phone</p>
								<p className="text-sm text-muted-foreground">+48 123 456 789</p>
							</div>
						</div>
						
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-full bg-blue-100">
								<MailIcon className="w-5 h-5 text-blue-600" />
							</div>
							<div>
								<p className="text-sm font-medium">Email</p>
								<p className="text-sm text-muted-foreground">kontakt@twojafirma.pl</p>
							</div>
						</div>

						<div className="space-y-4">
							<h4 className="text-sm font-medium">Godziny pracy:</h4>
							<div className="space-y-2 text-sm text-muted-foreground">
								<p>Poniedziałek - Piątek: 9:00 - 17:00</p>
								<p>Sobota: 10:00 - 14:00</p>
								<p>Niedziela: Zamknięte</p>
							</div>
						</div>
					</div>
				</div>
				
				{/* Contact Form */}
				<div className="bg-white rounded-xl shadow-lg p-6">
					<form className="space-y-4">
						<h3 className="text-2xl font-bold mb-4">Napisz do nas!</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Imię</label>
								<input 
									type="text"
									className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Nazwisko</label>
								<input 
									type="text"
									className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
						
						<div className="space-y-2">
							<label className="text-sm font-medium">Email</label>
							<input 
								type="email"
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						
						<div className="space-y-2">
							<label className="text-sm font-medium">Wiadomość</label>
							<textarea 
								rows={4}
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						
						<ShimmerButton className="w-full">
							Wyślij wiadomość
						</ShimmerButton>
					</form>
				</div>
			</div>
		</div>
	</section>
);

export const FAQSection = () => (
	<section className="flex flex-col items-center py-12 px-4 md:px-8 bg-gradient-to-t from-blue-100 to-gray-50">
		<h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
			{texts.faq.sectionTitle}
		</h2>
		
		<div className="w-full max-w-6xl">
			<Accordion type="single" collapsible>
				{texts.faq.items.map((item) => (
					<AccordionItem
						key={item.id}
						value={item.id}
						className="border bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4"
					>
						<AccordionTrigger className="px-6 py-4 text-left">
							<span className="text-base font-medium">{item.title}</span>
						</AccordionTrigger>
						<AccordionContent className="px-6 pb-4 text-base text-muted-foreground">
							{item.content}
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
			<WhyUsSection />
			<ServicesSection />
			<ContactSection />
			<FAQSection />
		</main>
	);
}

export default Home;
