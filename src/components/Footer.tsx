import { memo } from "react";
// компоненты
import { Title } from "./ui/Title";
import styles from "./Footer.module.sass";

export const Footer = memo(() => {
	return (
		<footer className={styles.footer}>
			{" "}
			<Title Tag="h2" color={"rgba(0,0,0,.88)"}> This gone be a footer later...</Title>
		</footer>
	);
});
