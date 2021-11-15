import { Router } from "express";
import { getIndex } from "../controllers/index";
import { addLink, getLinks, deleteLink, updateLink } from "../controllers/link";

const router: Router = Router();

router.get("/", getIndex);

router.get("/links", getLinks);
router.post("/links", addLink);
router.delete("/links", deleteLink);
router.put("/links", updateLink);

export default router;
