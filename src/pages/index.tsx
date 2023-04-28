import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.sass";
// components:
import { Layout } from "./../components/Layout";
import { Title } from "@/components/ui/Title";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<Layout title="home" desc="A homepage of resourse">
			<Title Tag={"h1"}>
				{" "}
				Главная страница блога...{" "}
			</Title>
			<Image src={"/images/firestore.png"} width="500" height="400" alt="main" className={styles.image} />
		</Layout>
	);
}
