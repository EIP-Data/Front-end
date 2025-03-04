import axios, {AxiosError} from 'axios'
import type {AxiosResponse} from 'axios'
import type {Router} from 'vue-router'

export function configureAxios(router: Router): void {
    axios.defaults.baseURL = "http://localhost:8080"
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE'
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