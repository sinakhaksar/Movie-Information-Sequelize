import express from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3001;

// a simple logger
app.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

app.listen(PORT, () => {
	console.log(`server running on localhost:${PORT}`);
});
