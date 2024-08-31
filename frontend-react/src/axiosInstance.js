import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API 
const axiosInstance = axios.create(
{
    baseURL: baseURL,
    headers:{
        'Content-Type':'application/json'
    }
})


// Request interseptors 

axiosInstance.interceptors.request.use(
    function(config){
        const accsessToken = localStorage.getItem('accessToken')
        if(accsessToken){
            config.headers['Authorization'] = `Bearer ${accsessToken}`
        }
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
)


// Response Intersecptors
axiosInstance.interceptors.response.use(
    function(response){
        return response
    },
    // Handle faild respnse 
  async  function(error){
        const orginalRequest = error.config
        if(error.response.status === 401 && !orginalRequest.retry){
            orginalRequest.retry = true;
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})
                localStorage.setItem('accessToken', response.data.access)
                orginalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(orginalRequest)
            }catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }
        }
        return Promise.reject(error);
    }
)


export default axiosInstance