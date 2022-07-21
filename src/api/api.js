import axios from "axios";
export const api = axios.create({
  headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")} ${localStorage.getItem("refreshToken")}` },
  withCredentials: true
})

const DevUrl = "http://localhost:3001/api"
const ProductionUrl = "https://cookie-test-server-1903.herokuapp.com/api"

export const baseUrl = ProductionUrl

api.interceptors.response.use((config) => {
  return config
}, async (error) =>{
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    error.config._isRetry = true
    try {
      const response = await axios.get(`${baseUrl}/refresh`, 
        {headers: { 'Authorization': 
          `Bearer ${localStorage.getItem("accessToken")} ${localStorage.getItem("refreshToken")}` }}, 
        {withCredentials : true})
      console.log('interceptor', response.data)
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken} ${response.data.refreshToken}`
      console.log('OriginalRequest: ', originalRequest)
      return api.request(originalRequest)
    } catch (error) {
      console.log("Unauthorized") 
    }
  }
  throw error
})
