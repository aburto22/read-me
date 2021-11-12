import { Router } from "express";
import { getIndex } from "../controllers/index";

const router: Router = Router();

router.get("/", getIndex);

export default router;
