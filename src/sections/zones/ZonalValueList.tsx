import { useState, useEffect } from 'react';
// mui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// components
import ZonalValueCard from './ZonalValueCard';
// types
import { ZonalValue } from 'src/graphql/zones';

const rowsPerPage = 15;

export default function ZonalValueList({ zoneList }: { zoneList: ZonalValue[] }) {
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page])

    useEffect(() => {
        setPage(0);
    }, [zoneList])

    return (
        <Grid 
            container 
            spacing={2} 
            justifyContent='flex-start'
            sx={{ pt: 4, pb: 8 }}
        >
            {zoneList.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(zone => (
                <Grid key={zone.id} item xs={12} md={4}>
                    <ZonalValueCard zonalValue={zone} />
                </Grid>
            ))}

            <Grid item xs={12}>
                <ButtonGroup sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', py: 5 }}>
                    {Array(Math.ceil(zoneList.length / rowsPerPage)).fill(0).map((_, index) => (
                        <Button 
                            key={index} 
                            size='large'
                            variant={page === index ? 'contained' : 'outlined'}
                            onClick={() => setPage(index)}
                        >
                            {page === index ? `Page ${index + 1}` : index + 1}
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}