import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

function storeToken(token: string): void {
    cookies.set('token', token)
}

function getAuthenticatedHeader() {
    const token = cookies.get('token')

    return { Authorization: `Bearer ${token}` }
}

function generateAuthenticatedHeader(token: string) {
    return { Authorization: `Bearer ${token}` }
}

function deleteToken(): void {
    cookies.remove('token');
}

interface LoginCredentials {
    username: string
    password: string
}

interface RegisterCredentials {
    username: string
    email: string
    password: string
}

interface AuthResponse {
    access_token: string
    token_type: string
}

export { storeToken, getAuthenticatedHeader, generateAuthenticatedHeader, deleteToken, type RegisterCredentials, type LoginCredentials, type AuthResponse }
