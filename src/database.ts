import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
	process.env.DBNAME || "",
	process.env.DBUSERNAME || "",
	process.env.DBPASSWORD || "",
	{
		host: "localhost",
		dialect: "mysql",
		logging: false,
	},
);

export default sequelize;
