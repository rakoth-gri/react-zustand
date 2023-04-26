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
				text: "логин",
				value: "login",
			},
			{
				text: "дата",
				value: "date",
			},
			{
				text: "лайки",
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
	MONTHS: [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	],
	COLORS: {
		slate: "#94a3b8",
		gray: "#374151",
		zinc: "#a1a1aa",
		stone: "#78716c",
		red: "#dc2626",
		orange: "#c2410c",
		amber: "#f59e0b",
		yellow: "#facc15",
		lime: "#84cc16",
		green: "#16a34a",
		emerald: "#6ee7b7",
		teal: "#0d9488",
		cyan: "#0891b2",
		sky: "#0ea5e9",
		indigo: "#4f46e5",
		purple: "#9333ea",
		pink: "#be185d",
		rose: "#9f1239",
	},
};
export type TConstants = typeof constants;

// GOOGLE ICON DELETE
export const editIcon: CSSProperties = { position: "relative", top: "-2.3px" };
