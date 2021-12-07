import { Router } from "express";
import passport from "passport";
import { getIndex } from "../controllers/index";
import { addLink, getLinks, deleteLink, updateLink } from "../controllers/link";
import {
  createUser,
  checkAuth,
  userLogout,
  redirectToApp,
  getUsername,
} from "../controllers/user";

const router: Router = Router();

router.get("/", getIndex);

router.get("/api/links", getLinks);
router.post("/api/links", addLink);
router.delete("/api/links", deleteLink);
router.put("/api/links", updateLink);

router.get("/api/username", getUsername);

router.post("/api/register", createUser);

router.get("/api/login", checkAuth);
router.post(
  "/api/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  checkAuth
);

router.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/api/auth/google/callback",
  passport.authenticate("google"),
  redirectToApp
);

router.get("/api/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/api/auth/facebook/callback",
  passport.authenticate("facebook"),
  redirectToApp
);

router.get("/api/logout", userLogout);

router.use(getIndex);

export default router;
