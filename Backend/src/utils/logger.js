export const logger ={
    info: (msg, data=null)=>{
        console.log(`Information: ${msg}`, data ?? '');
    },
    error: (msg, data=null) =>{
        console.error(`Error: ${msg}`, data ?? '');
    },
    success: (msg, data = null) => {
        console.log(`Success: ${msg}`, data ?? '');
    },
    request: (method, url, data = null)=>{
       console.log(`Request: ${method} ${url}`, data ?? ''); 
    },
    response: (status, data= null)=>{
        console.log(`Response: ${status}`, data ?? '');  
    },
    warn: (msg, data = null) => {
        console.warn(`Warning: ${msg}`, data ?? '');
    }
}

export default logger;