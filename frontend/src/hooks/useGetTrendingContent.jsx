import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import getBackendUrl from "../utils/getBackendUrl";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();

	useEffect(() => {
		const getTrendingContent = async () => {
			try {
				const res = await axios.get(
					`${getBackendUrl()}/api/v1/${contentType}/trending`,
					{ withCredentials: true }
				);
				setTrendingContent(res.data.content);
			} catch (error) {
				console.error("Error fetching trending content:", error);
				setTrendingContent(null);
			}
		};

		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
};

export default useGetTrendingContent;
