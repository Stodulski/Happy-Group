import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import flash from "connect-flash";
import session from "express-session";
import "dotenv/config";

const app = express();

// Defino rutas
import routes from "./routes/routes.js";
import authRoutes from "./routes/auth.routes.js";

// Configuracion
app.set("PORT", process.env.PORT || 3000); // Puerto
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// Variables globales
app.use((req, res, next) => {
    app.locals.token = req.cookies["x-access-token"];
    app.locals.errorMsg = req.flash("errorMsg");
    next();
});

// Renovar variables al entrar a cierta URL
app.get("/", (req, res, next) => {
    app.locals.token = req.cookies["x-access-token"];
    next();
});

// Estaticos
app.use("/public", express.static(path.join(__dirname, "./public")));

// Uso las rutas
app.use(authRoutes);
app.use(routes);

export default app;
