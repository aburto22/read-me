import { Router } from "express";
import passport from "passport";
import { check } from "express-validator";
import { addLink, getLinks, deleteLink, updateLink } from "../controllers/link";
import {
  loginErrorHandler,
  checkValidatorErrors,
} from "../helpers/errorHandler";
import {
  createUser,
  checkAuth,
  userLogout,
  redirectToApp,
  getUsername,
} from "../controllers/user";
import { sanitizeUrl, sanitizeTags } from "../helpers/sanitizers";

const router: Router = Router();

router.get("/links", getLinks);
router.post(
  "/links",
  [
    check("link").customSanitizer(sanitizeUrl).isURL(),
    check("tags").customSanitizer(sanitizeTags),
  ],
  checkValidatorErrors,
  addLink
);
router.delete("/links", deleteLink);
router.put("/links", [check("tags").customSanitizer(sanitizeTags)], updateLink);

router.get("/username", getUsername);

router.post(
  "/register",
  [
    check("username").isLength({ min: 5 }).trim().escape(),
    check("email").trim().escape().isEmail().normalizeEmail(),
    check("password").isLength({ min: 5 }).trim().escape(),
  ],
  checkValidatorErrors,
  createUser
);

router.get("/login", checkAuth);
router.post(
  "/login",
  [
    check("email").trim().escape().isEmail().normalizeEmail(),
    check("password").isLength({ min: 5 }).trim().escape(),
  ],
  checkValidatorErrors,
  passport.authenticate("local"),
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
  redirectToApp,
  loginErrorHandler
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  redirectToApp,
  loginErrorHandler
);

router.get("/logout", userLogout);

export default router;
