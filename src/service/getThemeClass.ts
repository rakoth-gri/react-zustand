export default function getThemeClass(
	styles: {
		readonly [key: string]: string;
	},
	elem: string,
	currentTheme: string
): string {
	return currentTheme === "light" ? styles[elem] : `${styles[elem]} ${styles.dark}`;
}
