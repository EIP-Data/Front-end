import axios, {AxiosError} from 'axios'
import type {AxiosResponse} from 'axios'
import type {Router} from 'vue-router'

export function configureAxios(router: Router): void {
    axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT
    axios.defaults.headers.common['Content-Type'] = 'application/json'

    axios.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (!error?.response) return
            const response: AxiosResponse = error.response

            if (response.status && response.status === 401) router.push('/').catch(console.warn)
        }
    )
}