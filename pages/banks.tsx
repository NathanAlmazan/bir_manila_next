import { useState } from 'react';
import { GetStaticProps } from 'next';
// mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// components
import { BankList } from 'src/sections/banks';
// layouts
import DefaultLayout from "src/layouts";
// animation
import { AnimatePresence, motion } from 'framer-motion';
// apollo
import { useLazyQuery } from '@apollo/client';
import apolloClient from 'src/graphql';
import { GET_ALL_RDO, RevenueDistrict } from 'src/graphql/offices';
import { GET_BANKS_BY_RDO, AccreditedBank } from 'src/graphql/banks';

const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/banks', label: 'Accredited Banks' }
]

interface AccreditedBanksProps {
    revenueDistricts: RevenueDistrict[]
    accreditedBanks: AccreditedBank[]
}

export default function AccreditedBanks(props: AccreditedBanksProps) {
    const { revenueDistricts, accreditedBanks } = props
    const [getAccreditedBanks] = useLazyQuery<{ findBanksByDistrict: AccreditedBank[] }>(GET_BANKS_BY_RDO);
    const [district, setDistrict] = useState<number>(29);
    const [bankList, setBankList] = useState<AccreditedBank[]>(accreditedBanks);

    const handleTabsChange = async (event: React.SyntheticEvent, newValue: number) => {
        setDistrict(newValue);

        const response = await getAccreditedBanks({ variables: {
            district: newValue
        }})

        const banks = response.data

        if (banks) setBankList(banks.findBanksByDistrict);
    }

    return (
        <>
            <DefaultLayout
                title='Accredited Banks'
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

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={district}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring" }}
                        >
                            <BankList bankList={bankList} />
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

    const banks = await apolloClient.query<{ findBanksByDistrict: AccreditedBank[] }>({
        query: GET_BANKS_BY_RDO,
        variables: {
            district: 29
        }
    })

    return {
        props: { 
            revenueDistricts: districts.data.findAllDistricts,
            accreditedBanks: banks.data.findBanksByDistrict
         }
    }
}