import { Router } from "express";
const router = Router();
import * as verify from "../middleware/verifyAuth.js";

router.get("/", verify.verifyAuth);

router.all("*", (req, res) => {
    res.status(404).redirect("/");
});

export default router;
