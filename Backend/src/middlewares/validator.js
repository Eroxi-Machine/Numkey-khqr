/* Validation QRCode when it generated request */
export const validateGenerateQRCode = (req, res, next)=>{
    const {amount, currency} = req.body;
    
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
