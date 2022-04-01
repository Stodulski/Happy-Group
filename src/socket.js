import app from "./index.js";
import jwt from "jsonwebtoken";
import User from "./models/user.js";

let server = app.listen(app.get("PORT"), () => {
    console.log("Servidor en puerto " + app.get("PORT"));
});

import { Server } from "socket.io";

const io = new Server(server);

io.on("connection", async (socket) => {
    // obtengo ID del usuario
    let token = app.locals.token;
    if (token == undefined) return;
    let decoded = jwt.verify(token, process.env.SECRET);
    let userId = decoded.id;
    let userFound = await User.findById(userId, {password: 0});
    let username = userFound.username;
    // peticiones sockets
    socket.broadcast.emit("newUser", username);
    socket.on("newMessage", (mensaje) => {
        socket.broadcast.emit("receiveMessage", {
            mensaje,
            username,
        });
        socket.emit("sendMessage", {
            mensaje,
            username,
        });
    });
});
