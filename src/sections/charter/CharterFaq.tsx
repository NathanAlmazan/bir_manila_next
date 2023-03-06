import { useState } from 'react';
import { useRouter } from 'next/router';
// mui
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// types
import { CitizenCharter } from "src/graphql/charter";

export default function CharterFaq(props: { 
    charter: CitizenCharter,
    handleTabsChange: (tab: string) => void
}) {
    const { charter, handleTabsChange } = props;
    const [expand, setExpand] = useState<string>(charter.description.length === 0 ? "panel2" : "panel1");

    const router = useRouter();

    return (
        <Stack spacing={2} sx={{ pt: 5, pb: 8 }}>

            {charter.description.length > 0 && (
                <Accordion
                    expanded={expand === "panel1"}
                    onChange={() => setExpand("panel1")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant='h6'>
                            Transaction Description
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant='body1'>
                            {charter.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )}

            <Accordion
                expanded={expand === "panel2"}
                onChange={() => setExpand("panel2")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant='h6'>
                        Who can avail this transaction?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1'>
                        {charter.applicants}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expand === "panel3"}
                onChange={() => setExpand("panel3")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant='h6'>
                        Where should I register?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1'>
                        {charter.location}
                    </Typography>
                    <Stack direction='row' justifyContent="flex-end" sx={{ pt: 3 }}>
                        <Button variant='contained' onClick={() => router.push("/offices")}>
                            See Revenue Region Offices
                        </Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>

            {charter.period && charter.period.length > 0 && (
                <Accordion
                    expanded={expand === "panel4"}
                    onChange={() => setExpand("panel4")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant='h6'>
                            When should I register?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant='body1'>
                            {charter.period}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )}

            <Accordion
                expanded={expand === "panel5"}
                onChange={() => setExpand("panel5")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant='h6'>
                        How long will the application process take?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1'>
                        {charter.duration}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expand === "panel6"}
                onChange={() => setExpand("panel6")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant='h6'>
                        How much is the application fee?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1'>
                        {!charter.fee || charter.fee.length === 0 || charter.fee === "None" ? "No application fee" : charter.fee}
                    </Typography>
                    {charter.fee && charter.fee !== "None" && charter.fee?.length > 0 && (
                        <Stack direction='row' justifyContent="flex-end" sx={{ pt: 3 }}>
                            <Button variant='contained' onClick={() => router.push("/banks")}>
                                See Accredited Banks
                            </Button>
                        </Stack>
                    )}
                </AccordionDetails>
            </Accordion>

            <Paper sx={{ p: 1 }}>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='h6' sx={{ m: 1 }}>
                        What requirements do I need?
                    </Typography>
                    <IconButton onClick={() => handleTabsChange("Requirements")}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Stack>
            </Paper>

            <Paper sx={{ p: 1 }}>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='h6' sx={{ m: 1 }}>
                        What is the application process?
                    </Typography>
                    <IconButton onClick={() => handleTabsChange("Process")}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Stack>
            </Paper>
        </Stack>
    )
}