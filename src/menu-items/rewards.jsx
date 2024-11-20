// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { IoCartOutline } from "react-icons/io5";

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  IoCartOutline
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const rewards = {
  id: 'rewards',
  title: 'Rewards',
  type: 'group',
  children: [
    {
      id: 'reward-items',
      title: 'Rewards',
      type: 'item',
      url: '/rewards',
      icon: icons.IoCartOutline
    },
  ]
};

export default rewards;
