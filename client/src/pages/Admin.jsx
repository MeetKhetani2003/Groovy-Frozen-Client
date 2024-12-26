import { Outlet } from 'react-router-dom';

import Footer from '@/components/molicuels/Footer';
import AdminNav from '@/components/organisms/Admin/AdminNav';

const Admin = () => {
  return (
    <div>
      <div className="px-6 py-2 bg-orange-100">
        <AdminNav />
      </div>
      <div className="px-12 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
