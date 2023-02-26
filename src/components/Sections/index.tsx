import { Box, Grid, InputBase, Typography } from '@mui/material'
import { ISection } from '../../types'
import { SectionItem } from './components'

export interface ISectionsProps {
    sectionList: ISection[]
    onDelete: (id: string) => void
}

function Sections({ sectionList, onDelete }: ISectionsProps) {
    const handleDeleteSection = (id: string) => {
        onDelete(id)
    }

    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {sectionList.map((section: ISection) => (
                    <Grid key={section.id} item xs={3}>
                        <SectionItem section={section} onDelete={handleDeleteSection} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Sections
