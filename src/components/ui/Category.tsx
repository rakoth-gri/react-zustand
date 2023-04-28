import { useState, MouseEventHandler } from "react";
// store
import { useStore } from "@/zustand/store";
import { shallow } from "zustand/shallow";
// константы
import { constants } from "@/constants/constants";
// компоненты
import { Title } from "./Title";

import styles from "./Category.module.sass";

export const Category = () => {
	const [category, setCategory, theme] = useStore((state) => [state.category, state.setCategory, state.theme], shallow);

	const [CSS, setCSS] = useState<string>(styles.category__list);

	const changeCSSHandler = () => {
		if (!CSS.includes(styles.active)) setCSS(`${styles.category__list} ${styles.active}`);
		else setCSS(styles.category__list);
	};

	return (
		<aside className={styles.category} onClick={changeCSSHandler}>
			<div className={styles.category__panel}>
				<span className={`material-symbols-outlined ${styles.category__trigger}`}>menu_open</span>
				<Title Tag="h4" style={{ marginLeft: "auto" }}>
					{" "}
					<strong> {category.text} </strong>{" "}
				</Title>
			</div>
			<ul className={`${CSS} ${theme === "dark" && styles.dark}`}>
				{constants.SELECT.CATEGORY.map(({ value, text }) => {
					return (
						<li
							key={value}
							id={value}
							className={`${styles.category__list__item} ${category.value === value && styles.selected}`}
							onClick={() => setCategory({ value, text })}
						>
							{" "}
							{text}{" "}
						</li>
					);
				})}
			</ul>
		</aside>
	);
};
