import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        password: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, otherPassword) => {
    return await bcrypt.compare(password, otherPassword);
};

export default mongoose.model("User", userSchema);
