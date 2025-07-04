import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "./components/ui/sonner";

const App = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Toaster />
		</>
	);
};

export default App;
