import { body } from "express-validator";

import { validateUserInput } from "./fieldValidators";
import {
  isUserAlreadyRegistered,
  validEmailUserInDb,
} from "../helpers/dbValidators";

export const userRegisterMiddleware = [
  body("name", "Name is required").notEmpty(),
  validateUserInput,
  body("name", "Name should be a string").isString(),
  validateUserInput,
  body("name", "Name shouldn't be a number").not().isNumeric(),
  validateUserInput,
  body("email", "Email is required").notEmpty(),
  validateUserInput,
  body("email", "Email should be a valid email").isEmail(),
  validateUserInput,
  body("email").custom(isUserAlreadyRegistered),
  validateUserInput,
  body("password", "Password is required").notEmpty(),
  validateUserInput,
  body("password", "Password should be a string").isString(),
  validateUserInput,
  body("password", "Password should be at least 6 characters long").isLength({
    min: 6,
  }),
  validateUserInput,
];

export const userLoginMiddleware = [
  body("email", "Email is required").notEmpty(),
  validateUserInput,
  body("email", "Email should be a valid email").isEmail(),
  validateUserInput,
  body("email").custom(validEmailUserInDb),
  validateUserInput,
  body("password", "Password is required").notEmpty(),
  validateUserInput,
  body("password", "Password should be a string").isString(),
  validateUserInput,
  body("password", "Password should be at least 6 characters long").isLength({
    min: 6,
  }),
  validateUserInput,
];
