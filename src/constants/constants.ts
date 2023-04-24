import { CSSProperties } from "react";

// LISTS AND CONTANTS
export const constants = {
	MENU_LIST: [
		{
			title: "home",
			url: "/",
		},
		{
			title: "posts",
			url: "/posts",
		},
		{
			title: "addPost",
			url: "/addPost",
		},
		{
			title: "about",
			url: "/about",
		},
		{
			title: "favourite",
			url: "/favourite",
		},
	],
	// NEXT API ---------
	URL: {
		BASE_URL: "http://localhost:3000/api",
		POSTS_URL: "/posts",
	},
	// LOCALSTORAGE ---------
	LS: {
		posts: "postList",
	},
	COLLECTION_NAME: "next-blog",
	SELECT: {
		ORDER_BY: [
			{
				text: "имени",
				value: "login",
			},
			{
				text: "дате",
				value: "date",
			},
			{
				text: "по лайкам",
				value: "likesCount",
			},
		],
		CATEGORY: [
			{
				text: "все категории",
				value: "music,it,sport,politics",
			},
			{
				text: "музыка",
				value: "music",
			},
			{
				text: "IT",
				value: "it",
			},
			{
				text: "спорт",
				value: "sport",
			},
			{
				text: "политика",
				value: "politics",
			},
		],
	},
};
export type TConstants = typeof constants;

// GOOGLE ICON DELETE
export const editIcon: CSSProperties = { position: "relative", top: "-2px" };
