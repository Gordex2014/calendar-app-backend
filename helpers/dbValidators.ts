import { CustomValidator } from "express-validator";

import { Event, User } from "../models";

export const isUserAlreadyRegistered: CustomValidator = async (
  email: string
) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`Email ${email} is already in use`);
  }
  return true;
};

export const validEmailUserInDb: CustomValidator = async (
  email: string,
  { req }
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password are invalid");
  }
  if (!user.active) {
    throw new Error("Email or password are invalid");
  }
  req.user = user;
  return true;
};

export const validEventInDb: CustomValidator = async (id: string, { req }) => {
  const event = await Event.findById(id);
  if (!event) {
    throw new Error("Event does not exists in db");
  }
  req.event = event;
  return true;
};
