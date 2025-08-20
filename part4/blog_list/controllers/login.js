import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import user from "../models/users.js";

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body;

    const userPresent = await user.findOne({username});
    const passwordCorrect = userPresent === null
        ? false
        : await bcrypt.compare(password, userPresent.passwordHash);

    if (!(userPresent && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = {
        username: userPresent.username,
        id: userPresent._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
        .status(200)
        .send({token, username: userPresent.username, name: userPresent.name});
});

export default loginRouter;