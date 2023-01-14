// mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
// icons
import { Icon } from '@iconify/react';
// types
import { AccreditedBank } from 'src/graphql/banks';


export default function BankCard({ bank }: { bank: AccreditedBank }) {
    const theme = useTheme();

    return (
        <Card elevation={3} sx={{ height: '100%' }}>
            <CardHeader 
                avatar={
                    <Avatar 
                        alt={bank.code}
                        src={bank.details.logo}
                        variant='rounded'
                        sx={{ width: 50, height: 50 }}
                    />
                }
                title={
                    <Typography variant='body1' sx={{ fontWeight: 700 }}>
                        {bank.details.fullName}
                    </Typography>
                }
                subheader={
                    <Typography variant='subtitle2'>
                        {bank.branch}
                    </Typography>
                }
            />
            <CardContent>
                <List sx={{ width: '100%' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Icon 
                                icon='ph:bank-bold' 
                                width={30} 
                                height={30} 
                                color={theme.palette.success.main}
                            />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                    Code
                                </Typography>
                            }
                            secondary={
                                <Typography variant='body1'>
                                    {bank.code}
                                </Typography>
                            }
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemAvatar>
                            <Icon 
                                icon='material-symbols:location-on' 
                                width={30} 
                                height={30} 
                                color={theme.palette.primary.main}
                            />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                    Address
                                </Typography>
                            }
                            secondary={
                                <Typography variant='body1'>
                                    {bank.fullAddress}
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}