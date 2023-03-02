import { useState } from 'react';
// mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// layouts
import DefaultLayout from "src/layouts";

const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/offices', label: 'Zonal Map' }
]

const coordinates = {
    "29": {
        x: -97510.40576,
        y: 82922.34669,
        z: 5
    },
    "30": {
        x: -149324.80078,
        y: 101580.31553,
        z: 5
    },
    "31": {
        x: -102268.80298,
        y: 126615.50926,
        z: 5
    },
    "32": {
        x: -132889.60059,
        y: 176728.46034,
        z: 5
    },
    "33": {
        x: -199494.40186,
        y: 116617.2769,
        z: 5
    },
    "34": {
        x: -195027.20361,
        y: 184390.80946,
        z: 5
    },
    "36": {
        x: -277593.59766,
        y: 57671.6982,
        z: 5
    }
}

export default function ZonalMap() {
    const [district, setDistrict] = useState<string>("29");

    const handleTabsChange = async (event: React.SyntheticEvent, newValue: string) => {
        setDistrict(newValue);
    }

    return (
        <>
             <DefaultLayout
                title='Zonal Map'
                breadcrumbs={breadcrumbs}
            >
                <Container maxWidth='lg'>
                    <Tabs
                        value={district}
                        onChange={handleTabsChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        {Object.keys(coordinates).map((district, index) => (
                            <Tab 
                                key={index}
                                value={district}
                                label={
                                    <Typography variant='body1' sx={{ fontWeight: 700 }}>
                                        {`RDO ${district}`}
                                    </Typography>
                                } 
                            />
                        ))}
                    </Tabs>

                    <Box 
                        component="iframe"
                        src={`http://birmap.nat911.com/leaflet.php?x=${coordinates[district as keyof typeof coordinates].x}&y=${coordinates[district as keyof typeof coordinates].y}&z=${coordinates[district as keyof typeof coordinates].z}`}
                        sx={{ width: '100%', height: 800 }}
                    />
                </Container>
            </DefaultLayout>
        </>
    )
}