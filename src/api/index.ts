import axios from 'axios'
import { setupInterceptors } from './interceptors'
export * as authApi from './authApi'
export * as boardApi from './boardApi'
export * as sectionApi from './sectionApi'
export * as taskApi from './taskApi'

const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

setupInterceptors(AxiosClient)

export default AxiosClient
