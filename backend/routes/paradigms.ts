import ParadigmController from "@/controllers/paradigms";
import Status from "@/utils/status";
import { NextFunction, Request, Response } from "express";

export async function GET_Paradigms(req: Request, res: Response, next: NextFunction) {
    return Status.send(req, next, {
        status: 200,
        data: {
            paradigms: await ParadigmController.getParadigms(),
        },
    });
}
