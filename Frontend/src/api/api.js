import axios from "axios";

const api = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5050",
     timeout: 30000,
     headers:{
          "Content-Type":"application/json"

     }
})


/* Request interceptor if handle which one error server in lcoalhost */
api.interceptors.request.use(
     (config)=>{
          const {method, url ,data} = config;
          console.log(`Request Server: [${String(method ?? '').toUpperCase()}] ${url}`, data ?? '');
          return config;   
     },
     (error)=>{
          console.error(`Request config error: `,error);
          return Promise.reject(error);
     }
);

/* Response interceptor */
api.interceptors.response.use(
     (response)=>{
          console.log(`Response Server: ${response.status} ${response.config.url}`, response.data ?? '');
          return response; 
     },
     (error)=>{
          const status = error.response?.status;
          const errData = error.response?.data;
          console.log(`API Error: ${status ?? 'Networking'}`, errData);

          // Handle specific status codes if error is 401 
          // if(status === 401){
          
          // }
          return Promise.reject(error);
          
     }
)

export default api;