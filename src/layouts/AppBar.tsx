import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
// mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
// components
import Popover from 'src/components/Popover';
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

export const paths = [
    {
        href: '/',
        label: 'Home',
        icon: <Icon icon='material-symbols:home' width={30} height={30} />
    },
    {
        href: '/charter',
        label: 'Citizen Charter',
        icon: <Icon icon='material-symbols:menu-book' width={30} height={30} />
    },
    {
        href: '/banks',
        label: 'Accredited Banks',
        icon: <Icon icon='ph:bank-bold' width={30} height={30} />
    },
    {
        href: '/offices',
        label: 'Region Offices',
        icon: <Icon icon='mdi:office-building-marker' width={30} height={30} />
    },
    {
        href: '/zonal',
        label: 'Zonal Values',
        icon: <Icon icon='material-symbols:map-rounded' width={30} height={30} />
    },
    {
        href: '/map',
        label: 'Zonal Map',
        icon: <Icon icon='material-symbols:map-rounded' width={30} height={30} />
    }
]


interface AppBarProps {
    search?: boolean;
    toggleDrawer: () => void;
}

export default function AppBar(props: AppBarProps) {
    const { search, toggleDrawer } = props;
    const router = useRouter();
    const [query, setSearch] = useState<string>('');
    const [open, setOpen] = useState<HTMLDivElement | null>(null);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    const handleRedirect = (href: string) => {
        router.push(href);
    }

    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setOpen(event.currentTarget);
      };
    
      const handleClose = () => {
        setOpen(null);
      };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (query.length > 1) router.push({
            query: {
                q: query
            },
            pathname: '/search'
        })
    }

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
                    src="https://res.cloudinary.com/ddpqji6uq/image/upload/v1684463093/banks/bir-logo_tdnw9n.png"
                />
                {paths.map(path => (
                    <NavButton 
                        key={path.href}
                        active={path.href === router.pathname}
                        onClick={() => handleRedirect(path.href)}
                    >
                        {path.label}
                    </NavButton>
                ))}
            </Stack>

            {search && (
                <form onSubmit={handleSubmitSearch}>
                    <TextField 
                        name='search'
                        variant="standard"
                        placeholder='Search'
                        value={query}
                        onChange={handleTextChange}
                        InputProps={{
                            endAdornment: <IconButton type='submit'><SearchIcon /></IconButton>, // <== adjusted this
                            disableUnderline: true, // <== added this
                        }}
                        sx={{ 
                            bgcolor: 'white',
                            borderRadius: 50,
                            px: 2,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    />
                </form>
            )}

            <Stack 
                direction='row'
                spacing={2}
                sx={{ 
                    display: { xs: 'flex', md: 'none' }
                }}
            >
                {search && (
                    <IconButton component='div' ref={anchorRef} onClick={handleOpen}>
                        <SearchIcon sx={{ color: 'white' }} />
                    </IconButton>
                )}
                <IconButton onClick={toggleDrawer}>
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton>
            </Stack>

            <Popover
                open={Boolean(open)}
                anchorEl={open as any}
                onClose={handleClose}
                sx={{
                p: 0,
                mt: 1.5,
                ml: 0.75,
                width: 280,
                    '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                }}
            >
                <form onSubmit={handleSubmitSearch}>
                    <TextField
                        name='search'
                        variant="standard"
                        placeholder='Search'
                        value={query}
                        onChange={handleTextChange}
                        InputProps={{
                            endAdornment: <IconButton type='submit'><SearchIcon /></IconButton>, // <== adjusted this
                            disableUnderline: true, // <== added this
                        }}
                        sx={{ 
                            bgcolor: 'white',
                            borderRadius: 50,
                            px: 2
                        }}
                    />
                </form>
            </Popover>
        </Container>
    )
}