import { useState, MouseEventHandler, MouseEvent, memo } from "react";
import Link from "next/link";
// store
import { useStore } from "@/zustand/store";
import { shallow } from "zustand/shallow";
// type
import { TPost } from "@/zustand/types";
// css
import styles from "./Post.module.sass";
// константы
import { editIcon } from "@/constants/constants";
// сервисы
import { dateFormatter } from "@/service/dateFormatter";
import { LoginView } from "@/service/loginView";

export const Post = memo(({ id, login, msg, date, postCode, likesCount, favorite, category }: TPost) => {
	const [edit, setEdit] = useState(false);
	const [editFields, setEditFields] = useState({ login: "", msg: "" });

	const {
		removePost,
		updatePost,
		deleteRemotePost,
		updateRemotePost,
		incrementRemoteLikesCount,
		incrementLikesCount,
		toggleFavorite,
		toggleRemoteFavorite,
	} = useStore(
		(state) => ({
			removePost: state.removePost,
			updatePost: state.updatePost,
			deleteRemotePost: state.deleteRemotePost,
			updateRemotePost: state.updateRemotePost,
			incrementRemoteLikesCount: state.incrementRemoteLikesCount,
			incrementLikesCount: state.incrementLikesCount,
			toggleFavorite: state.toggleFavorite,
			toggleRemoteFavorite: state.toggleRemoteFavorite,
		}),
		shallow
	);

	const editHandler = (): void => {
		setEdit((prev) => !prev);
	};

	const updatePostHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		updatePost(id, editFields);
		updateRemotePost(id, editFields);
		setEditFields({ login: "", msg: "" });
		setEdit(false);
	};

	const deletePost = (id: string) => {
		removePost(id);
		deleteRemotePost(id);
	};

	const iconsHandler = (e: MouseEvent<HTMLDivElement>, id: string) => {
		if (!(e.target instanceof HTMLElement)) return;

		if (!(e.target.closest(".likesInc") || e.target.closest(`.favorite`))) return;

		switch (true) {
			case !!e.target.closest(".likesInc"):
				incrementLikesCount(id);
				incrementRemoteLikesCount(id);
				break;
			default:
				toggleFavorite(id);
				toggleRemoteFavorite(id, favorite);
				break;
		}
	};

	return (
		<article className={styles.post} style={edit ? { backgroundColor: "rgba(0,0,0, .8)" } : undefined}>
			<div className={styles.header}>
				<time className={styles.date}> {dateFormatter(date)} </time>
				<em className={styles.category}>
					{" "}
					<span className="material-symbols-outlined">category</span>
					{category}{" "}
				</em>
				{edit ? (
					<input
						type="text"
						className={`${styles.input} ${styles.login}`}
						placeholder="Логин:"
						onChange={(e) => setEditFields({ ...editFields, [e.target.name]: e.target.value })}
						value={editFields.login}
						name="login"
					/>
				) : (
					<>
						<LoginView login={login} />
						<span className={styles.login}> {login.slice(1)} </span>
					</>
				)}
			</div>
			{edit ? (
				<textarea
					className={styles.input}
					placeholder="Сообщение:"
					autoFocus
					onChange={(e) => setEditFields({ ...editFields, [e.target.name]: e.target.value })}
					value={editFields.msg}
					name="msg"
				/>
			) : (
				<p className={styles.msg}>{msg}</p>
			)}
			<div className={styles.link__container}>
				<Link href={`/posts/${postCode}`} className={styles.link__container__link}>
					{" "}
					Подробнее...{" "}
				</Link>
			</div>
			<div className={styles.icons} onClick={(e) => iconsHandler(e, id)}>
				<div className={styles.favorite}>
					{favorite ? (
						<span className="material-symbols-outlined favorite" style={{ color: "teal" }}>
							heart_plus
						</span>
					) : (
						<span className="material-symbols-outlined favorite">favorite</span>
					)}
				</div>
				{likesCount ? (
					<span className="material-symbols-outlined likesInc" style={{ color: "teal" }}>
						{" "}
						recommend{" "}
					</span>
				) : (
					<span className="material-symbols-outlined likesInc">thumb_up</span>
				)}
				<span className={styles.likesCount}> {likesCount} </span>
				<span className="material-symbols-outlined" onClick={editHandler} style={editIcon}>
					edit_square
				</span>
				<span className="material-symbols-outlined" onClick={() => deletePost(id)}>
					delete
				</span>
			</div>
			<div className={edit ? `${styles.editButtons} ${styles.activeEditButtons}` : styles.editButtons}>
				<button className={styles.update} onClick={updatePostHandler}>
					{" "}
					Обновить
				</button>
				<button className={styles.cancel} onClick={() => setEdit(false)}>
					{" "}
					Отмена
				</button>
			</div>
		</article>
	);
});
