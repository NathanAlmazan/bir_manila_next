import Link from 'next/link';
// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
// types
import { CitizenCharter } from "src/graphql/charter";

export default function CharterCard(props: { charter: CitizenCharter }) {
    const { charter } = props;

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">
                    <Link href={`/charter/${charter.uuid}`}>{charter.title}</Link>
                </Typography>
                <Stack direction='row' spacing={2} sx={{ my: 1 }}>
                    <Chip color='primary' label={charter.duration}  sx={{ fontWeight: 600 }} />
                    <Chip color='error' label={!charter.fee || charter.fee.length === 0 ? 'No Fee' : charter.fee} sx={{ fontWeight: 600 }} />
                </Stack>

                <Typography component='p' variant='body1' sx={{ mt: 3 }}>
                    {charter.description !== "None" ? `${charter.description.slice(0, 200)}${charter.description.length > 200 ? '...' : ''}` : charter.applicants}
                    {charter.description.length > 200 && (
                        <Link href={`/charter/${charter.uuid}`}>Read More</Link>
                    )}
                </Typography>
            </CardContent>
        </Card>
    )
}