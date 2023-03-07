import { useState } from 'react';
import { GetStaticProps } from 'next';
// mui
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
// layouts
import DefaultLayout from 'src/layouts';
// components
import { CharterList } from 'src/sections/charter';
// animation
import { AnimatePresence, motion } from 'framer-motion';
// apollo
import { useLazyQuery } from '@apollo/client';
import apolloClient from 'src/graphql';
import { 
    GET_ALL_CATEGORIES, 
    GET_CHARTER_BY_CATEGORY,
    CharterCategories,
    CitizenCharter
} from 'src/graphql/charter';

const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/charter', label: 'Citizen Charter' }
]

interface CitizenCharterProps {
    categories: CharterCategories[];
    charters: CitizenCharter[];
}

export default function CitizenCharterPage(props: CitizenCharterProps) {
    const { categories, charters } = props;
    const [selected, setSelected] = useState<string>("1");
    const [charterList, setCharterList] = useState<CitizenCharter[]>(charters);

    const [getChartersByCategory] = useLazyQuery<{ findChartersByCategory: CitizenCharter[] }>(GET_CHARTER_BY_CATEGORY);

    const handleTabsChange = async (event: React.SyntheticEvent, newValue: string) => {
        setSelected(newValue);

        const response = await getChartersByCategory({ variables: {
            category: parseInt(newValue)
        }})

        const banks = response.data

        if (banks) setCharterList(banks.findChartersByCategory);
    }

    return (
        <>
            <DefaultLayout
                title='Citizen Charter'
                breadcrumbs={breadcrumbs}
            >
                <Container maxWidth='lg'>
                    <Tabs
                        value={selected}
                        onChange={handleTabsChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        {categories.map(category => (
                            <Tab 
                                key={category.id}
                                value={category.id}
                                label={
                                    <Typography variant='body1' sx={{ fontWeight: 700 }}>
                                        {category.name}
                                    </Typography>
                                } 
                            />
                        ))}
                    </Tabs>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring" }}
                        >
                            <CharterList charterList={charterList} />
                        </motion.div>
                    </AnimatePresence>
                </Container>
            </DefaultLayout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const categories = await apolloClient.query<{ findAllCategories: CharterCategories[] }>({
        query: GET_ALL_CATEGORIES
    })

    const charters = await apolloClient.query<{ findChartersByCategory: CitizenCharter[] }>({
        query: GET_CHARTER_BY_CATEGORY,
        variables: {
            category: 1
        }
    })

    return {
        props: {
            categories: categories.data.findAllCategories,
            charters: charters.data.findChartersByCategory
        }
    }
}