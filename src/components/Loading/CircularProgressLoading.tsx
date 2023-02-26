import { Box, CircularProgress } from '@mui/material'

export interface ICircularProgressLoadingProps {
    fullHeight?: boolean
}

export function CircularProgressLoading({ fullHeight }: ICircularProgressLoadingProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: fullHeight ? '100vh' : '100%',
            }}
        >
            <CircularProgress />
        </Box>
    )
}
