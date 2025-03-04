import axios, { type AxiosResponse } from 'axios'

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

async function login(credentials: LoginCredentials): Promise<any> {
    return await axios
        .post('/login', credentials)
        .then((response: AxiosResponse) => {
            console.log('Login successful', response)
            return response.data.message
        })
        .catch(
            (error: any) => {
                console.error('Login failed', error)
            }
        )
}

async function register(credentials: RegisterCredentials): Promise<any> {
    return await axios
        .post('/register', credentials)
        .then((response: AxiosResponse) => {
            console.log('Register successful', response)
            return response.data.message
        })
        .catch(
            (error: any) => {
                console.error('Register failed', error)
            }
        )
}

export { RegisterCredentials, LoginCredentials, login, register }
