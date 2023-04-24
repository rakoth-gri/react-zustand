import { useEffect } from "react";
import { useRouter } from "next/router";
// component
import { Layout } from "@/components/Layout";
import styles from "../styles/Notfound.module.sass";
import { Title } from './../components/ui/Title';

const NotFound = () => {
	const { push } = useRouter();

	useEffect(() => {
		setTimeout(() => {
			push("/");
		}, 2000);
	}, []);

	return (
		<Layout title="NotFound">
			<div className={styles.NotFoundWrapper}>
				<Title color={"brown"} Tag="h1">Error: 404. This Page Does not exist... </Title>
			</div>
		</Layout>
	);
};

export default NotFound;
