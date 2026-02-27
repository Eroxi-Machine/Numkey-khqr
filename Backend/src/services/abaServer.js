import abaConfig from '../config/aba.config.js';
import logger from '../utils/logger.js';

class ABAServer{

    /* Call api from ABA */
    async callApi(endpoint, payload){
        try {
            const url = `${abaConfig.baseUrl}${endpoint}`;
            console.log(url);

            /* log info when rest api form ABA */
            logger.request('POST', url, payload);
            const res = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', 
                },
                body: JSON.stringify(payload)
            });
            const responseText = await res.text();
            if(!res.ok){
                logger.error('ABA API error response:', responseText);
                const error = new Error(`HTTP error! status: ${res.status}${responseText ? ` - ${responseText}` : ''}`);
                error.httpStatus = res.status;
                try {
                    error.apiResponse = responseText ? JSON.parse(responseText) : {};
                } catch {
                    error.apiResponse = { raw: responseText };
                }
                throw error;
            }
            let data = {};
            try {
                data = responseText ? JSON.parse(responseText) : {};
            } catch (parseError) {
                data = { raw: responseText };
            }
            logger.response(res.status, data);
            return data;
        } catch (error) {
            logger.error('Error calling ABA API:', error);
            throw error;
        }
    }

    /* Genrate QRCode via ABA api */
    async generateQRCode(payload){
        return await this.callApi(abaConfig.endpoint.generateQRCode, payload);
    }

    /* Check transaction via ABA api */
    async checkTransaction(payload){
        return await this.callApi(abaConfig.endpoint.checkTransaction, payload);
    }

    /* Close transaction via ABA api */
    async closeTransaction(payload){
        return await this.callApi(abaConfig.endpoint.closeTransaction, payload);
    }
}

/* Export a single instance (Singleton pattern) */
export default new ABAServer();