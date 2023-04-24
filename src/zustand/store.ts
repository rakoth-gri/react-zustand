import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// firebase:
import { db } from "@/firebase/config";
import {
	collection,	
	getDocs,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
	query,
	where,
	orderBy,
	increment,
	startAfter,
	limit,
} from "firebase/firestore";
// сервисы
// import { Ls } from "@/service/Ls";
// типизация
import { TPost, TPostState, updatePost, IOption } from "./types";
// константы
import { constants } from "@/constants/constants";

const postsRef = collection(db, constants.COLLECTION_NAME);

export const useStore = create<TPostState>()(
	devtools(
		// persist(
		(set, get) => ({
			// state -------
			posts: [],
			singlePost: [],
			// параметр пагинации
			start: "",
			loading: false,
			error: "",
			orderBy: constants.SELECT.ORDER_BY[1],
			category: constants.SELECT.CATEGORY[0],
			// методы -------
			// ----------------------------------------------------------
			addPost: (post: TPost) => set((state) => ({ posts: [post, ...state.posts] })),
			removePost: (id: string) => {
				const posts = get().posts;
				set({ posts: posts.filter((post) => post.id !== id) });
			},
			removeSinglePost: () => {
				set((state) => ({ ...state, singlePost: [] }));
			},
			updatePost: (id: string, { login, msg }: updatePost) => {
				const posts = get().posts;
				set({
					posts: posts.map((post) => ({
						...post,
						msg: post.id === id ? msg : post.msg,
						date: post.id === id ? +new Date() : post.date,
						login: post.id === id ? login : post.login,
					})),
				});
			},
			// FILTERS ---------------
			setOrderBy: (orderBy: IOption) => {
				set((state) => ({ ...state, orderBy: orderBy }));
			},
			setCategory: (category: IOption) => {
				set((state) => ({ ...state, category: category }));
			},
			incrementLikesCount: (id: string) => {
				set((state) => ({
					...state,
					posts: state.posts.map((post) => ({
						...post,
						likesCount: id === post.id ? ++post.likesCount : post.likesCount,
					})),
				}));
			},
			toggleFavorite: (id: string) => {
				const posts = get().posts;
				set({
					posts: posts.map((post) => ({
						...post,
						favorite: post.id === id ? !post.favorite : post.favorite,
					})),
				});
			},
			resetStart: () => set({ start: "" }),
			// ASYNC ACTIONS ---------------------------------------------
			// GET ALL
			fetchPosts: async (order: string, category: string) => {
				let { start } = get();
				let dir: any = "";

				if (order === "login") dir = "asc";
				else dir = "desc";

				try {
					set({ loading: true });
					window.setTimeout(async () => {
						let querySnapshot = await getDocs(
							query(postsRef, where("category", "in", category.split(",")), orderBy(order, dir), startAfter(start), limit(3))
						);
						// Проверка на последнюю страницу (свойство size)
						if (!querySnapshot.size) {
							start = "";
							querySnapshot = await getDocs(
								query(postsRef, where("category", "in", category.split(",")), orderBy(order, dir), startAfter(start), limit(3))
							);
						}

						let res = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TPost[];
						set((state) => ({
							...state,
							loading: false,
							posts: res,
							start: querySnapshot.docs[querySnapshot.docs.length - 1],
						}));
					}, 100);
				} catch (err) {
					if (err instanceof Error) {
						console.warn(err.message);
						set({ error: err.message });
					}
				}
			},
			// GET SINGLE POST
			fetchSinglePost: async (postCode: number) => {
				try {
					set({ loading: true });
					window.setTimeout(async () => {
						// c передачей ID не работает...
						const q = query(postsRef, where("postCode", "==", postCode));
						let res: any[] = [];
						const querySnapshot = await getDocs(q);
						querySnapshot.forEach((doc) => res.push({ id: doc.id, ...doc.data() }));
						set((state) => ({ ...state, loading: false, singlePost: res as TPost[] }));
					}, 100);
				} catch (err) {
					if (err instanceof Error) {
						console.warn(err.message);
						set({ error: err.message });
					}
				}
			},
			// GET FAVORITE POSTS
			fetchFavoritePosts: async () => {
				const q = query(postsRef, where("favorite", "==", true));
				try {
					set({ loading: true });
					window.setTimeout(async () => {
						const querySnapshot = await getDocs(q);
						let res: any[] = [];
						querySnapshot.forEach((doc) => {
							res.push({ id: doc.id, ...doc.data() });
						});
						set((state) => ({ ...state, loading: false, posts: res as TPost[] }));
					}, 100);
				} catch (err) {
					if (err instanceof Error) {
						console.warn(err.message);
						set({ error: err.message });
					}
				}
			},
			// ADD NEW POST
			addRemotePost: async ({ id, login, ...body }: TPost) => {
				try {
					set({ loading: true });
					window.setTimeout(async () => {
						const docRef = await setDoc(doc(db, constants.COLLECTION_NAME, id), {
							login: login.toLowerCase(),
							...body,
						});
						set({ loading: false });
					}, 100);
				} catch (err) {
					if (err instanceof Error) {
						console.warn(err.message);
						set({ error: err.message });
					}
				}
			},
			// DELETE
			deleteRemotePost: async (id: string) => {
				try {
					const docRef = await deleteDoc(doc(db, constants.COLLECTION_NAME, id));
				} catch (err) {
					if (err instanceof Error) console.warn(err.message);
				}
			},
			// UPDATE POST
			updateRemotePost: async (id: string, { msg, login }: updatePost) => {
				try {
					const docRef = doc(db, constants.COLLECTION_NAME, id);
					await updateDoc(docRef, { msg, login, date: +new Date()});
				} catch (err) {
					if (err instanceof Error) console.warn(err.message);
				}
			},
			incrementRemoteLikesCount: async (id: string) => {
				try {
					const docRef = doc(db, constants.COLLECTION_NAME, id);
					await updateDoc(docRef, { likesCount: increment(1) });
				} catch (err) {
					if (err instanceof Error) console.warn(err.message);
				}
			},
			toggleRemoteFavorite: (id: string, favorite: boolean) => {
				try {
					set({ loading: true });
					setTimeout(async () => {
						const docRef = doc(db, constants.COLLECTION_NAME, id);
						await updateDoc(docRef, { favorite: !favorite });
						set({ loading: false });
					}, 100);
				} catch (err) {
					if (err instanceof Error) console.warn(err.message);
				}
			},
		})
		// {
		// 	name: constants.LS.posts,
		// }
		// )
	)
);

// Аналогично как в RTK ---
// useStore.subscribe(() => {
// 	const posts = useStore.getState().posts;
// 	Ls.setToLs(posts);
// });
