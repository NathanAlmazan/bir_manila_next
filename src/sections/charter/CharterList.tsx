import { useState, useEffect } from 'react';
// mui
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
// components
import CharterCard from './CharterCard';
// types
import { CitizenCharter } from 'src/graphql/charter';

const rowsPerPage = 5;

export default function CharterList(props: { charterList: CitizenCharter[] }) {
    const { charterList } = props;
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page])

    useEffect(() => {
        setPage(0);
    }, [charterList])

    return (
        <Stack spacing={3} sx={{ pt: 3, pb: 8 }}>
            {charterList.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(charter => (
                <CharterCard key={charter.uuid} charter={charter} />
            ))}

            <ButtonGroup sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', py: 5 }}>
                {Array(Math.ceil(charterList.length / rowsPerPage)).fill(0).map((_, index) => (
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
        </Stack>
    )
}