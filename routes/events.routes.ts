/**
 * Auth routes
 * host + /api/${version}/events
 */
import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/events.controllers";

import {
  eventCreationMiddleware,
  eventDeleteMiddleware,
  eventUpdateMiddleware,
  validateJWT,
} from "../middlewares";

const router = Router();

router.use(validateJWT);

router.get("/", getEvents);

router.post("/", eventCreationMiddleware, createEvent);

router.put("/:id", eventUpdateMiddleware, updateEvent);

router.delete("/:id", eventDeleteMiddleware, deleteEvent);

export default router;
