import { FC, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../../public/next.svg";
// константы
import { constants } from "@/constants/constants";
// стили
import styles from "./Header.module.sass";

export const Header: FC = memo(() => {
	const { pathname } = useRouter();

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">
					<Image src={logo} alt="logo" className={styles.logo__img} />
				</Link>
			</div>
			<nav className={styles.nav}>
				<ul className={styles.menuList}>
					{constants.MENU_LIST.map(({ title, url }, i) => {
						return (
							<li key={title}>
								<Link
									href={url}
									className={url === pathname ? `${styles.activeLink} ${styles.menuList__link}` : styles.menuList__link}
								>
									{title}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
});
