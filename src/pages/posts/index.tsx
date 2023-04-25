import { useEffect } from "react";
// zustand
import { useStore } from "@/zustand/store";
import { shallow } from "zustand/shallow";
// типы
import { TPost } from "@/zustand/types";
// константы
import { constants } from "@/constants/constants";
// компонент
import { Layout } from "@/components/Layout";
import { Post } from "@/components/Post";
import { Title } from "@/components/ui/Title";
import { Spinner } from "@/components/ui/Spinner";
import Filter from "@/components/ui/Filter";
import { Pagination } from "@/components/ui/Pagination";
import { Category } from "@/components/ui/Category";

const Posts = (props: { posts: Array<TPost> }) => {
	const [posts, fetchPosts, loading, orderBy, setOrderBy, resetStart, category] = useStore(
		(state) => [state.posts, state.fetchPosts, state.loading, state.orderBy, state.setOrderBy, state.resetStart, state.category],
		shallow
	);

	useEffect(() => {
		fetchPosts(orderBy.value, category.value);
		return () => {
			resetStart();
		};
	}, [orderBy, category]);

	return (
		<Layout title="posts" desc="this page contains all posts, which was published">
			<>
				{loading && <Spinner />}
				<Title Tag={"h1"} color={"rgba(0,0,0, .89)"}>
					{" "}
					Опубликованные посты:{" "}
				</Title>
				<Filter Tag="h4" color="brown" setParam={setOrderBy} param={orderBy} list={constants.SELECT.ORDER_BY} title={'Сортировка:'}/>
				<Pagination />
				<>
					{posts.length ? (
						posts.map((post: TPost) => <Post {...post} key={post.id} />)
					) : (
						<Title Tag={"h1"} color={"brown"}>
							{" "}
							Вы еще не добавили ни одного поста{" "}
						</Title>
					)}
				</>
				<Category/>	
			</>					
		</Layout>
	);
};

// export async function getStaticProps() {
// const res = await fetch(`${constants.URL.BASE_URL}${constants.URL.POSTS_URL}`);
// const posts = await res.json();

// if (!posts) {
// 	return {
// 		notFound: true,
// 	};
// }

// return {
// 	props: {
// 		posts: null,
// 	},
// };
// }

export default Posts;
