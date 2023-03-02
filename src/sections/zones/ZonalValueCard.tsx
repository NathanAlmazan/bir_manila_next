// mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
// icons
import { Icon } from '@iconify/react';
// types
import { ZonalValue } from 'src/graphql/zones';
// utils
import { capitalCase } from 'change-case';

export default function ZonalValueCard({ zonalValue }: { zonalValue: ZonalValue }) {
    const theme = useTheme();

    return (
        <Card elevation={3} sx={{ height: '100%' }}>
            <CardHeader 
                avatar={
                    <Icon 
                        icon='material-symbols:location-on' 
                        width={30} 
                        height={30} 
                        color={theme.palette.primary.main}
                    />
                }
                title={
                    <Typography variant='body1' sx={{ fontWeight: 700 }}>
                        {zonalValue.streetSubdivision ? 
                            [ capitalCase(zonalValue.streetSubdivision), zonalValue.vicinity ? capitalCase(zonalValue.vicinity) : '', `Brgy. ${capitalCase(zonalValue.barangay)}`].join(" ") : 
                            `Brgy. ${capitalCase(zonalValue.barangay)}`
                        }
                    </Typography>
                }
            />

            <CardContent>
                <List sx={{ width: '100%' }}>
                    <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                            <Icon 
                                icon='ion:pricetags-sharp' 
                                width={30} 
                                height={30} 
                                color={theme.palette.error.dark}
                            />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <Typography variant='h4' sx={{ fontWeight: 800 }}>
                                    {'₱ ' + zonalValue.pricePerSqm.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </Typography>
                            }
                            secondary={
                                <Typography variant='body2'>
                                    Price Per SQM
                                </Typography>
                            }
                        />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                            <Icon 
                                icon='material-symbols:map-rounded' 
                                width={30} 
                                height={30} 
                                color={theme.palette.success.dark}
                            />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    {zonalValue.classification.name}
                                </Typography>
                            }
                            secondary={
                                <Typography variant='body2'>
                                    Classification
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}