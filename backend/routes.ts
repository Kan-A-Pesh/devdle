import { Router } from "express";
import Route_Index from "./routes/index";
import { GET_Games, POST_Games, PUT_Games } from "./routes/games";
import { GET_Languages } from "./routes/languages";
import { GET_Typings } from "./routes/typings";
import { GET_Usages } from "./routes/usages";
import { GET_Paradigms } from "./routes/paradigms";

const router = Router();

router.get("/", Route_Index);

router.get("/games", GET_Games);
router.post("/games", POST_Games);
router.put("/games", PUT_Games);

router.get("/languages", GET_Languages);
router.get("/paradigms", GET_Paradigms);
router.get("/typings", GET_Typings);
router.get("/usages", GET_Usages);

export default router;
