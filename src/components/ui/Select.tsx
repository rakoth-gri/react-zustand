import { useState, memo } from "react";
// компоненты:
import { Title } from "./Title";
import styles from "./Select.module.sass";
// типы
import { IOption } from "@/zustand/types";

interface ISelectProps {
	Tag: string;
	color: string;
	param: IOption;
	setParam: (param: IOption) => void;
	list: IOption[];	
	title: string;
}

function Select({ Tag, color, param, setParam, list, title }: ISelectProps) {
	const [options, setOptions] = useState(false);

	return (
		<article
			className={styles.select}
			onClick={() => setOptions((prev) => !prev)}
		>
			<Title Tag={Tag} color={color} filter>
				{" "}
				{title} <strong style={{ marginLeft: "0.1rem", color: "teal" }}> {param.text} </strong>
			</Title>
			{options && (
				<div className={styles.select__options}>
					{list.map(({ value, text }) => (
						<option
							value={value}
							className={styles.select__option}
							key={value}
							onClick={() => setParam({ value, text })}
						>
							{" "}
							{text}{" "}
						</option>
					))}
				</div>
			)}
		</article>
	);
}

export default memo(Select);
