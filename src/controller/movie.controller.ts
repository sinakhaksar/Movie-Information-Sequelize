import type { Request, Response } from "express";
import Movie from "../entites/movie.js";

export const movieFinder = async (req: Request, res: Response) => {
	try {
		const { title } = req.params;
		//  need this to avoid ts errors,
		if (!title) throw new Error("title not Found"); // change this to a 404 custom error

		// try to get movie form db
		let movie = await Movie.findOne({ where: { title } });

		let cached = true;
		if (!movie) {
			// call the omdbapi
			const apiMovie = (await omdbapi(title)) as any;

			if (!apiMovie) {
				return res.status(404).json({
					message: "movie not Found",
				});
			}
			// create and assign the persisted Movie instance so `movie` has the correct type
			movie = await Movie.create({
				title: apiMovie.title,
				year: Number(apiMovie.year),
				director: apiMovie.director,
				plot: apiMovie.plot,
				imdbRating: Number(apiMovie.imdbRating),
			});
			cached = false;
		}

		const {
			title: mTitle,
			year: mYear,
			director: mDirector,
			plot: mPlot,
			imdbRating: mImdbRating,
		} = movie as any;

		res.status(200).json({
			title: mTitle,
			year: mYear,
			director: mDirector,
			plot: mPlot,
			imdbRating: Number(mImdbRating),
			cached,
		});
	} catch (err) {
		res.status(500).json({
			message: "intrnal server error",
		});
	}
};

const omdbapi = async (title: string) => {
	const data = await fetch(
		`http://www.omdbapi.com/?apikey=${process.env.apikey}&t=${title}`,
	);

	// Parse the body stream into JSON
	const movie = await data.json();

	// made all keys camelCase to make it simpler to save
	const camelCasedMovie = Object.fromEntries(
		Object.entries(movie).map(([key, value]) => [
			key.charAt(0).toLowerCase() + key.slice(1),
			value,
		]),
	);

	if (movie.Response === "False") return null;
	else {
		return camelCasedMovie;
	}
};

export default movieFinder;
