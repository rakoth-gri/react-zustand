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
	const [category, setCategory] = useStore((state) => [state.category, state.setCategory], shallow);

	const [CSS, setCSS] = useState<string>(styles.category__list);

	const changeCSSHandler: MouseEventHandler<HTMLElement> = (e) => {
		if (e.target instanceof HTMLElement) {
			if (e.target.closest(`.${styles.category__panel}`)) {
				setCSS(`${styles.category__list} ${styles.active}`);
				return;
			}
			setCSS(styles.category__list);
		}
	};

	return (
		<aside className={styles.category} onClick={changeCSSHandler}>
			<div className={styles.category__panel}>
				<span className={`material-symbols-outlined ${styles.category__trigger}`}>menu_open</span>
				<Title Tag="h4" color="rgba(0,0,0,.89)" style={{ marginLeft: "auto" }}>
					{" "}
					<strong> {category.text} </strong>{" "}
				</Title>
			</div>
			<ul className={CSS}>
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
