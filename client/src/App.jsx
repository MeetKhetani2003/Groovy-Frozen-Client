import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateProduct from './components/organisms/Admin/CreateProduct';
import Customers from './components/organisms/Admin/Customers';
import Dashboard from './components/organisms/Admin/Dashboard';
import Products from './components/organisms/Admin/Products';
import AuthCallback from './components/organisms/auth/AuthCallback';
import AuthContainer from './components/organisms/auth/AuthContainer';
import SigninContainer from './components/organisms/auth/SignInContainer';
import SignupContainer from './components/organisms/auth/SignupContainer';
import Layout from './components/organisms/layout/Layout';
import MenuDetail from './components/organisms/Menu/MenuDetail';
import About from './pages/About';
import AboutUs from './pages/About';
import Admin from './pages/Admin';
import CheckoutPage from './pages/CheckoutPAge';
import Contact from './pages/Contact';
import ContactUs from './pages/Contact';
import Home from './pages/Home';
import Menu from './pages/MenuPage';
import Success from './pages/Success';
// import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Uncomment when needed */}
        <Route
          path="/auth/signup"
          element={
            <AuthContainer>
              <SignupContainer />
            </AuthContainer>
          }
        />
        <Route
          path="/auth/login"
          element={
            <AuthContainer>
              <SigninContainer />
            </AuthContainer>
          }
        />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/products/create" element={<CreateProduct />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route path="/facebook/callback" element={<AuthCallback />} />
          <Route path="/google/callback" element={<AuthCallback />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            index
            element={
              // <ProtectedRoute>
              <Home />
              // </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<MenuDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
