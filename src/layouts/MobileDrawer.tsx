import { useRouter } from 'next/router';
// mui
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
// components
import { paths, Logo } from './AppBar';
// icons
import CloseIcon from '@mui/icons-material/Close';


const DrawerBackground = styled('section')(() => ({
    backgroundImage: 'url("/covers/bir-manila.jpg")',
    backgroundSize: 'cover',
    height: '100%',
    position: 'relative',
    zIndex: 0,
    '&::before': {
        background: 'rgba(198, 40, 40, 0.8)',
        content: '""',
        height: '100%',
        left: 0,
        top: 0,
        position: 'absolute',
        width: '100%',
        zIndex: '-1'
    }
}))


export default function MobileDrawer({ open, handleToggle }: {
    open: boolean,
    handleToggle: () => void
}) {
    const { pathname, push } = useRouter();

    const handleRedirect = (path: string) => push(path);

    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={handleToggle}
            ModalProps={{
                keepMounted: true, 
            }}
            sx={{
                '& .MuiDrawer-paper': { 
                    boxSizing: 'border-box', 
                    width: 300, 
                    bgcolor: (theme) => theme.palette.error.dark
                },
                position: 'relative'
            }}
        >
            <DrawerBackground>
                <Stack direction='row' justifyContent='flex-end' sx={{ p: 2 }}>
                    <IconButton onClick={handleToggle}>
                        <CloseIcon fontSize='large' sx={{ color: 'white' }} />
                    </IconButton>
                </Stack>
                <List>
                    {paths.map(path => (
                        <ListItemButton
                            key={path.href}
                            onClick={() => handleRedirect(path.href)}
                            sx={{ 
                                bgcolor: path.href === pathname ? 'white' : 'inherit'
                            }}
                        >
                            <ListItemAvatar sx={{ color: path.href === pathname ? 'black' : 'white' }}>
                                {path.icon}
                            </ListItemAvatar>
                            <ListItemText 
                                primary={
                                    <Typography 
                                        variant='body1' 
                                        sx={{ 
                                            fontWeight: 800, 
                                            color: path.href === pathname ? 'black' : 'white' 
                                        }}
                                    >
                                        {path.label}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Stack sx={{ 
                        p: 3,
                        position: 'absolute',
                        bottom: 0,
                        left: 0
                    }}
                >
                    <Logo 
                        alt='br-logo'
                        src="/icons/bir-logo.png"
                    />

                    <Typography variant='h3' sx={{ fontWeight: 800, color: 'white', py: 2 }}>
                        BIR Manila Revenue Region
                    </Typography>

                    <Stack direction='row' spacing={1} sx={{ pb: 4 }}>
                        <Icon icon="mdi:web" width={30} height={30} color='white' />
                        <Icon icon="ic:outline-facebook" width={30} height={30} color='white' />
                        <Icon icon="ri:twitter-fill" width={30} height={30} color='white' />
                    </Stack>
                </Stack>
            </DrawerBackground>
        </Drawer>
    )
}