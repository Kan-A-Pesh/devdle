import Database from "@/utils/database";

export default abstract class ParadigmController {
    public static async getParadigms() {
        const cachedParadigms = await Database.redis.get("system:paradigms");
        if (cachedParadigms) return JSON.parse(cachedParadigms);

        const paradigms = await Database.pb.collection("paradigms").getFullList({
            fields: "id,name",
        });

        const paradigmNames = paradigms.reduce((acc, paradigm) => {
            acc[paradigm.id] = paradigm.name;
            return acc;
        }, {} as { [key: string]: string });

        // Cache the names for the next hour
        await Database.redis.set("system:paradigms", JSON.stringify(paradigmNames), "EX", 3600);
        return paradigmNames;
    }
}
