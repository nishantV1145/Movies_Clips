import { Chip } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"

const Genres = ({
	selectedGenres,
	setSelectedGenres,
	genres,
	setGenres,
	type,
	setPage,
}) => {
	const handleAdd = (genre) => {
		setSelectedGenres([...selectedGenres, genre])
		setGenres(genres.filter((g) => g.id !== genre.id))
		setPage(1)
	}

	const handleRemove = (genre) => {
		setSelectedGenres(
			selectedGenres.filter((selected) => selected.id !== genre.id),
		)
		setGenres([...genres, genre])
		setPage(1)
	}

	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/genre/${type}/list`,
		params: { language: "en" },
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTAyMDk5Mzk2NWUzNjU2NzdmMGI5NTI4NTdhMGUyMiIsInN1YiI6IjY0ZmYyZmZjNmEyMjI3MDBlMGYxYTc1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0WxStP-mHyifBpgN7FtyRMsXLJncUGrdQneNJ_jyf7k",
		},
	}

	useEffect(() => {
		axios
			.request(options)
			.then(function (response) {
				setGenres(response.data.genres)
			})
			.catch(function (error) {
				console.error(error)
			})

		return () => {
			setGenres({}) // unmounting
		}
		// eslint-disable-next-line
	}, [])

	return (
		<div style={{ padding: "6px 0" }}>
			{selectedGenres.map((genre) => (
				<Chip
					style={{ margin: 2}}
					label={genre.name}
					key={genre.id}
					color="primary"
					clickable
					size="small"

					onDelete={() => handleRemove(genre)}
				/>
			))}
			{genres.map((genre) => (
				<Chip
					style={{ margin: 2, color: "white"}}
					
					label={genre.name}
					key={genre.id}
					clickable
					size="small"
					onClick={() => handleAdd(genre)}
				/>
			))}
		</div>
	)
}

export default Genres
