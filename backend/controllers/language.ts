import Logger from "@/log/logger";
import { Comparaison, LanguageCompare, LanguageCompareKeys } from "@/models/gameSession";
import { LanguagesRecord } from "@/types/pocketbase";
import compare, { CompareStatus } from "@/utils/compare";
import Database from "@/utils/database";
import { getRemainingSecondsToday } from "@/utils/date";
import { randomFromDate } from "@/utils/random";

export default abstract class LanguageController {
    public static async getDailyLanguage() {
        // Check if the daily language id is cached
        const cachedId = await Database.redis.get("system:dailyLanguageId");
        if (cachedId) {
            const language = await Database.pb.collection("languages").getOne(cachedId);
            return language;
        }

        Logger.log("LanguageController::getDailyLanguage | No cached language id found");
        Logger.log("LanguageController::getDailyLanguage | Getting random language and recalculating order");

        await LanguageController.recalculateLanguageOrder();

        const randomNumber = randomFromDate(new Date());

        // Get the total number of languages
        const { totalItems } = await Database.pb.collection("languages").getList(1, 1);
        const randomId = Math.floor(randomNumber * totalItems);

        const language = await Database.pb
            .collection("languages")
            .getFirstListItem(Database.pb.filter("order_id = {:id}", { id: randomId }));

        // Cache the id for the rest of the day
        await Database.redis.set("system:dailyLanguageId", language.id, "EX", getRemainingSecondsToday());

        return language;
    }

    public static compareLanguages(
        compareLanguage: LanguagesRecord,
        withLanguage: LanguagesRecord,
    ): {
        exact: boolean;
        partial: Comparaison;
    } {
        const compareLang = compareLanguage as LanguageCompare;
        const withLang = withLanguage as LanguageCompare;

        const comparaison = Object.keys(compareLang).reduce((acc, key) => {
            const typedKey = key as LanguageCompareKeys;

            return {
                ...acc,
                [key]: compare(compareLang[typedKey], withLang[typedKey]),
            };
        }, {} as Comparaison);

        return {
            exact: compareLanguage.name === withLanguage.name,
            partial: comparaison as Comparaison,
        };
    }

    public static async recalculateLanguageOrder() {
        const languages = await Database.pb.collection("languages").getFullList({
            sort: "order_id",
        });

        for (let i = 0; i < languages.length; i++) {
            if (languages[i].order_id === i) continue;

            languages[i].order_id = i;
            await Database.pb.collection("languages").update(languages[i].id, languages[i]);
        }
    }

    public static async getLanguageById(id: string) {
        try {
            return await Database.pb.collection("languages").getOne(id);
        } catch (e) {
            return null;
        }
    }

    public static async getLanguageNames(): Promise<{ [key: string]: string }> {
        const cachedNames = await Database.redis.get("system:languageNames");
        if (cachedNames) return JSON.parse(cachedNames);

        const languages = await Database.pb.collection("languages").getFullList({
            fields: "id,name",
        });

        const languageNames = languages.reduce((acc, language) => {
            acc[language.id] = language.name;
            return acc;
        }, {} as { [key: string]: string });

        // Cache the names for the rest of the day
        await Database.redis.set("system:languageNames", JSON.stringify(languageNames), "EX", getRemainingSecondsToday());
        return languageNames;
    }
}
