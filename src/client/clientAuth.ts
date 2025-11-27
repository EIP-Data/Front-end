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

type ForgotPasswordRequest = {
    email: string
}

type ForgotPasswordResponse = {
    message: string
}

type ResetPasswordRequest = {
    token: string
    new_password: string
}

type ResetPasswordResponse = {
    message: string
}

async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    return axios
        .post('/login', credentials)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                console.error('Login failed', response)
                throw new Error('Login failed');
            }
            console.log('Login successful', response)
            const data = response.data as LoginResponse;
            const userStore = useUserStore();
            userStore.setEmail(credentials.email);
            storeToken(data.jwt);
            return response.data as LoginResponse;
        })
        .catch(
            (error: Error) => {
                console.error('Login failed', error)
                throw error;
            }
        )
}

async function register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    return axios
        .post('/register', credentials)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                console.error('Register failed', response)
                throw new Error('Register failed');
            }
            console.log('Register successful', response);
            const data = response.data as RegisterResponse;
            const userStore = useUserStore();
            userStore.setInformation(data.username, data.email);
            storeToken(data.jwt);
            return data;
        })
        .catch(
            (error: Error) => {
                console.error('Register failed', error)
                throw error;
            }
        )
}

async function forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return axios
        .post('/password-reset/request', request)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                console.error('Forgot password request failed', response)
                throw new Error('Forgot password request failed');
            }
            console.log('Forgot password request successful', response);
            return response.data as ForgotPasswordResponse;
        })
        .catch(
            (error: Error) => {
                console.error('Forgot password request failed', error)
                throw error;
            }
        )
}

async function resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return axios
        .post('/password-reset/confirm', request)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                console.error('Reset password failed', response)
                throw new Error('Reset password failed');
            }
            console.log('Reset password successful', response);
            return response.data as ResetPasswordResponse;
        })
        .catch(
            (error: Error) => {
                console.error('Reset password failed', error)
                throw error;
            }
        )
}

export type {RegisterCredentials, LoginCredentials, ForgotPasswordRequest, ResetPasswordRequest}
export {login, register, forgotPassword, resetPassword}
