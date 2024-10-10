export enum CompareStatus {
    DIFFERENT,
    PARTIAL,
    EXACT,
    TOO_SMALL,
    TOO_BIG,
    UNCOMPATIBLE,
}

export default function compare(compareAny?: string | number | string[], withAny?: string | number | string[]): CompareStatus {
    if (typeof compareAny !== typeof withAny) return CompareStatus.UNCOMPATIBLE;

    if (typeof compareAny === "string" && typeof withAny === "string") return compareString(compareAny, withAny);
    if (typeof compareAny === "number" && typeof withAny === "number") return compareNumber(compareAny, withAny);
    if (Array.isArray(compareAny) && Array.isArray(withAny)) return compareArray(compareAny, withAny);

    return CompareStatus.UNCOMPATIBLE;
}

export function compareString(compareString: string, withString: string): CompareStatus {
    if (compareString === withString) {
        return CompareStatus.EXACT;
    }

    if (compareString.includes(withString) || withString.includes(compareString)) {
        return CompareStatus.PARTIAL;
    }

    return CompareStatus.DIFFERENT;
}

export function compareNumber(compareNumber: number, withNumber: number): CompareStatus {
    if (compareNumber === withNumber) {
        return CompareStatus.EXACT;
    }

    if (compareNumber < withNumber) {
        return CompareStatus.TOO_SMALL;
    }

    if (compareNumber > withNumber) {
        return CompareStatus.TOO_BIG;
    }

    return CompareStatus.DIFFERENT;
}

export function compareArray(compareArray: string[], withArray: string[]): CompareStatus {
    if (JSON.stringify(compareArray) === JSON.stringify(withArray)) {
        return CompareStatus.EXACT;
    }

    compareArray.forEach((compareString) => {
        if (withArray.includes(compareString)) {
            return CompareStatus.PARTIAL;
        }
    });

    return CompareStatus.DIFFERENT;
}
