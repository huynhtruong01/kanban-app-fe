import { Box, Button, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logoDark from '../assets/images/logo-dark.png'
import { CircularProgressLoading } from '../components/Loading/CircularProgressLoading'
import { authUtils } from '../utils'

export interface IAuthLayoutProps {}

export function AuthLayout(props: IAuthLayoutProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true)
            try {
                const token = await authUtils.isAuthenticated()

                if (!token) {
                    setLoading(false)
                } else {
                    navigate('/')
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
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mt: 8,
                }}
            >
                <img src={logoDark} style={{ width: '100px' }} alt="app logo" />
                <Outlet />
            </Box>
        </Container>
    )
}
