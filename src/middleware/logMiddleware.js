import logger from "./utils/log.js";

const log = (req, res, next) => {
    const start = new Date();

    next();

    const ms = new Date - start;
    logger.info(
        `${req.method} ${req.originalUrl}. status: ${req.statuscode}. Duration: ${{ms} ms`,

    )
};

export default log;  
