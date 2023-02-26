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
import { IAuthSignup } from '../types'
import { setLS } from '../utils'

export interface ISignUpProps {}

export function SignUp(props: ISignUpProps) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const schema = yup.object().shape({
        username: yup.string().required('Please enter user name.'),
        fullname: yup
            .string()
            .required('Please enter full name.')
            .test(
                'at-least-two-words',
                'Please enter full name at least two words.',
                (value: string) =>
                    value.split(' ').filter((x: string) => !!x && x.length > 1).length > 1
            ),
        password: yup
            .string()
            .required('Please enter password.')
            .min(6, 'Please enter password at least two characters.'),
        confirmPassword: yup
            .string()
            .required('Please enter confirm password.')
            .oneOf([yup.ref('password')], 'Confirm password is not match.'),
    })

    const form = useForm<IAuthSignup>({
        defaultValues: {
            username: '',
            fullname: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })
    const { register, formState } = form
    const { errors, isSubmitting } = formState

    const handleSignupSubmit = async (values: IAuthSignup) => {
        try {
            const res = await authApi.signup(values)

            dispatch(setUser(res.data.user))
            setLS('token', res.data.token)
            navigate('/')
        } catch (error: any) {
            console.log(error)
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
            onSubmit={form.handleSubmit(handleSignupSubmit)}
        >
            <Box>
                <InputField<IAuthSignup>
                    name="username"
                    register={register}
                    error={errors['username']}
                    required
                    disabled={isSubmitting}
                    label="Username"
                />
                <InputField<IAuthSignup>
                    name="fullname"
                    register={register}
                    error={errors['fullname']}
                    required
                    disabled={isSubmitting}
                    label="Full Name"
                />
                <PasswordField<IAuthSignup>
                    name="password"
                    register={register}
                    error={errors['password']}
                    required
                    disabled={isSubmitting}
                    label="Password"
                />
                <PasswordField<IAuthSignup>
                    name="confirmPassword"
                    register={register}
                    error={errors['confirmPassword']}
                    required
                    disabled={isSubmitting}
                    label="Confirm Password"
                />
            </Box>
            <Box
                sx={{
                    mt: 3,
                }}
            >
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
                        Sign Up
                    </Button>
                )}
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
                    Already have account? <Link to={'/login'}>Login</Link>
                </Typography>
            </Box>
        </Box>
    )
}
