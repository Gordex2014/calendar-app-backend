import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  active?: boolean;
  name: string;
  email: string;
  password?: string;
  uid?: any;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    active: {
      type: Boolean,
      required: [true, "Active status is required"],
      default: true,
    },
  },
  {
    toJSON: {
      transform: (document: IUser, returnedJSON: IUser) => {
        returnedJSON.uid = document._id;
        delete returnedJSON._id;
        delete returnedJSON.__v;
        delete returnedJSON.active;
        delete returnedJSON.password;
      },
    },
  }
);

export const User = model<IUser>("User", UserSchema);
