import { authApi } from '../api'

export const authUtils = {
    isAuthenticated: async () => {
        const token: string = localStorage.getItem('token') || ''
        if (!token) return false

        try {
            const res = await authApi.verifyToken()
            return res?.data.user
        } catch (error: any) {
            return false
        }
    },
}
