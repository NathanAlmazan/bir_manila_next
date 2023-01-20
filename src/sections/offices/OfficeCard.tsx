// mui
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// animations
import { motion } from 'framer-motion';
// icons
import { Icon } from '@iconify/react';
// types
import { BirOffice } from 'src/graphql/offices';

export default function OfficeCard({ office }: { office: BirOffice }) {
    const theme = useTheme();

    return (
        <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring" }}
            >
            <Card sx={{
                p: 3,
                borderLeft: {
                    xs: 'none',
                    md: `8px solid ${theme.palette.error.light}`
                },
                borderTop: {
                    xs: `8px solid ${theme.palette.error.light}`,
                    md: 'none'
                }
            }}>
                <Grid container spacing={4}>
                    <Grid 
                        item 
                        xs={12} 
                        md={4} 
                        sx={{ 
                            borderLeft: {
                                xs: 'none',
                                md: `6px solid ${theme.palette.error.light}`
                            }
                        }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 800 }}>
                            {office.district ? `${office.name} No. ${office.district.number}` : office.name}
                        </Typography>
                        <List>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemAvatar>
                                    <Icon
                                        icon='ic:outline-email'
                                        width={25} 
                                        height={25} 
                                        color={theme.palette.grey[600]}
                                    />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={
                                        <Typography 
                                            variant="body1" 
                                            sx={{ fontWeight: 700, color: theme.palette.grey[600] }}
                                        >
                                            {office.email}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2">
                                            Email
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemAvatar>
                                    <Icon
                                        icon='mdi:office-building-marker-outline'
                                        width={25} 
                                        height={25} 
                                        color={theme.palette.grey[600]}
                                    />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={
                                        <Typography 
                                            variant="body1" 
                                            sx={{ fontWeight: 700, color: theme.palette.grey[600] }}
                                        >
                                            {office.address}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2">
                                            Address
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            {office.officers.map(officer => (
                                <Grid key={officer.name} item xs={12} md={6}>
                                    <List>
                                        <ListItem>
                                            <ListItemText 
                                                primary={
                                                    <Typography 
                                                        variant="h6" 
                                                        sx={{ fontWeight: 700 }}
                                                    >
                                                        {officer.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="body1">
                                                        {officer.position}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>

                                        {officer.contacts.map((contact, index) => (
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Icon
                                                        icon={contact.type === "TELEPHONE" ? 'bi:telephone' : 'la:fax'}
                                                        width={25} 
                                                        height={25} 
                                                        color={theme.palette.grey[600]}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText 
                                                    primary={
                                                        <Typography 
                                                            variant="body1" 
                                                            sx={{ fontWeight: 600, color: theme.palette.grey[600] }}
                                                        >
                                                            {contact.number}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        ))}

                                    </List>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </motion.div>
    )
}