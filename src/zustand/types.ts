// Post
export type TPost = {
	id: string;
	login: string;
	msg: string;
	date: number;
	postCode: number;
	likesCount: number;
	favorite: boolean;
	category: string
};


export type updatePost = { login: string; msg: string };

// useStore
export type TPostState = {
	posts: Array<TPost>;
	loading: boolean;
	error: string;
	orderBy: IOption;
	category: IOption;
	singlePost: Array<TPost>;
	// Post
	addPost: (post: TPost) => void;
	addRemotePost: (post: TPost) => void;
	// Get
	fetchPosts: (orderBy: string, category: string) => void;
	fetchSinglePost: (postCode: number) => void;
	// Delete
	removePost: (id: string) => void;
	deleteRemotePost: (id: string) => void;
	removeSinglePost: () => void;
	// Update
	updatePost: (postId: string, post: updatePost) => void;
	updateRemotePost: (id: string, post: updatePost) => void;
	// orderBy
	setOrderBy: (orderBy: IOption) => void;
	// category
	setCategory: (category: IOption) => void;
	// likesCount
	incrementLikesCount: (id: string) => void;
	incrementRemoteLikesCount: (id: string) => void;
	// Favourites
	fetchFavoritePosts: (order: string) => void;
	toggleFavorite: (id: string) => void;
	toggleRemoteFavorite: (id: string, favorite: boolean) => void;
	// Pagination
	start: any;
	resetStart: () => void;
};

// options в составе Select
export interface IOption {
	text: string;
	value: string;
}
