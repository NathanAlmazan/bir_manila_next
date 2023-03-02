import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
// mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// components
import { ZoneFilter, ZoneValueList } from 'src/sections/zones';
// layouts
import DefaultLayout from "src/layouts";
// animation
import { AnimatePresence, motion } from 'framer-motion';
// apollo
import { useLazyQuery } from '@apollo/client';
import apolloClient from 'src/graphql';
import { GET_VALUES_BY_DISTRICT, ZonalValue, Zone } from 'src/graphql/zones';
import { GET_ALL_RDO, RevenueDistrict } from 'src/graphql/offices';

const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/banks', label: 'Zonal Values' }
]

interface ZonalValuePageProps {
    revenueDistricts: RevenueDistrict[]
    zones: Zone[]
}

function filterZonalValues(zones: Zone[], barangay: string) {
    let values: ZonalValue[] = [];

    zones.forEach(z => {
        values = values.concat(z.values.filter(o => o.barangay === barangay))
    })

    return values;
}

export default function ZonalValuePage(props: ZonalValuePageProps) {
    const { revenueDistricts, zones } = props
    const [getValuesByDistrict] = useLazyQuery<{ findZonesByDistrict: Zone[] }>(GET_VALUES_BY_DISTRICT);
    const [district, setDistrict] = useState<number>(29);
    const [valueList, setValueList] = useState<Zone[]>(zones);
    const [selectedZone, setSelectedZone] = useState<number>(zones[0].number)
    const [selectedBarangay, setSelectedBarangay] = useState<string>(zones[0].values[0].barangay)

    const handleTabsChange = async (event: React.SyntheticEvent, newValue: number) => {
        setDistrict(newValue);

        const response = await getValuesByDistrict({ variables: {
            district: newValue
        }})

        const zoneList = response.data

        if (zoneList) {
            setValueList(zoneList.findZonesByDistrict);
            setSelectedZone(zoneList.findZonesByDistrict[0].number);
            setSelectedBarangay(zoneList.findZonesByDistrict[0].values[0].barangay);
        }
    }

    const handleSelectBarangay = (barangay: string) => {
        setSelectedBarangay(barangay);
    }

    const handleSelectZone = (zone: number) => {
        setSelectedZone(zone);
        const selected = valueList.find(v => v.number === zone);
        if (selected) setSelectedBarangay(selected.values.map(v => v.barangay)[0]);
    }

    return (
        <>
            <DefaultLayout
                title='Zonal Values'
                breadcrumbs={breadcrumbs}
            >
                <Container maxWidth='lg'>
                    <Tabs
                        value={district}
                        onChange={handleTabsChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        {revenueDistricts.map(district => (
                            <Tab 
                                key={district.number}
                                value={district.number}
                                label={
                                    <Typography variant='body1' sx={{ fontWeight: 700 }}>
                                        {`RDO ${district.number}`}
                                    </Typography>
                                } 
                            />
                        ))}
                    </Tabs>

                    <ZoneFilter 
                        zones={valueList} 
                        selectedZone={selectedZone}
                        selectedBarangay={selectedBarangay}
                        handleSelectBarangay={handleSelectBarangay}
                        handleSelectZone={handleSelectZone}
                    />

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={district}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring" }}
                        >
                           <ZoneValueList zoneList={filterZonalValues(valueList.filter(v => v.number === selectedZone), selectedBarangay)} />
                        </motion.div>
                    </AnimatePresence>
                </Container>
            </DefaultLayout>
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const districts = await apolloClient.query<{ findAllDistricts: RevenueDistrict[] }>({
        query: GET_ALL_RDO
    })

    const zones = await apolloClient.query<{ findZonesByDistrict: Zone[] }>({
        query: GET_VALUES_BY_DISTRICT,
        variables: {
            district: 29
        }
    })

    return {
        props: { 
            revenueDistricts: districts.data.findAllDistricts,
            zones: zones.data.findZonesByDistrict
        }
    }
}
