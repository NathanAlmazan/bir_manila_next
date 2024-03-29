import { useState } from 'react';
// next
import Link from 'next/link';
// mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
// components
import footerPages from './constants';
import MobileDrawer from './MobileDrawer';
import AppBar, { Logo } from './AppBar';
// icons
import { Icon } from '@iconify/react';

const Header = styled('section')(() => ({
    backgroundImage: 'url("https://res.cloudinary.com/ddpqji6uq/image/upload/v1685396575/bir_cover_xn4ng0.jpg")',
    backgroundSize: 'cover',
    minHeight: 250,
    position: 'relative',
    zIndex: 0,
    '&::before': {
        background: 'rgba(10, 38, 71, 0.8)',
        content: '""',
        height: '100%',
        left: 0,
        top: 0,
        position: 'absolute',
        width: '100%',
        zIndex: '-1'
    }
}))

const Footer = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.grey[900],
    minHeight: 400
}))


interface DefaultLayoutProps {
    children?: React.ReactNode,
    title: string,
    search?: boolean,
    breadcrumbs: {
        href: string,
        label: string,
    }[]
}

export default function DefaultLayout(props: DefaultLayoutProps) {
    const { title, breadcrumbs, search } = props;
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Header>
                <AppBar 
                    search 
                    toggleDrawer={() => setOpen(!open)}
                />

                <Container maxWidth='lg' sx={{ pt: 5 }}>
                    {search ? (
                        <Typography variant='h6' color='white' fontWeight={800}>
                            Results for...
                        </Typography>
                    ) : (
                        <Breadcrumbs sx={{ color: 'white' }}>
                            {breadcrumbs.map((link, index) => (
                                <Link 
                                    key={index} 
                                    href={link.href} 
                                    style={{ 
                                        color: index === breadcrumbs.length - 1 ? theme.palette.primary.light : 'white'
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Breadcrumbs>
                    )}
                    <Typography variant='h2' color='white' paddingBottom={2}>
                        {search ? `"${title}"` : title}
                    </Typography>
                </Container>
            </Header>

            <MobileDrawer 
                open={open}
                handleToggle={() => setOpen(!open)}
            />

            {props.children}

            <Footer>
                <Container maxWidth='lg' sx={{ py: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Logo 
                                alt='br-logo'
                                src="https://res.cloudinary.com/ddpqji6uq/image/upload/v1684463093/banks/bir-logo_tdnw9n.png"
                            />

                            <Typography variant='h6' sx={{ fontWeight: 600, color: 'white', py: 2 }}>
                                BIR Manila Revenue Region
                            </Typography>

                            <Stack direction='row' spacing={1} sx={{ pb: 4 }}>
                                <Icon icon="mdi:web" width={30} height={30} color='white' />
                                <Icon icon="ic:outline-facebook" width={30} height={30} color='white' />
                                <Icon icon="ri:twitter-fill" width={30} height={30} color='white' />
                            </Stack>
                        </Grid>
                        {footerPages.map(footer => (
                            <Grid 
                                key={footer.title} 
                                item 
                                xs={6} 
                                md={2} 
                                sx={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <Typography 
                                    variant='body1' 
                                    fontWeight={600} 
                                    color='primary.light' 
                                    paddingBottom={2}
                                >
                                    {footer.title}
                                </Typography>
                                {footer.pages.map((page, index) => (
                                    <Link 
                                        key={index} 
                                        href={page.href} 
                                        style={{ color: 'white', paddingTop: '4px', textDecoration: 'none' }}
                                    >
                                        {page.label}
                                    </Link>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Footer>
        </>
    )
}