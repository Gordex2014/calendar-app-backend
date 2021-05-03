import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const hashPassword = (plainPassword: string): string => {
  const hashedPassword = bcrypt.hashSync(plainPassword, salt);
  return hashedPassword;
};

export const comparePasswords = (
  plainPassword: string,
  hashedPassword: string
): boolean => {
  const validPassword = bcrypt.compareSync(plainPassword, hashedPassword);
  if (validPassword) {
    return true;
  }
  return false;
};
