import * as dotenv from "dotenv";
import app from "./server.js";
import logger from "./modules/logger.js";

dotenv.config();

const port = process.env.PORT || 7777;

app.listen(port, () => {
    logger.info(`listening on http://localhost:${port}`);
});