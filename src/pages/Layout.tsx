import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { TwitterIcon, FacebookIcon, InstagramIcon, MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";

// Navbar Component
const Navbar = () => {
	const location = useLocation();
	const [isScrolled, setIsScrolled] = React.useState(false);
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed w-full top-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white/90"
			}`}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link to="/" className="text-xl font-bold text-blue-600">
						<img src="/src/assets/img/logoVinseqStudio-removebg.png" alt="hero" className=" h-56 z-10" />
						</Link>
					</div>

					{/* Hamburger Menu Button */}
					<button
						className="md:hidden p-2"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<div className="w-6 h-5 flex flex-col justify-between">
							<span className={`h-0.5 w-full bg-blue-600 transform transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
							<span className={`h-0.5 w-full bg-blue-600 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
							<span className={`h-0.5 w-full bg-blue-600 transform transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
						</div>
					</button>

					{/* Desktop Navigation */}
					<div className="hidden md:flex md:items-center md:space-x-6">
						{[
							{ path: "/services", label: "Services" },
							{ path: "/about", label: "About" },
							{ path: "/contact", label: "Contact" },
						].map(({ path, label }) => (
							<Link
								key={path}
								to={path}
								className={`relative px-4 py-2 transition-colors font-medium ${
									location.pathname === path ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600 hover:border-b-2 border-transparent"
								}`}
							>
								{label}
							</Link>
						))}
					</div>
				</div>

				{/* Mobile Menu */}
				<div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-48 opacity-100 bg-white/90 shadow-md" : "max-h-0 opacity-0"}`}>
					<div className="py-2 space-y-2">
						{[
							{ path: "/services", label: "Services" },
							{ path: "/about", label: "About" },
							{ path: "/contact", label: "Contact" },
						].map(({ path, label }) => (
							<Link
								key={path}
								to={path}
								className={`block px-4 py-3 text-lg transition-colors ${location.pathname === path ? "text-blue-600 bg-gray-100" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

// Footer Component
const Footer = () => (
	<footer className="bg-blue-600 py-12 px-4 md:px-8">
		<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center md:justify-between">



			{/* Company Info */}
			<div className="space-y-4">
				<h3 className="text-xl font-bold text-white">Vinseq Studio</h3>
				<p className="text-blue-100 text-sm max-w-xs">
				Dostarczamy innowacyjne rozwiązania dla Twoich cyfrowych potrzeb. Stwórzmy razem coś niesamowitego.
				</p>
				<div className="flex space-x-3">
					<a href="#" className="text-blue-100 hover:text-white transition-colors">
						<TwitterIcon className="w-5 h-5" />
					</a>
					<a href="#" className="text-blue-100 hover:text-white transition-colors">
						<FacebookIcon className="w-5 h-5" />
					</a>
					<a href="#" className="text-blue-100 hover:text-white transition-colors">
						<InstagramIcon className="w-5 h-5" />
					</a>
				</div>
			</div>

			{/* Contact Info */}
			<div className="space-y-4">
				<h3 className="text-lg font-bold text-white">Kontakt</h3>
				<ul className="space-y-2">
					<li className="flex items-center space-x-2">
						<MapPinIcon className="w-4 h-4 text-blue-100" />
						<span className="text-blue-100 text-sm">Głogów, Polska</span>
					</li>
					<li className="flex items-center space-x-2">
						<PhoneIcon className="w-4 h-4 text-blue-100" />
						<span className="text-blue-100 text-sm">+48 669 281 812</span>
					</li>
					<li className="flex items-center space-x-2">
						<MailIcon className="w-4 h-4 text-blue-100" />
						<span className="text-blue-100 text-sm">contact@example.com</span>
					</li>
				</ul>
			</div>
		</div>

		{/* Copyright */}
		<div className="mt-8 pt-8 border-t border-blue-500">
			<p className="text-center text-blue-100 text-sm">
				© {new Date().getFullYear()} Company Name. All rights reserved.
			</p>
		</div>
	</footer>
);

// Layout Component
const Layout = () => {
	const location = useLocation();
	const routes = {
		"/": "Vinseq Studio - Agencja digitalowa",
		"/contact": "Vinseq Studio - Kontakt",
		"/services": "Vinseq Studio - Usługi",
		"/about": "Vinseq Studio - O nas",
	};

	React.useEffect(() => {
		document.title = routes[location.pathname as keyof typeof routes] || "Vinseq Studio - Agencja digitalowa";
	}, [location]);

	return (
		<>
			<Navbar />
			<ScrollProgress className="fixed top-16 bg-gradient-to-r from-blue-800 via-blue-600 to-purple-600" />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
