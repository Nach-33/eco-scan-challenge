// assets
import { DashboardOutlined } from '@ant-design/icons';
import { MdOutlineDashboard } from "react-icons/md";

// icons
const icons = {
  DashboardOutlined,
  MdOutlineDashboard
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.MdOutlineDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
