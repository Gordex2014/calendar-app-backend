import { Request, Response } from "express";

import { Event, IEvent } from "../models";
import { clientError, error, success } from "../network/response";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().populate("user", "name");
    success(res, events as object, 200);
  } catch (err) {
    error(res, "Please contact with an admin", 500, err);
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { _id, __v, ...data } = req.body as IEvent;
  const uid = req.uid;

  const event = new Event(data);
  event.user = uid;
  try {
    const savedEvent = await event.save();
    success(res, savedEvent as object, 201);
  } catch (err) {
    error(res, "Please contact with an admin", 500, err);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { __v, _id, user, ...data } = req.body as IEvent;
  const { id } = req.params;
  const { event, uid } = req;

  if (event.user.toString() !== uid) {
    return clientError(res, "No se encuentra autorizado", 401);
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, data, { new: true });
    success(res, updatedEvent as object, 200);
  } catch (err) {
    error(res, "Please contact with an admin", 500, err);
  }
};
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { event, uid } = req;

  if (event.user.toString() !== uid) {
    return clientError(res, "No se encuentra autorizado", 401);
  }
  try {
    await Event.findByIdAndDelete(id);
    success(res, "Event deleted correctly", 200);
  } catch (err) {
    error(res, "Please contact with an admin", 500, err);
  }
};
