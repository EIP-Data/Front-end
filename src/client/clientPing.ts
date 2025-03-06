import axios, { type AxiosResponse } from 'axios'
import {getAuthenticatedHeader} from "./clientCommon.ts";

async function ping(): Promise<any> {
    return await axios
        .get('/ping')
        .then((response: AxiosResponse) => {
            return response.data
        })
        .catch(
            (error: any) => {
                console.error('Ping failed', error)
            }
        )
}

async function protectedPing(): Promise<any> {
    return await axios
        .get('/ping_protected', { headers: getAuthenticatedHeader() })
        .then((response: AxiosResponse) => {
            return response.data
        })
        .catch(
            (error: any) => {
                console.error('Ping failed', error)
            }
        )
}

export { ping, protectedPing }
