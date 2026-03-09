/* Validation QRCode when it generated request */
export const validateGenerateQRCode = (req, res, next)=>{
    const {amount, lifetime} = req.body;
    const currency = String(req.body.currency ?? 'KHR').toUpperCase();
    req.body.currency = currency;
    
    if(!amount || typeof amount !== 'number' || amount <= 0 ){
        return res.status(400).json({
            success: false,
            message: 'Invalid request data. Please provide valid amount and currency.'
        })
    }
    
    /* validation currency */
    const validCurrencies = ['KHR', 'USD'];
    if(!validCurrencies.includes(currency)){
        return res.status(400).json({
            success: false,
            message: 'Invalid currency must be KHR or USD only.'
        })
    }
    
    if(currency === 'USD' && amount < 0.01){
        return res.status(400).json({
            success: false,
            message: 'Invalid amount. Minimum for USD is 0.01.'
        })
    }

    if (lifetime !== undefined && lifetime !== null && lifetime !== '') {
        const lifetimeValue = Number(lifetime);

        if (!Number.isInteger(lifetimeValue) || lifetimeValue < 3 || lifetimeValue > 43200) {
            return res.status(400).json({
                success: false,
                message: 'Invalid lifetime. It must be an integer between 3 and 43200 seconds.'
            })
        }

        req.body.lifetime = lifetimeValue;
    }
    
    next();
};

/* Validation check transaction */
export const validatCheckTransaction = (req, res, next) => {
    const {tran_id} = req.body;
    
    if(!tran_id){
        return res.status(400).json({
            success: false,
            message: 'Transaction ID is required.'
        })
    }
    
    next();
}
