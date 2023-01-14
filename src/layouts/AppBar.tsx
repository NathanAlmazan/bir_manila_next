// mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
// icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const NavButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'active' })
<{ active?: boolean }>
(({ theme, active }) => ({
    color: 'white',
    fontWeight: 'bold',
    borderBottom: 'none',
    transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen
    }),
    '&:hover': {
        color: theme.palette.primary.light,
    },
    ...(active && {
        color: theme.palette.primary.light,
        transition: theme.transitions.create('color', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    }),
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    }
}))

export const Logo = styled('img')(() => ({
    width: 50,
    height: 50
}))


interface AppBarProps {
    search?: boolean;
}

export default function AppBar(props: AppBarProps) {
    const { search } = props;

    return (
        <Container 
            maxWidth='xl' 
            sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}
        >
            <Stack 
                spacing={3} 
                direction='row' 
                alignItems='center'
                sx={{ height: 100 }}
            >
                <Logo 
                    alt='br-logo'
                    src="/icons/bir-logo.png"
                />
                <NavButton active>Home</NavButton>
                <NavButton>Citizen Charter</NavButton>
                <NavButton>Accredited Banks</NavButton>
                <NavButton>Zonal Values</NavButton>
            </Stack>

            {search && (
                <TextField 
                    name='search'
                    variant="standard"
                    placeholder='Search'
                    InputProps={{
                        endAdornment: <IconButton><SearchIcon /></IconButton>, // <== adjusted this
                        disableUnderline: true, // <== added this
                    }}
                    sx={{ 
                        bgcolor: 'white',
                        borderRadius: 50,
                        px: 2,
                        display: { xs: 'none', md: 'flex' }
                    }}
                />
            )}

            <Stack 
                direction='row'
                spacing={2}
                sx={{ 
                    display: { xs: 'flex', md: 'none' }
                }}
            >
                {search && (
                    <IconButton>
                        <SearchIcon sx={{ color: 'white' }} />
                    </IconButton>
                )}
                <IconButton>
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton>
            </Stack>
        </Container>
    )
}