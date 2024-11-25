import { useLocation, redirect, Navigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { Box } from '@mui/system';

// project import
import MainCard from 'components/MainCard';

import { getLoggedInUserData } from 'api/user/profile';

const goToDashboard = async () => {
    const { userDataDoc } = await getLoggedInUserData();
    location.href = import.meta.env.VITE_APP_FRONTEND_URI;
};

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function AuthToken() {

    const query = useQuery();

    useEffect(() => {
        localStorage.setItem('auth-token', query.get("code"));

        goToDashboard();
    });

    return (
        <MainCard
            sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}
            content={false}
            border={false}
            boxShadow
            shadow={(theme) => theme.customShadows.z1}
        >
            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                You Have Logged In Successfully
            </Box>
        </MainCard>
    );
}
