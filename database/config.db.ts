import mongoose from "mongoose";
import { config } from "../config/config";

export const dbConnection = async () => {
  const dbUrl = config.dbUrl;
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`${"[DB]:".blue} Database connected`);
  } catch (error) {
    console.log(`${"[DB] error:".red}  ${error}`);
    throw new Error("Error while initiating the database");
  }
};
