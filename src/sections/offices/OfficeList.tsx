// mui
import Stack from '@mui/material/Stack';
// components
import OfficeCard from './OfficeCard';
// animations
import { AnimatePresence } from 'framer-motion';
// types
import { BirOffice } from 'src/graphql/offices';

export default function OfficeList({ officeList }: { officeList: BirOffice[] }) {
    return (
        <Stack spacing={3} sx={{ pt: 2, pb: 8 }}>
            <AnimatePresence mode='wait'>
                {officeList.map(office => (
                    <OfficeCard key={office.id} office={office} />
                ))}
            </AnimatePresence>
        </Stack>
    )
}