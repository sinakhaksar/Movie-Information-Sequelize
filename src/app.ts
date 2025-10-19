import express from "express";
import "dotenv/config";
import sequelize from "./database.js";

import Movie from "./entites/movie.js";
import movieRouter from "./routes/movie.routes.js";

const app = express();

const PORT = process.env.PORT || 3001;

// a simple logger
app.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

app.use("/movies", movieRouter);

app.listen(PORT, async () => {
	console.log(`server running on localhost:${PORT}`);
	try {
		await sequelize.authenticate();
		console.log("DB connected");

		await Movie.sync({ alter: true });
		console.log("DB is updated");
	} catch (err) {
		console.log("ERROR initalizing db", err);
	}
});
