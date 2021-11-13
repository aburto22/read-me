import { Router } from "express";
import { getIndex } from "../controllers/index";
import { addLink, getLinks } from "../controllers/link";

const router: Router = Router();

router.get("/", getIndex);

router.get("/links", getLinks);
router.post("/links", addLink);

export default router;
