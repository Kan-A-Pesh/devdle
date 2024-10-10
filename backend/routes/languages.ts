import LanguageController from "@/controllers/language";
import Status from "@/utils/status";
import { NextFunction, Request, Response } from "express";

export async function GET_Languages(req: Request, res: Response, next: NextFunction) {
    return Status.send(req, next, {
        status: 200,
        data: {
            languages: await LanguageController.getLanguageNames(),
        },
    });
}
