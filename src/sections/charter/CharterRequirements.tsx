import { useState } from 'react';
// mui
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// types
import { RequirementClass, CharterRequirements } from "src/graphql/charter";
// icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CharterListItem({ req }: { req: CharterRequirements }) {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <CheckCircleIcon color='primary' />
                </ListItemAvatar>
                <ListItemText 
                    primary={
                        <Typography variant="body1">
                            {req.name}
                        </Typography>
                    }
                    secondary={req.notes && req.notes.length > 0 && (
                        <Typography variant="subtitle2" sx={{ m: 1 }}>
                            {`Note: ${req.notes}`}
                        </Typography>
                    )}
                />
            </ListItem>
            <Divider />
        </>
    )
}

export default function CharterRequirementsList(props: { requirements: RequirementClass[], additional?: boolean }) {
    const { requirements, additional } = props;
    const [expanded, setExpanded] = useState<string>(requirements[0].id)

    if (requirements.length === 1) return (
        <List>
            {requirements[0].requirements.map((req, index) => (
                <CharterListItem key={index} req={req} />
            ))}
        </List>
    )

    return (
        <Stack spacing={2} sx={{ pb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, my: 3 }}>
                {`${additional ? 'Additional ' : ''}Requirements for...`}
            </Typography>

            {requirements.map(req => (
                <Accordion 
                    key={req.id}
                    expanded={expanded === req.id}
                    onChange={() => setExpanded(req.id)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant='h6'>
                            {req.name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {req.requirements.map((req, index) => (
                                <CharterListItem key={index} req={req} />
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Stack>
    )
}