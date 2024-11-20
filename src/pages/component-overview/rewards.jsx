// material-ui
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import ProductCard from 'components/cards/rewards/ProductCard';
import { useEffect, useState } from 'react';
import { getRewardItems } from 'api/rewards/rewardItems';
import { getLoggedInUserData } from 'api/user/profile';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

export default function ComponentRewards() {

    const [rewardItemsList, setRewardItemsList] = useState([]);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        const { userDataDoc } = await getLoggedInUserData();

        if (userDataDoc) {
            setUserData(userDataDoc);
        }
    }


    const populateRewardItemsList = async () => {
        const { rewardItemsList } = await getRewardItems();

        rewardItemsList.sort((a, b) => {
            return a.cost - b.cost;
        });

        setRewardItemsList(rewardItemsList);
    };

    useEffect(() => {
        getUserData();

    }, []);
    
    useEffect(() => {
        populateRewardItemsList();
    }, [userData])
    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                {rewardItemsList.map((product, index) => {
                    return (
                        <Grid item xs={12} md={6} lg={4}>
                            <ProductCard productData={product} userEP={userData?.ecoScore || 0}/>
                        </Grid>
                    )
                })}
            </Grid>
        </ComponentSkeleton>
    );
}
