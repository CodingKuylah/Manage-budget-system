import dotenv from "dotenv";

dotenv.config();

export const jwtconfig = {
  secret:
    process.env.JWT_SECRET ||
    "$2a$15$C1yQmr5YAEHjmfNFrnGaa.HxsBQ9H169YSIbV6Faj4nRYYHJUJTn2",
  expiresIn: "1h",
};
