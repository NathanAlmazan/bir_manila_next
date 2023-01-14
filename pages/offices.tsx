import { useState } from 'react';
import { GetStaticProps } from 'next';
// mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
// components
import { OfficeList } from 'src/sections/offices';
// layouts
import DefaultLayout from "src/layouts";
// animation
import { AnimatePresence, motion } from 'framer-motion';
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
    const [selected, setSelected] = useState<string>('all');

    const handleSelectAll = () => {
        setSelected('all');
        setOFfices(birOffices);
    }

    const handleSelectMainOffice = (name: string) => {
        setSelected(name);
        setOFfices(birOffices.filter(office => office.name === name));
    }

    const handleSelectDistrictOffices = async (district: number) => {
        setSelected(district.toString());

        const response = await getOfficesByRdo({
            variables: {
                district: district
            }
        })

        const offices = response.data;

        if (offices) setOFfices(offices.findOfficesByDistrict)
    }

    return (
        <>
             <DefaultLayout
                title='Revenue Region Offices'
                breadcrumbs={breadcrumbs}
            >
                <Container maxWidth='lg'>

                    <Grid container spacing={2} sx={{ py: 2 }}>
                        <Grid item>
                            <TagButton 
                                variant={selected === 'all' ? 'contained' : 'outlined'}
                                onClick={handleSelectAll}
                            >
                                All
                            </TagButton>
                        </Grid>
                        {revenueDistricts.map(district => (
                            <Grid key={district.number} item>
                                <TagButton 
                                    variant={selected === `${district.number}` ? 'contained' : 'outlined'}
                                    onClick={() => handleSelectDistrictOffices(district.number)}
                                >
                                    {`RDO ${district.number}`}
                                </TagButton>
                            </Grid>
                        ))}
                        {birOffices.map(office => (
                            <Grid key={office.name} item>
                                <TagButton 
                                    variant={selected === office.name ? 'contained' : 'outlined'}
                                    onClick={() => handleSelectMainOffice(office.name)}
                                >
                                    {office.name}
                                </TagButton>
                            </Grid>
                        ))}
                    </Grid>

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