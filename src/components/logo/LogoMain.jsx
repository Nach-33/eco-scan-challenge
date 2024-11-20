// material-ui
import { useTheme } from '@mui/material/styles';
import logo from "../../assets/images/icons/rewild.webp"
import { Typography } from '@mui/material';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <img src={logo} alt="EcoScan" width="40" />
      <Typography variant = "h3">
        EcoScan
      </Typography>
    </>
  );
};

export default Logo;
