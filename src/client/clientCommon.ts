import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

function storeToken(token: string): void {
    cookies.set('token', token)
}

function getToken(): string {
    return cookies.get('token');
}

function getAuthenticatedHeader() {
    const token = cookies.get('token')
    return { Authorization: `Bearer ${token}` }
}

function deleteToken(): void {
    cookies.remove('token');
}

export { storeToken, getAuthenticatedHeader, getToken, deleteToken }
