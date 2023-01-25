import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
// components
import AppBar from 'src/layouts/AppBar';
import MobileDrawer from 'src/layouts/MobileDrawer';
// icons
import SearchIcon from '@mui/icons-material/Search';

const HeroBackground = styled('section')(() => ({
    backgroundImage: 'url("/covers/bir-manila.jpg")',
    backgroundSize: 'cover',
    height: '100vh',
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

const HeroContent = styled('div')(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
}))

const HeroBanner = styled('div')(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}))

const StyledSpan = styled('span')(({ theme }) => ({
    color: theme.palette.primary.light
}))

const paths = [
    {
        href: '/charter',
        label: 'Citizen Charter',
        icon: <Icon icon='material-symbols:menu-book' width={40} height={40} />
    },
    {
        href: '/banks',
        label: 'Accredited Banks',
        icon: <Icon icon='ph:bank-bold' width={40} height={40} />
    },
    {
        href: '/offices',
        label: 'Region Offices',
        icon: <Icon icon='mdi:office-building-marker' width={40} height={40} />
    },
    {
        href: '/zonal',
        label: 'Zonal Values',
        icon: <Icon icon='material-symbols:map-rounded' width={40} height={40} />
    }
]

export default function HeroSection() {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);

        handleBranchAndNameSearch(event.target.value);
        handleCharterTitleSearch(event.target.value);
        handleOfficeNameSearch(event.target.value);
    }

    const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (search.length > 1) router.push({
            query: {
                q: search
            },
            pathname: '/search'
        })
    }

    const handleBranchAndNameSearch = async (search: string) => { 

        const searchResult = await getBankNameAndBranch({

            variables: {

                branchAndName: search

            }

        })

        console.log(searchResult.data?.findBanksByAddress)
    }

    const handleCharterTitleSearch = async (search: string) => { 

        const searchResult = await getCharterTitle({

            variables: {

                charterTitle: search

            }

        })

        console.log(searchResult.data?.searchCharter)
    }

    const handleOfficeNameSearch = async (search: string) => { 

        const searchResult = await getOfficeName({

            variables: {

                officeName: search

            }

        })

        console.log(searchResult.data?.findAllOffices)
    }


    return (
        <HeroBackground>
            <HeroContent>

                <AppBar toggleDrawer={() => setOpen(!open)} />

                <MobileDrawer open={open} handleToggle={() => setOpen(!open)} />

                <HeroBanner>
                    <Container component='form' onSubmit={handleSubmitSearch} maxWidth="md" sx={{ height: '100%s', alignItems: 'center' }}>
                        <Typography variant='h1' align='center' color='white' sx={{ my: 3 }}>
                            How can we <StyledSpan>help?</StyledSpan>
                        </Typography>
                        <TextField 
                            name='search'
                            variant="standard"
                            placeholder='Search BIR Transaction or Address'
                            value={search}
                            onChange={handleTextChange}
                            fullWidth
                            InputProps={{
                                endAdornment: <IconButton type='submit'><SearchIcon /></IconButton>, 
                                disableUnderline: true, 
                            }}
                            sx={{ 
                                bgcolor: 'white',
                                borderRadius: 40,
                                py: 1,
                                px: 4
                            }}
                        />

                        <Grid container spacing={2} justifyContent='center' alignItems='center' sx={{ my: 3 }}>
                            {paths.map(path => (
                                <Grid key={path.href} item xs={6} md={3} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}>
                                    <Paper sx={{ 
                                            width: 80, 
                                            height: 80,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 40,
                                            color: (theme) => theme.palette.error.dark
                                        }}
                                    >
                                        {path.icon}
                                    </Paper>
                                    <Typography variant='body1' sx={{ my: 2 }}>
                                        <Link href={path.href} style={{ color: 'white' }}>{path.label}</Link>
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </HeroBanner>
            </HeroContent>
        </HeroBackground>
    ) 
}
