import User from "../models/user.js";
import jwt from "jsonwebtoken";

const options = {
    path: "/",
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24, // 24 horas
    httpOnly: true,
};

export const createUser = async (req, res) => {
    const { username, password, rePassword } = req.body;
    const userFound = await User.findOne({ username });
    if (userFound) {
        req.flash("errorMsg", "¡Usuario ocupado!");
        return res.redirect("/register");
    }
    if (username.length <= 3) {
        req.flash("errorMsg", "¡Usuario muy corto!");
        return res.redirect("/register");
    }
    if (password.length <= 3) {
        req.flash("errorMsg", "¡Contraseña muy corta!");
        return res.redirect("/register");
    }
    if (password !== rePassword) {
        req.flash("errorMsg", "¡Las contraseñas no coinciden!");
        return res.redirect("/register");
    }
    const newUser = new User({
        username: username.toLowerCase(),
        password: await User.encryptPassword(password.toLowerCase()),
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
        expiresIn: 86400,
    });
    return res.cookie("x-access-token", token, options).redirect("/");
};

export const checkUser = async (req, res) => {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username: username.toLowerCase() });
    if (!userFound) {
        req.flash("errorMsg", "¡Usuario no encontrado!");
        return res.redirect("/login");
    }
    const matchPassword = await User.comparePassword(
        password.toLowerCase(),
        userFound.password
    );
    if (!matchPassword) {
        req.flash("errorMsg", "¡Contraseña incorrecta!");
        return res.redirect("/login");
    }

    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
        expiresIn: 86400,
    });
    return res.cookie("x-access-token", token, options).redirect("/");
};
