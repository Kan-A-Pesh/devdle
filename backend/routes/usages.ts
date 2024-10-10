import UsageController from "@/controllers/usages";
import Status from "@/utils/status";
import { NextFunction, Request, Response } from "express";

export async function GET_Usages(req: Request, res: Response, next: NextFunction) {
    return Status.send(req, next, {
        status: 200,
        data: {
            usages: await UsageController.getUsages(),
        },
    });
}
