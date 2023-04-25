import {MouseEventHandler} from "react";
// zustand
import { useStore } from "@/zustand/store";
import { shallow } from 'zustand/shallow';

import styles from "./Pagination.module.sass";

export const Pagination = () => {

    const [fetchPosts, orderBy, category] = useStore(state => [state.fetchPosts, state.orderBy, state.category], shallow);

    const handlePaginationForward = (): void => fetchPosts(orderBy.value, category.value) 
   
	return (
		<section className={styles.pagination}>
			<div className={styles.pagination__arrows}>
				<span className={`${styles.pagination__arrows__right} material-symbols-outlined`} id="next" onClick={handlePaginationForward}>{" "} keyboard_double_arrow_left {" "}</span> next page ...
			</div>
		</section>
	);
};
