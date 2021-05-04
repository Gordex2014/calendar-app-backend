import { body } from "express-validator";

import { validateUserInput } from "./fieldValidators";
import {
  isUserAlreadyRegistered,
  validEmailUserInDb,
} from "../helpers/dbValidators";

export const userRegisterMiddleware = [
  body("name", "El nombre es obligatorio").notEmpty(),
  validateUserInput,
  body("name", "Name should be a string").isString(),
  validateUserInput,
  body("name", "El nombre no debe ser un número").not().isNumeric(),
  validateUserInput,
  body("email", "El correo es obligatorio").notEmpty(),
  validateUserInput,
  body("email", "Debe ingresar un correo válido").isEmail(),
  validateUserInput,
  body("email").custom(isUserAlreadyRegistered),
  validateUserInput,
  body("password", "La contraseña es obligatoria").notEmpty(),
  validateUserInput,
  body("password", "Password should be a string").isString(),
  validateUserInput,
  body(
    "password",
    "La contraseña debe ser de mínimamente de 6 caractéres"
  ).isLength({
    min: 6,
  }),
  validateUserInput,
];

export const userLoginMiddleware = [
  body("email", "El email es obligatorio").notEmpty(),
  validateUserInput,
  body("email", "Debe ingresar un correo válido").isEmail(),
  validateUserInput,
  body("email").custom(validEmailUserInDb),
  validateUserInput,
  body("password", "La contraseña es obligatoria").notEmpty(),
  validateUserInput,
  body("password", "Password should be a string").isString(),
  validateUserInput,
  body(
    "password",
    "La contraseña debe ser de mínimamente de 6 caractéres"
  ).isLength({
    min: 6,
  }),
  validateUserInput,
];
