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
import ImageUpload from 'components/cards/upload/ImageUpload';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

export default function ComponentTransactions() {

    const {user} = useContext(AuthContext);

    useEffect(() => {
        if(!user){
            window.location.href = "/auth/login"
        }
    },[])

    return (
        <ComponentSkeleton>
            <Grid container spacing={3} justifyContent='center' xs={12} md={12} lg={12}>
                <Grid item>
                    <ImageUpload />
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
}
