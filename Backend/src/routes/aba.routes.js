import express from 'express';
import abaController from '../controllers/aba.controller.js';

const router = express.Router();

router.post('/generate-qrcode', abaController.generateQRCode.bind(abaController));
router.post('/check-transaction', abaController.checkTransaction.bind(abaController));
router.post('/close-transaction', abaController.closeTransaction.bind(abaController));  

export default router;