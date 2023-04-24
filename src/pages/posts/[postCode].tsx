import { useEffect, memo } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
// zustand
import { useStore } from "@/zustand/store";
import { shallow } from "zustand/shallow";
// типы
import { TPost } from "@/zustand/types";
// компоненты -----
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";
import { Title } from "@/components/ui/Title";
import { Spinner } from "@/components/ui/Spinner";
import { NavButton } from "@/components/ui/NavButton";

const SinglePost = memo((props: { post: TPost }) => {
	const [fetchSinglePost, singlePost, loading, removeSinglePost] = useStore(
		(state) => [state.fetchSinglePost, state.singlePost, state.loading, state.removeSinglePost],
		shallow
	);

	const { postCode } = useRouter().query;

	useEffect(() => {
		if (postCode) fetchSinglePost(+postCode);
		return () => {
			removeSinglePost();
		};
	}, []);

	return (
		// <Layout title="post" desc="Lets read the current post  ...">
		// 	<h1>Post with id {props.post.id}</h1>
		// 	<Post {...props.post} />
		// </Layout>

		<Layout title="post" desc="Lets read the current post  ...">
			<>
				<Link href="/posts">
					<NavButton>Назад </NavButton>
				</Link>

				{loading && <Spinner />}
				<Title Tag={"h1"} color={"rgba(0,0,0, .89)"}>
					Post with postCode {postCode}
				</Title>
				{singlePost.length && singlePost.map((post) => <Post {...post} />)}
			</>
		</Layout>
	);
});

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const { id } = context.query;

// 	const res = await fetch(`${constants.URL.BASE_URL}${constants.URL.POSTS_URL}/${id}`);

// 	const post = await res.json();

// 	console.log(post);

// 	if (!post) {
// 		return {
// 			notFound: true,
// 		};
// 	}

// 	return { props: { post } };
// };

export default SinglePost;
