import { ConnectionOptions } from "typeorm";
import { User } from "../User/entities/User";

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "k33p4eat",
    database: process.env.POSTGRES_DB || "postgres",
    entities: [User],
    synchronize: true,
}

export default config;