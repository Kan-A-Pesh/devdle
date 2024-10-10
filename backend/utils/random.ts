import globals from "@/env/env";
import seedrandom from "seedrandom";
import crypto from "crypto";

export function randomFromDate(date: Date): number {
    const y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate();

    const seed = globals.env.RANDOM_SEED_STRING.replace(/{year}/, y.toString())
        .replace(/{month}/, m.toString())
        .replace(/{day}/, d.toString());

    return randomFromSeed(seed);
}

export function randomFromSeed(seed: string): number {
    return seedrandom(seed)();
}

export function trueRandom(): number {
    return crypto.randomInt(0, Number.MAX_SAFE_INTEGER) / Number.MAX_SAFE_INTEGER;
}

export function trueRandomHex(length: number): string {
    return crypto.randomBytes(length).toString("hex");
}
