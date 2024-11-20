// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { useEffect, useState } from 'react';
import { getLoggedInUserData } from 'api/user/profile';
import { PacmanLoader } from 'react-spinners';
import HowItWorksCard from 'components/cards/dashboard/HowItWorks';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

const overrideLoaderCSS = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    const { userDataDoc } = await getLoggedInUserData();

    if (userDataDoc) {
      localStorage.setItem("username", userDataDoc.username);
      localStorage.setItem("name", userDataDoc.name);
      localStorage.setItem("profile_pic", userDataDoc.profile_pic);

      setUserData(userDataDoc);
    }
  }

  const makeDateInFormat = (dateString) => {
    const date = new Date(dateString);
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  }

  useEffect(() => {
    getUserData();
  }, [])

  useEffect(() => {
    if (userData || !localStorage.getItem("auth-token")) {
      setLoading(false);
    }
  }, [userData])

  return (
    <>
      {
        userData ?
          (
            loading ?
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "84vh",
                }}
              >
                <PacmanLoader
                  color={"black"}
                  cssOverride={overrideLoaderCSS}
                  loading={loading}
                  size={64}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
              :
              <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {/* row 1 */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                  <Typography variant="h5">Dashboard</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <AnalyticEcommerce title="Current Eco Score" count={userData.ecoScore} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <AnalyticEcommerce title="Total Eco Score" count={userData.ecoScore} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <AnalyticEcommerce title="Clothings Uploaded" count={userData.transactions.length} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <AnalyticEcommerce title="Rewards Redeemed" count={userData.rewards.length} />
                </Grid>

                <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                {/* row 2 */}
                <Grid item xs={12} md={7} lg={8}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h5">Rewards Redeemed</Typography>
                    </Grid>
                    <Grid item />
                  </Grid>
                  <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable redeemedRewardsData={userData.rewards} />
                  </MainCard>
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h5">Transaction History</Typography>
                    </Grid>
                    <Grid item />
                  </Grid>
                  <MainCard sx={{ mt: 2 }} content={false}>
                    <List
                      component="nav"
                      sx={{
                        px: 0,
                        py: 0,
                        '& .MuiListItemButton-root': {
                          py: 1.5,
                          '& .MuiAvatar-root': avatarSX,
                          '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                        }
                      }}
                    >
                      {
                        userData.transactions.map((item) => {
                          return (
                            <ListItemButton divider>
                              <ListItemAvatar>
                                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                                  <SettingOutlined />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={<Typography variant="subtitle1">{item.clothing}</Typography>} secondary={makeDateInFormat(item.createdAt)} />
                              <ListItemSecondaryAction>
                                <Typography variant="h5" noWrap color={item.carbonScore ? 'success.dark' : 'error.dark'}>
                                  + {item.carbonScore}
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItemButton>
                          )
                        })
                      }
                    </List>
                  </MainCard>
                </Grid>
              </Grid>
          )
          :
          <Grid container>
            <Grid item>
              <HowItWorksCard />
            </Grid>
          </Grid>
      }
    </>
  )
    ;
}
