// mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
// components
import AppBar from 'src/layouts/AppBar';
// icons
import SearchIcon from '@mui/icons-material/Search';

const HeroBackground = styled('section')(() => ({
    backgroundImage: 'url("/covers/bir-manila.jpg")',
    backgroundSize: 'cover',
    height: 600,
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

interface HeroSectionProps {
    searchBar?: boolean
}

export default function HeroSection(props: HeroSectionProps) {
    const { searchBar } = props

    return (
        <HeroBackground>
            <HeroContent>

                <AppBar />

                <HeroBanner>
                    <Container maxWidth="md" sx={{ height: '100%s', alignItems: 'center' }}>
                        <Typography variant='h1' align='center' color='white' sx={{ my: 3 }}>
                            How can we <StyledSpan>help?</StyledSpan>
                        </Typography>
                        <TextField 
                            variant="standard"
                            placeholder='Please type your BIR Transaction'
                            fullWidth
                            InputProps={{
                                endAdornment: <IconButton><SearchIcon /></IconButton>, // <== adjusted this
                                disableUnderline: true, // <== added this
                            }}
                            sx={{ 
                                bgcolor: 'white',
                                borderRadius: 50,
                                py: 1,
                                px: 4
                            }}
                        />
                    </Container>
                </HeroBanner>
            </HeroContent>
        </HeroBackground>
    ) 
}
