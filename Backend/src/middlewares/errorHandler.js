import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`, err);
    
    const statusCode = err.statusCode || 500;
    const msg = err.message ?? 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message: msg,


         /* Only show stack trace during development for security, For make sure service is running */
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
}

export default errorHandler;