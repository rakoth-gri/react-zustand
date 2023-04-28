import { useState, memo } from "react";
// компоненты:
import { Title } from "./Title";
import styles from "./Filter.module.sass";
// типы
import { IOption } from "@/zustand/types";

interface IFilterProps {
	Tag: string;	
	param: IOption;
	setParam: (param: IOption) => void;
	list: IOption[];	
	title: string;
}

function Filter({ Tag, param, setParam, list, title }: IFilterProps) {
	const [options, setOptions] = useState(false);

	return (
		<article
			className={styles.filter}
			onClick={() => setOptions((prev) => !prev)}
		>
			<Title Tag={Tag} filter>
				{" "}
				{title} <strong style={{ marginLeft: "0.1rem", color: "teal" }}> {param.text} </strong>
			</Title>
			{options && (
				<div className={styles.filter__options}>
					{list.map(({ value, text }) => (
						<option
							value={value}
							className={styles.filter__option}
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

export default memo(Filter);
