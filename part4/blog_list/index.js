import app from './app.js';
import * as config from './utils/config.js';
import {loggerInfo} from "./utils/logger.js";


app.listen(config.PORT, () => {
    loggerInfo(`Listening on ${config.PORT}`);
    console.error('This is an error log');
});