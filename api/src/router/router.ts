import { Router } from "express";
import { getIndex } from "../controllers/index";
import { addLink, getLinks, deleteLink, updateLink } from "../controllers/link";
import { updateTags } from "../controllers/link-tags";
import { createUser } from "../controllers/user";

const router: Router = Router();

router.get("/", getIndex);

router.get("/links", getLinks);
router.post("/links", addLink);
router.delete("/links", deleteLink);
router.put("/links", updateLink);

router.put("/link-tags", updateTags);

router.post("/register", createUser);

export default router;
