import { memo } from "react";
// zustand
import {useStore} from "../zustand/store"
// компоненты
import { Title } from "./ui/Title";
import styles from "./Footer.module.sass";
// сервис
import getThemeClass from './../service/getThemeClass';

export const Footer = memo(() => {

	const theme = useStore(state => state.theme);

	return (
		<footer className={getThemeClass(styles, "footer", theme)}>
			{" "}
			<Title Tag="h2"> This gone be a footer later...</Title>
		</footer>
	);
});
