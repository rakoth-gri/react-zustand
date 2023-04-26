import { useState, ChangeEventHandler, ChangeEvent, FormEventHandler, memo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
// zustand
import { useStore } from "@/zustand/store";
import { shallow } from "zustand/shallow";
// типы
import { TPost } from "@/zustand/types";
// компоненты
import { Error } from "./ui/Error";
import { Modal } from "./ui/Modal";
import { Select } from "./ui/Select";
// сервисы
import { genPostCode } from "@/service/genPostCode";
import { deBounce } from "@/service/deBounce";
// константы
import styles from "./AddPostForm.module.sass";

export const AddPostForm = memo(() => {
	const push = useRouter().push;

	const [post, setPost] = useState<{ [key: string]: string }>({ login: "", msg: "", category: "" });
	const [error, setError] = useState<{ [key: string]: string }>({ login: " ", msg: " ", category: " " });
	const [modal, setModal] = useState(true);

	const [addPost, addRemotePost, category] = useStore(
		(state) => [state.addPost, state.addRemotePost, state.category],
		shallow
	);

	// const deBounced = useCallback(
	// 	deBounce((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
	// 		setPost({ ...post, [e.target.name]: e.target.value.toLowerCase() });
	// 		setError({ ...error, [e.target.name]: e.target.value });
	// 	}, 500),
	// 	[]
	// );

	const isDisabled = () => !(post.login && post.msg && post.category);

	const ChangePostHandler: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
		if (!(e.target instanceof HTMLElement)) return;
		// deBounced(e);
		setPost({ ...post, [e.target.name]: e.target.value.toLowerCase() });
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
		setPost({ login: "", msg: "", category: "" });
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
					onChange={ChangePostHandler}
					value={post.login}
				/>
				{!error.login && <Error value="Заполните поле Логина..." />}
				<textarea
					placeholder="сообщение:"
					name="msg"
					className={styles.textarea}
					onChange={ChangePostHandler}
					value={post.msg}
				></textarea>
				{!error.msg && <Error value="Заполните поле для сообщения..." />}
				<Select value={post.category} setPost={setPost} post={post} error={error} setError={setError} />
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
