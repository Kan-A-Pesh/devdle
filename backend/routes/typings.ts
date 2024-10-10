import TypingController from "@/controllers/typings";
import Status from "@/utils/status";
import { NextFunction, Request, Response } from "express";

export async function GET_Typings(req: Request, res: Response, next: NextFunction) {
    return Status.send(req, next, {
        status: 200,
        data: {
            typings: await TypingController.getTypings(),
        },
    });
}
