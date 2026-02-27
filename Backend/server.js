import express from 'express';
import cors from 'cors';

import abaPaymentRoute from './src/routes/aba.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import logger from './src/utils/logger.js';
import abaConfig from './abaConfig.json' with { type: 'json' };

const app = express();
const PORT = abaConfig.PORT ?? 5050;

// Middleware
app.use(cors({
    origin: abaConfig.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Request logging middleware */
app.use((req, res, next)=>{
    logger.info(`${req.method} ${req.path}`);
    next();
});

app.use('/api/payment', abaPaymentRoute);

/* Check health endpoint */
app.get('/health', (req, res)=>{
    res.status(200).json({
        success: 'OK',
        message: 'ABA Server is running',
        timestamp: new Date().toISOString(),
        environment: abaConfig.NODE_ENV
    })
});

/* 404 */
app.use((req, res)=>{
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    })
})


// Error handler (MUST be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    logger.success(`Server running on http://localhost:${PORT}`);
    logger.info(`Environment: ${abaConfig.NODE_ENV ?? 'development'}`);
    logger.info(`Health check: http://localhost:${PORT}/health`);
});

export default app;


