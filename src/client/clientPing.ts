import axios, { type AxiosResponse } from 'axios'

async function ping(): Promise<any> {
    return await axios
        .get('/ping')
        .then((response: AxiosResponse) => {
            return response.data.message
        })
        .catch(
            (error: any) => {
                console.error('Ping failed', error)
            }
        )
}

export { ping }
