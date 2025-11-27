import axios, {AxiosError} from 'axios'
import type {Router} from 'vue-router'

export function configureAxios(router: Router): void {
    axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT
    axios.defaults.headers.common['Content-Type'] = 'application/json'

    axios.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error?.response?.status === 401) {
                router.push('/login').catch(console.warn)
            }
            return Promise.reject(error)
        }
    )
}