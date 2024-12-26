import { Link } from 'react-router-dom';

import MyDrpDwn from '@/components/molicuels/MyDrpDwn';
import { assets } from '@/utils/AssetImport';

const content = [
  {
    title: 'Products',
    menus: [
      {
        title: 'Add Product',
        url: '/admin/products/create',
      },
      {
        title: 'All Products',
        url: '/admin/products',
      },
    ],
  },
];
const LinkComponent = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="font-montserrat hover:text-main transition-colors duration-300"
    >
      {children}
    </Link>
  );
};
const AdminNav = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="font-montserrat font-bold">Groovy Foods</h1>
        <LinkComponent to="/admin">Dashboard</LinkComponent>
        <LinkComponent to="/admin/customers">Customers</LinkComponent>
        <MyDrpDwn content={content} />
      </div>
      <div>
        <img className="w-8 h-8 rounded-full" src={assets.admin} />
      </div>
    </div>
  );
};

export default AdminNav;
