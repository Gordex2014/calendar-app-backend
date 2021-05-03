import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IEvent extends Document {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user?: IUser["_id"];
  uid?: any;
}

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    notes: {
      type: String,
    },
    start: {
      type: Date,
      required: [true, "Start date is required"],
    },
    end: {
      type: Date,
      required: [true, "End date is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    toJSON: {
      transform: (document: IEvent, returnedJSON: IEvent) => {
        returnedJSON.uid = document._id;
        delete returnedJSON._id;
        delete returnedJSON.__v;
      },
    },
  }
);

export const Event = model<IEvent>("Event", EventSchema);
