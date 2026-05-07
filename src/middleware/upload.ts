import multer from "multer";

const storage = multer.memoryStorage(); // store files in memory temporarily
export const upload = multer({ storage });