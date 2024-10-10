import globals from "@/env/env";
import { TypedPocketBase } from "@/types/pocketbase";
import Redis from "ioredis";
// Use CommonJS import to avoid ESModule import error
const PocketBase = require("pocketbase/cjs");

export default abstract class Database {
    public static pb: TypedPocketBase;
    public static redis: Redis;

    public static async init() {
        this.pb = new PocketBase(globals.env.POCKETBASE_URL);

        this.pb.autoCancellation(false);
        await this.pb.admins.authWithPassword("admin@admin.local", globals.env.PB_ADMIN_PASSWORD, {
            // This will trigger auto refresh or auto reauthentication in case
            // the token has expired or is going to expire in the next 30 minutes.
            autoRefreshThreshold: 30 * 60,
        });

        this.redis = new Redis(globals.env.REDIS_PORT, globals.env.REDIS_HOST, {
            password: globals.env.REDIS_PASSWORD,
        });
    }
}
