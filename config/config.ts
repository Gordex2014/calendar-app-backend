import dotenv from "dotenv";

dotenv.config();

const secretString = process.env.SECRET_JWT_SEED;
if (!secretString) {
  throw new Error(
    `${"[Config]:".red} Please configure the SECRET_JWT_SEED env variable`
  );
}

export const config = {
  apiVersionRoute: "/api/v1",
  dbUrl: process.env.MONGODB_CNN || "mongodb://localhost:27017/videosApp",
  port: process.env.PORT || "8080",
  secret: secretString,
};
