import LibriumLogo from "@/assets/Librium-icon.png";
import { Menu, Plus } from "lucide-react";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Navbar = () => {
	const location = useLocation();

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	const navLinks = [
		{
			path: "/books",
			label: "All Books",
			icon: null,
		},
		{
			path: "/create-book",
			label: "Add Book",
			icon: <Plus className="h-4 w-4" />,
		},
		{
			path: "/borrow-summary",
			label: "Borrow Summary",
			icon: null,
		},
	];

	return (
		<nav className="sticky top-0 z-50 bg-gradient-to-r from-card via-surface to-card border-b border-border/50 shadow-xl backdrop-blur-sm animate-slide-in-left">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<Link
						to="/"
						className="flex items-center space-x-1.5 group animate-scale-in"
					>
						<div className="dark:bg-accent rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
							<img
								src={LibriumLogo}
								alt="Librium Logo"
								className="w-8 md:h-10 md:w-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
							/>
						</div>
						<span className="text-xl font-bold text-accent dark:text-secondary group-hover:animate-bounce-gentle">
							Librium
						</span>
					</Link>

					<div className="flex-1 flex justify-center">
						<div className="hidden md:flex items-center space-x-2 animate-slide-in-right">
							{navLinks.map((link) => (
								<Link
									to={link.path}
									key={link.path}
								>
									<Button
										size="sm"
										className={`bg-accent hover:bg-secondary transition-all duration-300 hover:scale-105 cursor-pointer text-white ${
											isActive(link.path)
												? "bg-secondary shadow-lg"
												: "hover:shadow-md"
										}`}
									>
										{link.icon}
										{link.label}
									</Button>
								</Link>
							))}
						</div>
					</div>

					<div className="flex items-center space-x-2">
						<div className="animate-scale-in delay-300">
							<ModeToggle />
						</div>
						<div className="md:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
									>
										<Menu className="h-6 w-6" />
									</Button>
								</SheetTrigger>
								<SheetContent side="left">
									<div className="flex flex-col h-full">
										<div className="flex items-center space-x-3 px-4 py-3 border-b">
											<div className="dark:bg-accent rounded-lg shadow-lg">
												<img
													src={LibriumLogo}
													alt="Librium Logo"
													className="h-10 w-10"
												/>
											</div>
											<span className="text-xl font-bold text-accent dark:text-secondary">
												LibraryMS
											</span>
										</div>
										<div className="flex flex-col space-y-2 px-4 py-4">
											{navLinks.map((link) => (
												<Link
													to={link.path}
													key={link.path}
												>
													<Button
														size="sm"
														variant={"link"}
														className={`transition-all duration-300 hover:scale-105 cursor-pointer text-accent ${
															isActive(
																link.path
															) &&
															"bg-secondary shadow-lg"
														}`}
													>
														{link.icon}
														{link.label}
													</Button>
												</Link>
											))}
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
