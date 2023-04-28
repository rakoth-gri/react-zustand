import { FC, memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../public/next.svg";
import { constants } from "@/constants/constants";
// zustand
import { useStore } from "@/zustand/store";
import { shallow } from "zustand/shallow";
// стили
import styles from "./Header.module.sass";
// service
import getThemeClass from "@/service/getThemeClass";

export const Header: FC = memo(() => {
	const { pathname } = useRouter();

	const [currentClass, setCurrentClass] = useState<string>(styles.nav);

	const [theme, changeTheme] = useStore((state) => [state.theme, state.changeTheme], shallow);

	const changeCurrentClass = (): void => {
		currentClass.includes(styles.active)
			? setCurrentClass(styles.nav)
			: setCurrentClass(`${styles.nav} ${styles.active}`);
	};

	
	return (
		<header className={getThemeClass(styles, "header", theme)}>
			<div className={styles.logo}>
				<Link href="/">
					<Image src={logo} alt="logo" className={styles.logo__img} />
				</Link>
			</div>
			<div className={styles.theme} onClick={() => changeTheme()}>
				{theme === "light" ? (
					<>
						{theme}:
						<span className={`material-symbols-outlined ${styles.theme__icon}`}>light_mode </span>
					</>
				) : (
					<>
						{theme}:
						<span className={`material-symbols-outlined ${styles.theme__icon}`}>dark_mode </span>
					</>
				)}
				
			</div>
			<nav className={`${currentClass} ${theme === "dark" && styles.dark}`}>
				<ul className={styles.menuList}>
					{constants.MENU_LIST.map(({ title, url }, i) => {
						return (
							<li key={title}>
								<Link
									href={url}
									className={
										url === pathname
											? `${styles.activeLink} ${styles.menuList__link}`
											: styles.menuList__link
									}
								>
									{title}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<div className={styles.burger}>
				<span className={`material-symbols-outlined ${styles.burger__icon}`} onClick={changeCurrentClass}>
					menu
				</span>
			</div>
		</header>
	);
});
