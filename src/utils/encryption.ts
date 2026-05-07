import bcrypt from "bcryptjs";

export const encryption = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};
export const decryption = async (password: string,hashedPassword:string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);;
};
