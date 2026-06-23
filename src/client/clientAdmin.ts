import axios from 'axios'
import { getAuthenticatedHeader } from './clientCommon'

export interface BackendUser {
  id: number
  username: string
  email: string
  role: 'admin' | 'scientist' | 'user'
  created_at?: string
}

interface GetUsersResponse {
  users?: BackendUser[]
}

export async function getAllUsers(): Promise<BackendUser[]> {
  const response = await axios.get('/admin/users', {
    headers: getAuthenticatedHeader(),
  })
  const data = response.data as GetUsersResponse
  return data.users ?? []
}

export async function getScientists(): Promise<BackendUser[]> {
  const users = await getAllUsers()
  return users.filter(u => u.role === 'scientist')
}

export async function promoteUser(id: number): Promise<void> {
  await axios.post(`/admin/users/${id}/promote`, {}, {
    headers: getAuthenticatedHeader(),
  })
}

export async function demoteUser(id: number): Promise<void> {
  await axios.post(`/admin/users/${id}/demote`, {}, {
    headers: getAuthenticatedHeader(),
  })
}

export async function deleteAdminUser(id: number): Promise<void> {
  await axios.delete(`/admin/users/${id}`, {
    headers: getAuthenticatedHeader(),
  })
}

export async function addScientist(username: string, email: string): Promise<void> {
  await axios.post(
    '/admin/scientists',
    { username, email },
    { headers: getAuthenticatedHeader() },
  )
}

export async function deleteScientist(id: number): Promise<void> {
  await axios.delete(`/admin/scientists/${id}`, {
    headers: getAuthenticatedHeader(),
  })
}
