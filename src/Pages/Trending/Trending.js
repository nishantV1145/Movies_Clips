import axios from "axios"
import "./Trending.css"
import { useEffect, useState } from "react"
import SingleContent from "../../Component/SingleContent/SingleContent.js"
import CustomPagination from "../../Component/Pagination/CustomPagination"

const Trending = () => {
	const [page, setPage] = useState(1)
	const [content, setContent] = useState([])

	const options = {
		method: "GET",
		url: "https://api.themoviedb.org/3/trending/all/day",
		params: { language: "en-US", page: page },
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTAyMDk5Mzk2NWUzNjU2NzdmMGI5NTI4NTdhMGUyMiIsInN1YiI6IjY0ZmYyZmZjNmEyMjI3MDBlMGYxYTc1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0WxStP-mHyifBpgN7FtyRMsXLJncUGrdQneNJ_jyf7k",
		},
	}

	useEffect(() => {
		window.scroll(0, 0)
		axios
			.request(options)
			.then(function (response) {
				setContent(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})
		// eslint-disable-next-line
	}, [page])

	return (
		<div>
			<span className="pageTitle"><b>Trending Today</b></span>
			<div className="trending">
				{content &&
					content?.results?.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={c.media_type}
							vote_average={c.vote_average}
						/>
					))}
			</div>
			<CustomPagination setPage={setPage} />
		</div>
	)
}
export default Trending
