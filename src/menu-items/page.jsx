// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
const backendURI = import.meta.env.VITE_APP_BACKEND_URI;

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

const registerURI = backendURI + "/user/auth";

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/auth/login',
      icon: icons.LoginOutlined,
      // target: true
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: registerURI,
      icon: icons.ProfileOutlined,
      // target: true
    },
  ]
};

export default pages;
