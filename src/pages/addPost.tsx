import React from "react";
// zustand
import { useStore } from "@/zustand/store";
// components
import { Layout } from "@/components/Layout";
import { AddPostForm } from "@/components/AddPostForm";
import {Title} from "@/components/ui/Title";
import { Spinner } from "@/components/ui/Spinner";
// типы
import { TPostState } from "@/zustand/types";

const cb = (state: TPostState) => state.loading

const AddPost = () => {

	const loading = useStore(cb)

	return (
		<Layout title="addPost" desc="Here, you can type something new...">
			{loading && <Spinner/>}
			<Title Tag={"h1"}> Опубликуйте свой пост:  </Title>
			<AddPostForm />
		</Layout>
	);
};

export default AddPost;
