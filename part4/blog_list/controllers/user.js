import express from "express";
import bcrypt from "bcrypt";
import user from "../models/users.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    const allUsers = await user.find({}).populate("blogs");
    res.status(200).json(allUsers);
});

userRouter.post("/", async (req, res) => {
    const {username, name, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({errorMessage: "Username or password missing"});
    }

    if (username.length < 3 || password.length < 3) {
        return res.status(400).json({errorMessage: "Username or password not 3 char long"});
    }

    const existingUser = await user.findOne({username});
    if (existingUser) {
        return res.status(400).json({errorMessage: "Username already in DB"});
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userDoc = new user({
        username,
        name,
        passwordHash,
    });

    const savedUser = await userDoc.save();
    res.status(201).json(savedUser);
});

export default userRouter;