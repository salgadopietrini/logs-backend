import dotenv from "dotenv";

dotenv.config();

export const secret_key: string = process.env.SECRET_KEY!;
export const username: string = process.env.LOGIN_USER!;
export const password: string = process.env.LOGIN_PASS!;
export const db_user: string = process.env.DB_USER!;
export const db_password: string = process.env.DB_PASSWORD!;
export const db_cluster: string = process.env.DB_CLUSTER!;
export const port: string = process.env.PORT!;
export const isDevelopment: boolean = process.env.NODE_ENV === "development";
