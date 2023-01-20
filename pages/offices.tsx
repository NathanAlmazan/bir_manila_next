import { useState } from 'react';
import { GetStaticProps } from 'next';
// mui
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
// components
import { OfficeList } from 'src/sections/offices';
// layouts
import DefaultLayout from "src/layouts";
// apollo
import { useLazyQuery } from '@apollo/client';
import apolloClient from 'src/graphql';
import { 
    GET_ALL_RDO, 
    GET_OFFICES_BY_RDO,
    RevenueDistrict,
    BirOffice
} from 'src/graphql/offices';

const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/offices', label: 'Revenue Region Offices' }
]

interface DistrictOfficesProps {
    revenueDistricts: RevenueDistrict[],
    birOffices: BirOffice[]
}

const TagButton = styled(Button)({
    borderRadius: 50
})

export default function DistrictOffices(props: DistrictOfficesProps) {
    const { birOffices, revenueDistricts } = props;
    const [getOfficesByRdo] = useLazyQuery<{ findOfficesByDistrict: BirOffice[] }>(GET_OFFICES_BY_RDO);
    const [offices, setOFfices] = useState<BirOffice[]>(birOffices);
    const [selected, setSelected] = useState<string | number>('all');

    const handleSelectAll = () => {
        setSelected('all');
        setOFfices(birOffices);
    }

    const handleSelectMainOffice = (name: string) => {
        setSelected(name);
        setOFfices(birOffices.filter(office => office.name === name));
    }

    const handleSelectDistrictOffices = async (district: number) => {
        setSelected(district);

        const response = await getOfficesByRdo({
            variables: {
                district: district
            }
        })

        const offices = response.data;

        if (offices) setOFfices(offices.findOfficesByDistrict)
    }

    const handleTabsChange = (event: React.SyntheticEvent, newValue: string | number) => {
        if (newValue === 'all') handleSelectAll();
        else if (typeof newValue === 'number') handleSelectDistrictOffices(newValue);
        else if (typeof newValue === 'string') handleSelectMainOffice(newValue);
    }

    return (
        <>
             <DefaultLayout
                title='Revenue Region Offices'
                breadcrumbs={breadcrumbs}
            >
                <Container maxWidth='lg'>

                    <Tabs
                        value={selected}
                        onChange={handleTabsChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        <Tab 
                            value={'all'}
                            label={
                                <Typography variant='body1' sx={{ fontWeight: 700 }}>
                                    All
                                </Typography>
                            } 
                        />
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

                        {birOffices.map(office => (
                            <Tab 
                                key={office.name}
                                value={office.name}
                                label={
                                    <Typography variant='body1' sx={{ fontWeight: 700 }}>
                                        {office.name}
                                    </Typography>
                                } 
                            />
                        ))}
                    </Tabs>

                    <OfficeList officeList={offices} />
                </Container>
            </DefaultLayout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const districts = await apolloClient.query<{ findAllDistricts: RevenueDistrict[] }>({
        query: GET_ALL_RDO
    })
 
    const offices = await apolloClient.query<{ findOfficesByDistrict: BirOffice[] }>({
        query: GET_OFFICES_BY_RDO,
        variables: {
            district: null
        }
    })

    return {
        props: {
            revenueDistricts: districts.data.findAllDistricts,
            birOffices: offices.data.findOfficesByDistrict
        }
    }
}