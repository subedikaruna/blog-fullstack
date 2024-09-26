import bcrypt from "bcryptjs";

let Password = "karuna123";
export let hashPassword = await bcrypt.hash(Password, 10);

