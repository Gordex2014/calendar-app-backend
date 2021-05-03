import { body, param } from "express-validator";
import { validEventInDb } from "../helpers";
import { isDate } from "../helpers/typeCheckers";
import { validateItemExistence, validateUserInput } from "./fieldValidators";

export const eventCreationMiddleware = [
  body("title", "Title is required").notEmpty(),
  validateUserInput,
  body("title", "Title must be a string").isString(),
  validateUserInput,
  body("start", "Start is required").notEmpty(),
  validateUserInput,
  body("start", "Start must be a date").custom(isDate),
  validateUserInput,
  body("end", "End is required").notEmpty(),
  validateUserInput,
  body("end", "End must be a date").custom(isDate),
  validateUserInput,
  body("note", "Note is required").optional().notEmpty(),
  validateUserInput,
  body("note", "Note must be a valid string").optional().isString(),
  validateUserInput,
];

export const eventUpdateMiddleware = [
  param("id", "Id must be a valid mongo id").isMongoId(),
  validateUserInput,
  param("id").custom(validEventInDb),
  validateItemExistence,
  body("title", "Title is required").optional().notEmpty(),
  validateUserInput,
  body("title", "Title must be a string").optional().isString(),
  validateUserInput,
  body("start", "Start is required").optional().notEmpty(),
  validateUserInput,
  body("start", "Start must be a date").optional().custom(isDate),
  validateUserInput,
  body("end", "End is required").optional().notEmpty(),
  validateUserInput,
  body("end", "End must be a date").optional().custom(isDate),
  validateUserInput,
  body("note", "Note is required").optional().notEmpty(),
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
