import { GameSession, GameSessionGuess } from "@/models/gameSession";
import Database from "@/utils/database";
import { getRemainingSecondsToday } from "@/utils/date";
import { trueRandomHex } from "@/utils/random";

export default abstract class GameSessionController {
    public static async createGameSession() {
        // Create a new game session
        const sessionId = trueRandomHex(64);
        await Database.redis.set(`gameSession:${sessionId}`, JSON.stringify(new GameSession()), "EX", getRemainingSecondsToday());
        return sessionId;
    }

    public static async getGameSession(sessionId: string) {
        const gameSession = await Database.redis.get(`gameSession:${sessionId}`);
        return gameSession ? (JSON.parse(gameSession) as GameSession) : null;
    }

    public static async updateGameSession(sessionId: string, gameSession: GameSession) {
        await Database.redis.set(`gameSession:${sessionId}`, JSON.stringify(gameSession), "EX", getRemainingSecondsToday());
    }

    public static async appendGameSession(sessionId: string, gameSessionGuess: GameSessionGuess) {
        const currentGameSession = await GameSessionController.getGameSession(sessionId);
        if (!currentGameSession) return null;

        currentGameSession.guesses.push(gameSessionGuess);
        await GameSessionController.updateGameSession(sessionId, currentGameSession);

        return currentGameSession;
    }

    public static async setGameSessionCorrect(sessionId: string, correct: boolean = true) {
        const currentGameSession = await GameSessionController.getGameSession(sessionId);
        if (!currentGameSession) return null;

        currentGameSession.correct = correct;
        await GameSessionController.updateGameSession(sessionId, currentGameSession);

        return currentGameSession;
    }

    public static async deleteGameSession(sessionId: string) {
        await Database.redis.del(`gameSession:${sessionId}`);
    }
}
