import { Router } from "express";
import { getIndex } from "../controllers/index";
import { addLink, getLinks, deleteLink } from "../controllers/link";

const router: Router = Router();

router.get("/", getIndex);

router.get("/links", getLinks);
router.post("/links", addLink);
router.delete("/links", deleteLink);

export default router;
