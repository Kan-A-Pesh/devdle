export function getSecondsElapsedToday(): number {
    return Math.floor(Date.now() / 1000) % 86400;
}

export function getRemainingSecondsToday(): number {
    return 86400 - getSecondsElapsedToday();
}
