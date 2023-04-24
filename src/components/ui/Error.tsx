import { FC, InputHTMLAttributes } from "react";
import styles from "./Error.module.sass";

interface IErrorProps extends InputHTMLAttributes<HTMLInputElement> {
	value: string;
}

export const Error = ({ value, className, ...props }: IErrorProps) => {
	return <input readOnly type="text" value={value} {...props} className={`${styles.error} ${className || ""}`} />;
};
