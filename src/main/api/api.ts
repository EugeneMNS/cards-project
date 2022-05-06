import axios from "axios";

export type ResponseType = {
    addedUser: {} // не важные данные, просто для проверки, чтобы посмотреть как выглядит созданный юзер
    error?: string
}

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    register(email: string | null, password: string | null) {
        return instance.post<ResponseType>(`auth/register`, {email, password})
    },
}