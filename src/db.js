import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE);

mongoose.connection.once("open", () => {
    console.log("Base de datos conectada");
});
