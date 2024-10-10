import Database from "@/utils/database";

export default abstract class UsageController {
    public static async getUsages() {
        const cachedUsages = await Database.redis.get("system:usages");
        if (cachedUsages) return JSON.parse(cachedUsages);

        const usages = await Database.pb.collection("usages").getFullList({
            fields: "id,name",
        });

        const usageNames = usages.reduce((acc, usage) => {
            acc[usage.id] = usage.name;
            return acc;
        }, {} as { [key: string]: string });

        // Cache the names for the next hour
        await Database.redis.set("system:usages", JSON.stringify(usageNames), "EX", 3600);
        return usageNames;
    }
}
