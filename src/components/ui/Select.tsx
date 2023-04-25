import { useState, Dispatch, SetStateAction } from "react";
import { constants } from "@/constants/constants";
// компоненты
import { Title } from "./Title";
import styles from "./Select.module.sass";

interface ISelectProps {
	value: string;
	setPost: Dispatch<
		SetStateAction<{
			[key: string]: string;
		}>
	>;
	post: { [key: string]: string };
    setError: Dispatch<
		SetStateAction<{
			[key: string]: string;
		}>
	>;
	error: { [key: string]: string };
}

export const Select = ({ value, post, setPost, setError, error }: ISelectProps) => {
	const [options, setOptions] = useState(false);

    const ChangePostHandler = (value: string) => {
        setPost({ ...post, category: value })
        setError({ ...error, category: value })
    }

	return (
		<article className={styles.select} onClick={() => setOptions((prev) => !prev)}>
			<Title Tag={"h3"} color="rgba(0,0,0,. 89)" filter>
				{" "}
				{"Категория:"} <strong style={{ marginLeft: "0.1rem", color: "teal" }}> {value} </strong>
			</Title>
			{options && (
				<div className={styles.select__options}>
					{constants.SELECT.CATEGORY.map(({ value, text }) => (
						<option
							value={value}
							className={styles.select__option}
							key={value}
							onClick={(e) => ChangePostHandler(value)}
						>
							{" "}
							{text}{" "}
						</option>
					))}
				</div>
			)}
		</article>
	);
};
