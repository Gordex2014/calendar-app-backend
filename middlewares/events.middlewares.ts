import { body, param } from "express-validator";
import { validEventInDb } from "../helpers";
import { isDate } from "../helpers/typeCheckers";
import { validateItemExistence, validateUserInput } from "./fieldValidators";

export const eventCreationMiddleware = [
  body("title", "El título es obligatorio").notEmpty(),
  validateUserInput,
  body("title", "Title must be a string").isString(),
  validateUserInput,
  body("start", "La fecha de inicio es obligatoria").notEmpty(),
  validateUserInput,
  body("start", "Start must be a date").custom(isDate),
  validateUserInput,
  body("end", "La fecha de finalización es obligatoria").notEmpty(),
  validateUserInput,
  body("end", "End must be a date").custom(isDate),
  validateUserInput,
  body("note", "La nota es obligatoria").optional().notEmpty(),
  validateUserInput,
  body("note", "Note must be a valid string").optional().isString(),
  validateUserInput,
];

export const eventUpdateMiddleware = [
  param("id", "Id must be a valid mongo id").isMongoId(),
  validateUserInput,
  param("id").custom(validEventInDb),
  validateItemExistence,
  body("title", "El título es obligatorio").optional().notEmpty(),
  validateUserInput,
  body("title", "Title must be a string").optional().isString(),
  validateUserInput,
  body("start", "La fecha de inicio es obligatoria").optional().notEmpty(),
  validateUserInput,
  body("start", "Start must be a date").optional().custom(isDate),
  validateUserInput,
  body("end", "La fecha de finalización es obligatoria").optional().notEmpty(),
  validateUserInput,
  body("end", "End must be a date").optional().custom(isDate),
  validateUserInput,
  body("note", "La nota es obligatoria").optional().notEmpty(),
  validateUserInput,
  body("note", "Note must be a valid string").optional().isString(),
  validateUserInput,
];

export const eventDeleteMiddleware = [
  param("id", "Id must be a valid mongo id").isMongoId(),
  validateUserInput,
  param("id").custom(validEventInDb),
  validateItemExistence,
];
