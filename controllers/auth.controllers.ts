import { Request, Response } from "express";
import { clientError, error, success } from "../network/response";

import { IUser, User } from "../models";
import { comparePasswords, generateJWT, hashPassword } from "../helpers";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IUser;
  const user = new User({ name, email, password });
  user.password = hashPassword(password!);

  try {
    await user.save();
    const token = await generateJWT(user._id, user.name);

    success(
      res,
      {
        name,
        uid: user._id,
        token,
      },
      201
    );
  } catch (err) {
    error(res, "Please contact with an admin", 500, err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { password: inputPassword } = req.body as IUser;
  const { password: dbHashedPassword, name, _id: uid } = req.user as IUser;

  const validPassword = comparePasswords(inputPassword!, dbHashedPassword!);
  const token = await generateJWT(uid, name);
  if (validPassword) {
    success(res, { name, uid, token }, 200);
  } else {
    clientError(res, "Email or password are invalid", 401);
  }
};

export const renewUser = async (req: Request, res: Response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);
  success(res, { token }, 200);
};
