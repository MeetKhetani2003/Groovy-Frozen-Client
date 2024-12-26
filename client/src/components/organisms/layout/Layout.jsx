import { Outlet } from 'react-router-dom';

import Footer from '@/components/molicuels/Footer';
import NavBar from '@/components/molicuels/NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
