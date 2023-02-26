import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components'
import { CircularProgressLoading } from '../components/Loading/CircularProgressLoading'
import { setUser } from '../store/users'
import { authUtils } from '../utils'

export interface IAppLayoutProps {}

export function AppLayout(props: IAppLayoutProps) {
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authUtils.isAuthenticated()

                if (!user) {
                    navigate('/login')
                } else {
                    dispatch(setUser(user))
                }
            } catch (error: any) {
                throw new Error(error)
            }
            setLoading(false)
        }

        checkAuth()
    }, [navigate])

    return loading ? (
        <CircularProgressLoading fullHeight />
    ) : (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    p: 1,
                    width: 'max-content',
                    minHeight: '100vh',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}
