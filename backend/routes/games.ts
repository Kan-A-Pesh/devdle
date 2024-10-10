import GameSessionController from "@/controllers/game-session";
import LanguageController from "@/controllers/language";
import { LanguageExport } from "@/models/gameSession";
import Status from "@/utils/status";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function GET_Games(req: Request, res: Response, next: NextFunction) {
    const headers = z
        .object({
            "x-session-id": z.string(),
        })
        .safeParse(req.headers);

    if (!headers.success) {
        return Status.send(req, next, {
            status: 400,
            error: "errors.invalid_request",
        });
    }

    const sessionId = headers.data["x-session-id"];

    const gameSession = await GameSessionController.getGameSession(sessionId);

    if (!gameSession) {
        return Status.send(req, next, {
            status: 404,
            error: "errors.not_found",
        });
    }

    return Status.send(req, next, {
        status: 200,
        data: {
            gameSession,
        },
    });
}

export async function POST_Games(req: Request, res: Response, next: NextFunction) {
    const sessionId = await GameSessionController.createGameSession();
    return Status.send(req, next, {
        status: 201,
        data: {
            sessionId,
        },
    });
}

export async function PUT_Games(req: Request, res: Response, next: NextFunction) {
    const headers = z
        .object({
            "x-session-id": z.string(),
        })
        .safeParse(req.headers);

    const body = z
        .object({
            guessId: z.string(),
        })
        .safeParse(req.body);

    if (!headers.success || !body.success) {
        return Status.send(req, next, {
            status: 400,
            error: "errors.invalid_request",
        });
    }

    const sessionId = headers.data["x-session-id"];
    const guessId = body.data.guessId;

    const gameSession = await GameSessionController.getGameSession(sessionId);

    if (!gameSession) {
        return Status.send(req, next, {
            status: 404,
            error: "errors.not_found",
        });
    }

    if (gameSession.correct) {
        return Status.send(req, next, {
            status: 409,
            error: "errors.conflict",
        });
    }

    const language = await LanguageController.getLanguageById(guessId);
    const todayLanguage = await LanguageController.getDailyLanguage();

    if (!language) {
        return Status.send(req, next, {
            status: 404,
            error: "errors.not_found",
        });
    }

    if (gameSession.guesses.some((guess) => guess.id === language.id)) {
        return Status.send(req, next, {
            status: 409,
            error: "errors.conflict",
        });
    }

    const isCorrect = LanguageController.compareLanguages(language, todayLanguage);

    console.debug("games.ts::PUT_Games - isCorrect ||", isCorrect);

    await GameSessionController.appendGameSession(sessionId, {
        id: language.id,
        data: language as LanguageExport,
        comparison: isCorrect.partial,
    });

    if (isCorrect.exact) {
        await GameSessionController.setGameSessionCorrect(sessionId, true);
        // TODO: Add points to an account
    }

    return Status.send(req, next, {
        status: 201,
        data: {
            gameSession: await GameSessionController.getGameSession(sessionId),
        },
    });
}
