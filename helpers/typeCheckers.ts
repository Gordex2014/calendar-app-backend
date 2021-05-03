import { CustomValidator } from "express-validator";
import moment from "moment";

export const isDate: CustomValidator = (input: any) => {
  const date = moment(input);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};
