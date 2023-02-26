import { TextField } from '@mui/material'
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { INameRHF, IRegisterRHF } from '../../types'
import { useStyles } from '../styles'

export type IInputFieldProps<TFormValues> = {
    name: Path<TFormValues>
    label: string
    register: UseFormRegister<TFormValues>
    required?: boolean
    disabled?: boolean
    error: FieldError | undefined
}

export function InputField<TFormValues extends FieldValues = FieldValues>({
    name,
    label,
    register,
    required = false,
    disabled = false,
    error,
}: IInputFieldProps<TFormValues>): JSX.Element {
    const styles = useStyles()

    return (
        <TextField
            className={styles.borderWidthTwo}
            {...register(name)}
            variant="outlined"
            required={required}
            label={label}
            disabled={disabled}
            helperText={error?.message}
            error={Boolean(error)}
            fullWidth
            margin="normal"
        />
    )
}
