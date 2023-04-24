import Head from "next/head";
import "@/styles/globals.sass";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
