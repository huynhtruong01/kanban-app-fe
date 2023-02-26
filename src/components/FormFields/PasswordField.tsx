import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material'
import { useState } from 'react'
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { IRegisterRHF } from '../../types'
import { useStyles } from '../styles'

export interface IPasswordFieldProps<TFormValues> {
    name: Path<TFormValues>
    label: string
    register: UseFormRegister<TFormValues>
    required?: boolean
    disabled?: boolean
    error: FieldError | undefined
}

export function PasswordField<TFormValues extends FieldValues>({
    name,
    label,
    register,
    required,
    disabled,
    error,
}: IPasswordFieldProps<TFormValues>) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const styles = useStyles()

    const handleShowPassword = () => {
        setShowPassword((prevValue: boolean) => !prevValue)
    }

    return (
        <FormControl
            className={styles.borderWidthTwo}
            fullWidth
            variant="outlined"
            error={Boolean(error)}
            disabled={disabled}
            margin="normal"
        >
            <InputLabel required={required}>{label}</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                {...register(name)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
            <FormHelperText error={Boolean(error)}>{error?.message}</FormHelperText>
        </FormControl>
    )
}
