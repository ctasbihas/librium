import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Book,
	BookPlus,
	Facebook,
	Library,
	Linkedin,
	Twitter,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-gray-100 py-8 md:py-12 lg:py-16">
			<div className="container mx-auto px-4">
				<div className="flex flex-col lg:flex-row justify-between items-center mb-8 md:mb-10 lg:mb-12">
					{/* Logo */}
					<div className="flex items-center space-x-2 mb-6 md:mb-8 lg:mb-0">
						<img
							src={Logo}
							alt="Librium Logo"
							className="h-12 w-12 md:h-16 md:w-16 lg:h-18 lg:w-18"
						/>
						<h1 className="text-2xl md:text-3xl font-bold text-white">
							LIBRIUM
						</h1>
					</div>

					<nav className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-2 md:gap-4 mb-6 md:mb-8 lg:mb-0 w-full lg:w-auto">
						{[
							{ name: "Books", href: "/books", icon: Book },
							{
								name: "Add Book",
								href: "/create-book",
								icon: BookPlus,
							},
							{
								name: "Borrow Summary",
								href: "/borrow-summary",
								icon: Library,
							},
						].map((item) => (
							<Button
								key={item.name}
								variant="ghost"
								size="sm"
								className="text-gray-300 hover:text-white hover:bg-gray-800 w-full sm:w-auto"
								asChild
							>
								<Link
									to={item.href}
									className="flex items-center justify-center sm:justify-start space-x-2"
								>
									<item.icon className="h-4 w-4" />
									<span>{item.name}</span>
								</Link>
							</Button>
						))}
					</nav>

					<div className="flex space-x-3 md:space-x-4">
						{[
							{
								icon: Facebook,
								href: "https://facebook.com/ctasbihas",
							},
							{
								icon: Twitter,
								href: "https://twitter.com/ctasbihas",
							},
							{
								icon: Linkedin,
								href: "https://linkedin.com/ctasbihas",
							},
						].map((social, index) => (
							<Button
								key={index}
								variant="ghost"
								size="icon"
								className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8 md:h-10 md:w-10"
								asChild
							>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									<social.icon className="h-4 w-4 md:h-5 md:w-5" />
								</a>
							</Button>
						))}
					</div>
				</div>

				<Separator className="bg-gray-700 mb-6 md:mb-8" />

				<div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
					<div className="flex items-center space-x-4 mb-4 md:mb-0">
						<p className="text-gray-400 text-center md:text-left">
							&copy; {new Date().getFullYear()} Librium. All
							rights reserved.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
						<Button
							variant="ghost"
							size="sm"
							className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-1 h-auto"
							asChild
						>
							<Link to="/">Terms of Service</Link>
						</Button>
						<Separator
							orientation="vertical"
							className="h-4 bg-gray-700 hidden sm:block"
						/>
						<Button
							variant="ghost"
							size="sm"
							className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-1 h-auto"
							asChild
						>
							<Link to="/">Privacy Policy</Link>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
