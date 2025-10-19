import sequelize from "../database.js";

import { DataTypes, Model } from "sequelize";

class Movie extends Model {}

Movie.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(64),
			allowNull: false,
			primaryKey: true,
		},
		year: {
			type: DataTypes.INTEGER,
		},
		director: {
			type: DataTypes.STRING(64),
		},
		plot: {
			type: DataTypes.TEXT,
		},
		imdbRating: {
			type: DataTypes.FLOAT,
		},
	},
	{ sequelize },
);

export default Movie;
