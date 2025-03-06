import axios, {type AxiosResponse} from 'axios'
import { useUserStore } from '@/stores/userStore'
import {storeToken} from "./clientCommon.ts";

type RegisterCredentials = {
    username: string
    password: string
    email: string
}

type LoginCredentials = {
    email: string
    password: string
}

type RegisterResponse = {
    email: string,
    jwt: string,
    username: string
}

type LoginResponse = {
    jwt: string
}

async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    return await axios
        .post('/login', credentials)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                console.error('Login failed', response)
                return;
            }
            console.log('Login successful', response)
            let data = response.data as LoginResponse;
            const userStore = useUserStore();
            userStore.setEmail(credentials.email);
            storeToken(data.jwt);
            return response.data as LoginResponse;
        })
        .catch(
            (error: any) => {
                console.error('Login failed', error)
            }
        )
}

async function register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    return await axios
        .post('/register', credentials)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                console.error('Login failed', response)
                return;
            }
            console.log('Register successful', response);
            let data = response.data as RegisterResponse;
            const userStore = useUserStore();
            userStore.setInformation(data.username, data.email);
            storeToken(data.jwt);
            return data;
        })
        .catch(
            (error: any) => {
                console.error('Register failed', error)
            }
        )
}

export {RegisterCredentials, LoginCredentials, login, register}
