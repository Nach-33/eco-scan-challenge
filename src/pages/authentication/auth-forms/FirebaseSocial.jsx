import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// assets
import Google from 'assets/images/icons/google.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

export default function FirebaseSocial() {
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const googleHandler = async () => {
    // login || singup
    window.location.href = (import.meta.env.VITE_APP_BACKEND_URI + "/user/auth");
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
      justifyContent={{ xs: 'space-around', sm: 'space-between' }}
      sx={{ '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={true}
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleHandler}
      >
        {!downSM && 'Google'}
      </Button>
    </Stack>
  );
}
