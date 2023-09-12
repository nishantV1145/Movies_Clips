import axios from "axios"
import React, { useEffect, useState } from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import { img_300, noPicture } from "../../Config/Config"
import "./Carousel.css"

const handleDragStart = (e) => e.preventDefault()

const Gallery = ({ id, media_type }) => {
	const [credits, setCredits] = useState([])

	const items = credits?.map((c) => (
		<div className="carouselItem">
			<img
				src={
					c.profile_path ? `${img_300}/${c.profile_path}` : noPicture
				}
				alt={c?.name}
				onDragStart={handleDragStart}
				className="carouselItem__img"
			/>
			<b className="carouselItem__txt">{c?.name}</b>
		</div>
	))

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	}

	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/${media_type}/${id}/videos`,
		params: { language: "en-US" },
		headers: {
			accept: "application/json",
			Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTAyMDk5Mzk2NWUzNjU2NzdmMGI5NTI4NTdhMGUyMiIsInN1YiI6IjY0ZmYyZmZjNmEyMjI3MDBlMGYxYTc1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0WxStP-mHyifBpgN7FtyRMsXLJncUGrdQneNJ_jyf7k"
		},
	}

	useEffect(() => {
		axios
			.request(options)
			.then(function (response) {
				setCredits(response.data.cast)
			})
			.catch(function (error) {
				console.error(error)
			})
		// eslint-disable-next-line
	}, [])

	return (
		<AliceCarousel
			mouseTracking
			infinite
			disableDotsControls
			disableButtonsControls
			responsive={responsive}
			items={items}
			autoPlay
		/>
	)
}

export default Gallery
