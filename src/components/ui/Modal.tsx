import React from "react";

import styles from "./Modal.module.sass";

interface IModalProps {
	title: string;
	msg: string;
	onClick: () => void;
}

export const Modal = ({ title, msg, ...props }: IModalProps) => {
	return (
		<article className={styles.modal} {...props}>
			<h1 className={styles.modal__title}> {title} </h1>
			<p className={styles.modal__msg}> {msg} </p>
		</article>
	);
};
