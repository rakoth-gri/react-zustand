import { useEffect } from "react";
import Link from "next/link";
// zustand
import { useStore } from "@/zustand/store";
import { shallow } from "zustand/shallow";
// компоненты
import { Layout } from "@/components/Layout";
import { Title } from "@/components/ui/Title";
import { NavButton } from "@/components/ui/NavButton";
import { Spinner } from "@/components/ui/Spinner";
import { Post } from "@/components/Post";
// типы
import { TPost } from "@/zustand/types";

const Favourite = () => {
	const [loading, fetchFavoritePosts, orderBy, posts] = useStore(
		(state) => [state.loading, state.fetchFavoritePosts, state.orderBy, state.posts],
		shallow
	);

	useEffect(() => {
		fetchFavoritePosts(orderBy.value);
	}, []);

    const favoritePosts = posts.filter((post) => post.favorite)

	return (
		<Layout title="Favourites" desc="My favourite posts...">
			{loading && <Spinner />}
			<Link href="/posts">
				<NavButton> К странице постов </NavButton>
			</Link>
			<Title Tag="h1" color={"rgba(0,0,0, .89)"}>
				{" "}
				Избранные посты{" "}
			</Title>
            <>
				{favoritePosts.length ? (
					favoritePosts.map((post: TPost) => <Post {...post} key={post.id} />)
				) : (
					<Title Tag={"h1"} color={"brown"}>
						{" "}
						У вас нет избранных постов{" "}
					</Title>
				)}
			</>
		</Layout>
	);
};

export default Favourite;
