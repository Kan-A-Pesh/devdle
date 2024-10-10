import Database from "@/utils/database";

export default abstract class TypingController {
    public static async getTypings() {
        const cachedTypings = await Database.redis.get("system:typings");
        if (cachedTypings) return JSON.parse(cachedTypings);

        const typings = await Database.pb.collection("typings").getFullList({
            fields: "id,name",
        });

        const typingNames = typings.reduce((acc, typing) => {
            acc[typing.id] = typing.name;
            return acc;
        }, {} as { [key: string]: string });

        // Cache the names for the next hour
        await Database.redis.set("system:typings", JSON.stringify(typingNames), "EX", 3600);
        return typingNames;
    }
}
