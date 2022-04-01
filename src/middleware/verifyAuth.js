import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
    const token = req.cookies["x-access-token"];
    if (!token) return res.redirect("/login");
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    const searchUser = await User.findById(req.userId, { password: 0 });
    if (!searchUser) return res.redirect("/login");
    res.status(200).render("home");
};
export const verifyAuthReverse = async (req, res, next) => {
    const token = req.cookies["x-access-token"];
    if (token) return res.redirect("/");
    const searchUser = await User.findById(req.userId, { password: 0 });
    if (searchUser) return res.redirect("/");
    next();
};
