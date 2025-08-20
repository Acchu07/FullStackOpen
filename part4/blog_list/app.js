import express from 'express';
import {loggerError, loggerInfo} from "./utils/logger.js";
import * as config from "./utils/config.js";
import mongoose from "mongoose";
import blogRouter from "./controllers/blog.js";
import userRouter from "./controllers/user.js";
import loginRouter from "./controllers/login.js";
import {getTokenFrom,} from "./utils/Extractor.js";

const app = express();

loggerInfo(`Connecting to `, config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI).then(() => {
    loggerInfo(`MongoDB Connected successfully.`);
}).catch((err) => {
    loggerError(err);
});

app.use(express.json());
app.use(getTokenFrom);

app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);

app.get("/", (req, res) => {
    res.status(200).json({Message: 'Blog List'});
});

export default app;