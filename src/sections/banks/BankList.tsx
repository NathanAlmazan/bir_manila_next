import { useState, useEffect } from 'react';
// mui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// components
import BankCard from './BankCard';
// types
import { AccreditedBank } from 'src/graphql/banks';

const rowsPerPage = 9;

export default function BankList({ bankList }: { bankList: AccreditedBank[] }) {
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page])

    useEffect(() => {
        setPage(0);
    }, [bankList])

    return (
        <Grid 
            container 
            spacing={2} 
            justifyContent='center'
            sx={{ pt: 4, pb: 8 }}
        >
            {bankList.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(bank => (
                <Grid key={bank.code} item xs={12} md={4}>
                    <BankCard bank={bank} />
                </Grid>
            ))}

            <Grid item xs={12}>
                <ButtonGroup sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', py: 5 }}>
                    {Array(Math.ceil(bankList.length / rowsPerPage)).fill(0).map((_, index) => (
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