import { useState, ChangeEventHandler, FormEventHandler, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
// zustand
import { useStore } from "@/zustand/store";
// типы
import { TPost } from "@/zustand/types";
// компоненты
import { Error } from "./ui/Error";
import { Modal } from "./ui/Modal";
// сервисы
import { genPostCode } from "@/service/genPostCode";
// константы
import { constants } from "@/constants/constants";
import styles from "./AddPostForm.module.sass";

export const AddPostForm = memo(() => {
	const [post, setPost] = useState<{ [key: string]: string }>({ login: "", msg: "", category: "" });
	const [error, setError] = useState({ login: " ", msg: " ", category: " " });
	const [modal, setModal] = useState(false);
	const [addPost, addRemotePost, category] = useStore((state) => [
		state.addPost,
		state.addRemotePost,
		state.category,
	]);

	const push = useRouter().push;

	const isDisabled = () => !(post.login && post.msg && post.category);

	const formElemsHandler: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement> = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value });
		setError({ ...error, [e.target.name]: e.target.value });
	};

	const formSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const candidate = {
			...post,
			id: uuidv4(),
			date: +new Date(),
			postCode: genPostCode(),
			likesCount: 0,
			favorite: false,
		} as TPost;

		addRemotePost(candidate);
		addPost(candidate);
		setPost({ login: "", msg: "", category: ""});
		setModal(true);

		setTimeout(() => {
			push("/posts");
		}, 1000);
	};

	return (
		<div>
			{modal && <Modal title={"благодарим"} msg={"Ваш пост добавлен!"} onClick={() => setModal(false)} />}
			<form className={styles.form} onSubmit={formSubmitHandler}>
				<input
					type="text"
					placeholder="логин:"
					name="login"
					className={styles.input}
					onChange={formElemsHandler}
					value={post.login}
				/>
				{!error.login && <Error value="Заполните поле Логина..." />}
				<textarea
					placeholder="сообщение:"
					name="msg"
					className={styles.textarea}
					onChange={formElemsHandler}
					value={post.msg}
				></textarea>
				{!error.msg && <Error value="Заполните поле для сообщения..." />}
				<select className={styles.select} name="category" value={post.category} onChange={formElemsHandler}>					
					{constants.SELECT.CATEGORY.map(({ value, text }) => (
						<option value={value} key={value}>
							{" "}
							{text}{" "}
						</option>
					))}
				</select>
				{!error.category && <Error value="Выберите категорию поста..." />}
				<button
					className={`${styles.formButton} ${isDisabled() && styles.formButton__disabled}`}
					disabled={isDisabled()}
				>
					{" "}
					добавить
				</button>
			</form>
		</div>
	);
});
