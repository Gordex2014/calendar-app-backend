import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const generateJWT = (uid: string, name: string): Promise<string>  => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      config.secret,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(`${"[Token]:".red} ${err}`);
          reject("Token could not be generated");
        }
        resolve(token!);
      }
    );
  });
};
