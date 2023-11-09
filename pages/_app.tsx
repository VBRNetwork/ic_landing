import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ToastContainer, Slide } from 'react-toastify';
import "../styles/globals.css";
import "../styles/toast.css";
import "./home.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import 'semantic-ui-css/semantic.min.css'
import { QueryClientProvider, QueryClient } from "react-query";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const theme = createTheme({
	palette: {
		primary: {
			main: "#2669b0",
		},
		text: {
			primary: "#ffffff",
			secondary: "#2669b0",
		},
	},
	components: {
		// Name of the component
		MuiInput: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					color: "#2669b0",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					color: "#2669b0",
				},
			},
		},
	},
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Header {...pageProps} />
				{getLayout(<Component {...pageProps} />)} <Footer />
				<ToastContainer
					position="top-center"
					autoClose={4000}
					hideProgressBar
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					transition={Slide}
				/>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
