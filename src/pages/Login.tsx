import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { authApi } from '../api'
import { InputField, PasswordField } from '../components'
import { setUser } from '../store/users'
import { IAuthLogin, IRegisterRHF } from '../types'
import { setLS } from '../utils'

export interface ILoginProps {}

export function Login(props: ILoginProps) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const schema = yup.object().shape({
        username: yup.string().required('Please enter user name.'),
        password: yup
            .string()
            .required('Please enter password.')
            .min(6, 'Please enter password at least six characters.'),
    })

    const form = useForm<IAuthLogin>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })
    const { register, formState } = form
    const { errors, isSubmitting } = formState

    const handleLoginSubmit = async (values: IAuthLogin) => {
        try {
            const res = await authApi.login(values)

            dispatch(setUser(res.data.user))
            setLS('token', res.data.token)
            navigate('/')
        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        <Box
            component="form"
            noValidate
            sx={{
                width: '100%',
                mt: 3,
            }}
            onSubmit={form.handleSubmit(handleLoginSubmit)}
        >
            <Box>
                <InputField<IAuthLogin>
                    name="username"
                    label="Username"
                    register={register}
                    error={errors['username']}
                    required
                    disabled={isSubmitting}
                />
                <PasswordField<IAuthLogin>
                    name="password"
                    label="Password"
                    register={register}
                    error={errors['password']}
                    required
                    disabled={isSubmitting}
                />
            </Box>
            <Box
                sx={{
                    mt: 3,
                }}
            >
                <>
                    {isSubmitting && (
                        <LoadingButton
                            variant="contained"
                            fullWidth
                            loading
                            disabled
                            sx={{
                                p: '18px',
                            }}
                        ></LoadingButton>
                    )}
                    {!isSubmitting && (
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            disabled={isSubmitting}
                            sx={{
                                '&:hover': {
                                    bgcolor: blue[900],
                                    color: '#ffffff',
                                    borderColor: blue[900],
                                },
                            }}
                        >
                            Login
                        </Button>
                    )}
                </>
                <Typography
                    sx={{
                        textAlign: 'center',
                        color: blue[300],
                        m: '16px 0',
                        fontWeight: 500,
                        a: {
                            color: blue[500],
                        },
                    }}
                >
                    Don't have account? <Link to={'/signup'}>Sign up</Link>
                </Typography>
            </Box>
        </Box>
    )
}
