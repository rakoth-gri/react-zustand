import { TPost } from "@/zustand/types";

export class Ls {
	static setToLs(body) {
		localStorage.setItem("postList", JSON.stringify(body));
	}

	static getFromLs() {
		if (localStorage.getItem("postList")) {
			return JSON.parse(localStorage.getItem("postList"));
		} else return [];
	}
}
