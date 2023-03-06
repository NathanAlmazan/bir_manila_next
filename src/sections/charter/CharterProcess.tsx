import { useState } from 'react';
import { useRouter } from 'next/router';
// mui
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Icon } from '@iconify/react';
// types
import { CharterProcess } from "src/graphql/charter";

export default function CharterProcessStepper(props: { process: CharterProcess[] }) {
    const [step, setStep] = useState<number>(0);

    const handleNext = () => {
        setStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setStep(0);
    }

    const router = useRouter();

    return (
        <Stepper activeStep={step} orientation='vertical' sx={{ pt: 3, pb: 5, maxWidth: 700 }}>
            {props.process.map((p, index) => (
                <Step key={p.id}>
                    <StepLabel>
                        <Chip 
                            label={p.type === "CLIENT" ? "Client Action" : "Officer Action"}
                            sx={{ fontWeight: 600 }}
                            color={step === index ? p.type === "CLIENT" ? "primary" : "error" : "default"}
                        />
                    </StepLabel>
                    <StepContent>
                        <Box sx={{ my: 4 }}>
                            <Typography variant='body1'>
                                {p.description}
                            </Typography>
                            <List>
                               {p.notes && p.notes.length > 0 && (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Icon icon='material-symbols:notes' height={20} width={20} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={
                                            <Typography variant='body2'>
                                                {p.notes}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant='subtitle2'>
                                                Note
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                               )}

                                {p.duration && p.duration.length > 0 && (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Icon icon='ic:twotone-access-time' height={20} width={20} />
                                        </ListItemAvatar>
                                        <ListItemText 
                                            primary={
                                                <Typography variant='body2'>
                                                    {p.duration}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant='subtitle2'>
                                                    Duration
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                )}

                                {p.fee && p.fee.length > 0 && (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Icon icon='fluent:feed-28-filled' height={20} width={20} />
                                        </ListItemAvatar>
                                        <ListItemText 
                                            primary={
                                                <Typography variant='body2'>
                                                    {p.fee}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant='subtitle2'>
                                                    Fee
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                )}

                            </List>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <div>
                                {p.fee && p.fee !== "None" && p.fee?.length > 0 && (
                                    <Button variant='contained' color="info" onClick={() => router.push("/banks")} sx={{ mt: 1, mr: 1 }}>
                                        Accredited Banks
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={index === props.process.length - 1 ? handleReset : handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    {index === props.process.length - 1 ? 'Reset' : 'Continue'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    )   
}