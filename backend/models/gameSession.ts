import { LanguagesRecord } from "@/types/pocketbase";
import { CompareStatus } from "@/utils/compare";

export type LanguageExport = Omit<LanguagesRecord, "order_id" | "id">;
export type LanguageCompare = Omit<LanguageExport, "icon">;
export type LanguageCompareKeys = keyof LanguageCompare;

export type Comparaison = {
    [key in LanguageCompareKeys]: CompareStatus;
};

export type GameSessionGuess = {
    id: string;
    data: LanguageExport;
    comparison: Comparaison;
};

export class GameSession {
    public correct: boolean;
    public guesses: GameSessionGuess[];

    constructor() {
        this.correct = false;
        this.guesses = [];
    }
}
