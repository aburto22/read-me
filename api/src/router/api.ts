import { Router } from "express";
import passport from "passport";
import { addLink, getLinks, deleteLink, updateLink } from "../controllers/link";
import {
  createUser,
  checkAuth,
  userLogout,
  redirectToApp,
  getUsername,
} from "../controllers/user";

const router: Router = Router();

router.get("/links", getLinks);
router.post("/links", addLink);
router.delete("/links", deleteLink);
router.put("/links", updateLink);

router.get("/username", getUsername);

router.post("/register", createUser);

router.get("/login", checkAuth);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  checkAuth
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  redirectToApp
);

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  redirectToApp
);

router.get("/logout", userLogout);

export default router;
