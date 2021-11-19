import { Router } from "express";
import { getIndex } from "../controllers/index";
import { addLink, getLinks, deleteLink, updateLink } from "../controllers/link";
import { updateTags } from "../controllers/link-tags";

const router: Router = Router();

router.get("/", getIndex);

router.get("/links", getLinks);
router.post("/links", addLink);
router.delete("/links", deleteLink);
router.put("/links", updateLink);

router.put("/link-tags", updateTags);

export default router;
