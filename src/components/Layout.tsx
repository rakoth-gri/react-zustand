import { FC, ReactNode,  memo } from "react";
import Head from "next/head";
// компоненты
import { Header } from "./Header";
import { Footer } from "./Footer";

import styles from "./Layout.module.sass";

interface ILayoutProps {
	title: string;
	desc?: string;
	children: ReactNode;
}

export const Layout: FC<ILayoutProps> = memo(({ title, desc, children }) => {

	return (
		<>
			<Head>
				<title> {title} </title>
				<meta name="description" content={desc} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</>
	);
});
