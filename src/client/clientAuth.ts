import axios, {type AxiosResponse} from 'axios'
import { useUserStore } from '@/stores/userStore'
import { storeToken, getAuthenticatedHeader } from "./clientCommon.ts";
import { type BackendRole, mapBackendRole } from '@/types/permissions';

type RegisterCredentials = {
    username: string
    password: string
    email: string
}

type LoginCredentials = {
    email: string
    password: string
    remember?: boolean
}

type RegisterResponse = {
    email: string,
    jwt: string,
    username: string
}

type LoginResponse = {
    jwt: string
    role: BackendRole
}

type CurrentUserResponse = {
    user: {
        email: string
        username: string
        token: string
        role: BackendRole
    }
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

type VerifyEmailResponse = {
    message: string
}

type ResendVerificationResponse = {
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
            userStore.login(credentials.email, mapBackendRole(data.role));
            storeToken(data.jwt, credentials.remember);
            return data;
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
            return data;
        })
        .catch(
            (error: Error) => {
                console.error('Register failed', error)
                throw error;
            }
        )
}

async function verifyEmail(token: string): Promise<VerifyEmailResponse> {
    return axios
        .get('/verify-email', { params: { token } })
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                console.error('Email verification failed', response)
                throw new Error('Email verification failed');
            }
            console.log('Email verification successful', response);
            return response.data as VerifyEmailResponse;
        })
        .catch(
            (error: Error) => {
                console.error('Email verification failed', error)
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

async function resendVerificationEmail(email: string): Promise<ResendVerificationResponse> {
    return axios
        .post('/resend-verification', { email })
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                throw new Error('Failed to resend verification email');
            }
            return response.data as ResendVerificationResponse;
        })
        .catch((error: Error) => {
            console.error('Resend verification failed', error)
            throw error;
        })
}

async function deleteAccount(): Promise<void> {
    return axios
        .delete('/user', { headers: getAuthenticatedHeader() })
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                throw new Error('Failed to delete account');
            }
        })
        .catch((error: Error) => {
            console.error('Delete account failed', error);
            throw error;
        });
}

async function fetchCurrentUser(): Promise<void> {
    const userStore = useUserStore();
    const response = await axios.get('/user', { headers: getAuthenticatedHeader() });
    const { user } = response.data as CurrentUserResponse;
    userStore.setInformation(user.username, user.email);
    userStore.setRole(mapBackendRole(user.role));
}

export type {RegisterCredentials, LoginCredentials, ForgotPasswordRequest, ResetPasswordRequest}
export {login, register, forgotPassword, resetPassword, verifyEmail, fetchCurrentUser, resendVerificationEmail, deleteAccount}
