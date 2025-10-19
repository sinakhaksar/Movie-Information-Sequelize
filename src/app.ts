import express from "express";
import "dotenv/config";
import sequelize from "./database.js";
const app = express();

const PORT = process.env.PORT || 3001;

// a simple logger
app.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

app.listen(PORT, async () => {
	console.log(`server running on localhost:${PORT}`);
	try {
		await sequelize.authenticate();
		console.log("DB connected");
	} catch (err) {
		console.log("ERROR initalizing db");
	}
});
