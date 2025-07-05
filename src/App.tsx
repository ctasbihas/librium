import { Outlet } from "react-router";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "./components/ui/sonner";

const App = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
			<Toaster />
		</>
	);
};

export default App;
