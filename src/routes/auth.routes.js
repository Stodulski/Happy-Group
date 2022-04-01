import { Router } from "express";
import * as auth from "../controller/auth.controller.js";
import * as verify from "../middleware/verifyAuth.js";
const router = Router();

router.get("/login", verify.verifyAuthReverse, (req, res) => {
    res.render("login");
});

router.get("/register", verify.verifyAuthReverse, (req, res) => {
    res.render("register");
});

router.get("/logout", (req, res) => {
    res.clearCookie("x-access-token").redirect("/login");
});

router.post("/login", auth.checkUser);

router.post("/register", auth.createUser);

export default router;
