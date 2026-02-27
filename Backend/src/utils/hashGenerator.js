import CryptoJs from 'crypto-js';

/* Generate a time-stamp for format: YYYYMMDDHHmmss (UTC) Asia */
export const generateRequestTime = () =>{
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0' );
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

/* Generate a hash value for a given string */
const normalizeValue = (value) => (value === null || value === undefined ? '' : String(value));

export const generateQRHash = (payload, apiKey) => {
    if (!apiKey) throw new Error('API key is required to generate QR hash');

    const stringBeforeHash =
        normalizeValue(payload.req_time) +
        normalizeValue(payload.merchant_id) +
        normalizeValue(payload.tran_id) +
        normalizeValue(payload.amount) +
        normalizeValue(payload.items) +
        normalizeValue(payload.first_name) +
        normalizeValue(payload.last_name) +
        normalizeValue(payload.email) +
        normalizeValue(payload.phone) +
        normalizeValue(payload.purchase_type) +
        normalizeValue(payload.payment_option) +
        normalizeValue(payload.callback_url) +
        normalizeValue(payload.return_deeplink) +
        normalizeValue(payload.currency) +
        normalizeValue(payload.custom_fields) +
        normalizeValue(payload.return_params) +
        normalizeValue(payload.payout) +
        normalizeValue(payload.lifetime) +
        normalizeValue(payload.qr_image_template);

    /* hashString unique 256-bit, output WordArray and Cryptp.enc(..) Convert Base64 */
    return CryptoJs.enc.Base64.stringify(
        CryptoJs.HmacSHA512(stringBeforeHash, apiKey)
    );
}

/* Generate a hash check transaction */
export const generateCheckTransactionHash = (req_time, merchant_id, tran_id, apiKey) =>{
     if (!apiKey) throw new Error('API key is required to generate check-transaction hash');
     const stringBeforHash = req_time + merchant_id + tran_id;
     return CryptoJs.enc.Base64.stringify(
        CryptoJs.HmacSHA512(stringBeforHash, apiKey)
     );
}

/* Generate tran_id = TX + timestamp */
export const generateTransactionId = () => `TX${Date.now()}`;