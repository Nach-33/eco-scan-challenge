// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { IoCloudUploadOutline } from "react-icons/io5";

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  IoCloudUploadOutline
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const transactions = {
  id: 'transactions',
  title: 'Transactions',
  type: 'group',
  children: [
    {
      id: 'transactions',
      title: 'Transactions',
      type: 'item',
      url: '/transactions',
      icon: icons.IoCloudUploadOutline
    },
  ]
};

export default transactions;
