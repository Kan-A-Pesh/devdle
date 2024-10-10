import { z } from "zod";
import { zboolean, znumber } from "./extras";

export const envSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: znumber().default("3000"),
    TRUST_PROXY: zboolean().default("false"),
    LOG_FOLDER: z.string().default("./logs"),

    POCKETBASE_URL: z.string().url().default("http://database:8080/"),
    PB_ADMIN_PASSWORD: z.string(),
    REDIS_HOST: z.string().default("redis"),
    REDIS_PORT: znumber().default("6379"),
    REDIS_PASSWORD: z.string().default(""),

    RANDOM_SEED_STRING: z
        .string()
        .regex(/{year}/)
        .regex(/{month}/)
        .regex(/{day}/)
        .default("seed-{year}-{month}-{day}"),
});
