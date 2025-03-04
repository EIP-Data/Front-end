import axios, { type AxiosResponse } from 'axios'
import {storeToken} from '@/client/clientCommon'

type RegisterCredentials = {
    username: string
    password: string
    email: string
}

type LoginCredentials = {
    username: string
    password: string
}

function decodeJwt(token: string): any {
    try {
        const payloadBase64 = token.split('.')[1];
        const payload = atob(payloadBase64);
        return JSON.parse(payload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}

async function login(credentials: any): Promise<any> {
    try {
        const response: AxiosResponse = await axios.post<any>('/login', credentials)
        storeToken(response.data.jwt);
        const userStore = useUserStore();
        const jwt = decodeJwt(response.data.jwt);
        userStore.loginUser(jwt.username);
        return response.data.message
    } catch (error) {
        console.error('Login failed', error)
        throw error
    }
}

async function register(credentials: RegisterInfo): Promise<any> {
    return await axios
        .post('/register', credentials)
        .then((response: AxiosResponse) => {
            console.log('Register successful', response)
            return response.data.message
        })
        .catch(
            (error: any) => {
                console.error('Register failed', error)
                return reject('Register failed')
            }
        )
}

export { RegisterCredentials, LoginCredentials, login, register }
