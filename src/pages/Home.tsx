import { Box, Button } from '@mui/material'

export interface IHomeProps {}

export function Home(props: IHomeProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Button variant="outlined" color="primary">
                Click here to create first board
            </Button>
        </Box>
    )
}
