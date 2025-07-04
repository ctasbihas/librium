import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
import { store } from "./redux/index.ts";
import router from "./routes/index.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider
			defaultTheme="system"
			storageKey="theme"
		>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ThemeProvider>
	</StrictMode>
);
