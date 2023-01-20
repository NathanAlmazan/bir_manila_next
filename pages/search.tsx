import { GetServerSideProps } from "next";
import { useState, useEffect } from 'react';
// mui
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
// layouts
import DefaultLayout from "src/layouts";
// components
import { CharterList } from 'src/sections/charter';
import { BankList } from 'src/sections/banks';
import { OfficeList } from 'src/sections/offices';
// animation
import { AnimatePresence, motion } from 'framer-motion';
// apollo
import apolloClient from 'src/graphql';
import { 
    CitizenCharter,
    SEARCH_CHARTER
} from 'src/graphql/charter';
import { 
    AccreditedBank,
    SEARCH_BANKS
} from 'src/graphql/banks';
import { 
    BirOffice,
    SEARCH_OFFICES
} from 'src/graphql//offices';

interface SearchPageProps {
    search: string;
    charterResults: CitizenCharter[],
    bankResults: AccreditedBank[],
    officeResults: BirOffice[]
}

const tabList = ['Citizen Charter', 'Accredited Banks', 'Region Offices', 'Zonal Values']

export default function SearchPage(props: SearchPageProps) {
    const { search, bankResults, charterResults, officeResults } = props;
    const [selected, setSelected] = useState<string>("Citizen Charter");
    const [empty, setEmpty] = useState<boolean>(false);

    useEffect(() => {
        if (charterResults.length > 0) setSelected("Citizen Charter");
        else if (bankResults.length > 0) setSelected('Accredited Banks');
        else if (officeResults.length > 0) setSelected('Region Offices');
        else setEmpty(true)
    }, [bankResults, charterResults, officeResults])

    const handleTabsChange = async (event: React.SyntheticEvent, newValue: string) => {
        setSelected(newValue);
    }

    const checkIfDisabled = (tab: string) => {
        switch(tab) {
            case 'Citizen Charter':
                return charterResults.length === 0;
            case 'Accredited Banks':
                return bankResults.length === 0; 
            case 'Region Offices':
                return officeResults.length === 0;
            default: 
                return true;
        }
    }

    return (
        <DefaultLayout
            title={search}
            breadcrumbs={[]}
            search
        >
            <Container maxWidth='lg'>
                <Tabs
                    value={selected}
                    onChange={handleTabsChange}
                    variant='scrollable'
                    scrollButtons='auto'
                >
                    {tabList.map(tab => (
                        <Tab 
                            key={tab}
                            value={tab}
                            disabled={checkIfDisabled(tab)}
                            label={
                                <Typography variant='body1' sx={{ fontWeight: 700 }}>
                                    {tab}
                                </Typography>
                            } 
                        />
                    ))}
                </Tabs>

                {selected === 'Citizen Charter' && (
                     <AnimatePresence mode='wait'>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring" }}
                        >
                            <CharterList charterList={charterResults} />
                        </motion.div>
                    </AnimatePresence>
                )}

                {selected === 'Accredited Banks' && (
                     <AnimatePresence mode='wait'>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring" }}
                        >
                            <BankList bankList={bankResults} />
                        </motion.div>
                    </AnimatePresence>
                )}

                {selected === 'Region Offices' && (
                     <AnimatePresence mode='wait'>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring" }}
                        >
                            <OfficeList  officeList={officeResults} />
                        </motion.div>
                    </AnimatePresence>
                )}

            </Container>
        </DefaultLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const search = query.q as string;

    const charters = await apolloClient.query<{ searchCharter: CitizenCharter[] }>({
        query: SEARCH_CHARTER,
        variables: {
            search: search
        }
    })

    const banks = await apolloClient.query<{ findBanksByAddress: AccreditedBank[] }>({
        query: SEARCH_BANKS,
        variables: {
            address: search
        }
    })

    const offices = await apolloClient.query<{ searchBirOffices: BirOffice[] }>({
        query: SEARCH_OFFICES,
        variables: {
            office: search
        }
    })

    return {
        props: {
            search: search,
            charterResults: charters.data.searchCharter,
            bankResults: banks.data.findBanksByAddress,
            officeResults: offices.data.searchBirOffices
        }
    }
}