import logo from './logo.svg';
import './App.css';
import { Routes , Route } from "react-router-dom";
import Header from './components/header';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Marketplace from './pages/marketplace/Marketplace';
import Akshyapatra from './pages/akshyapatra/Akshyapatra';
import Margdarshak from './pages/margdarshak/Margdarshak';
import Pricetrend from './pages/pricetrend/Pricetrend';
import Buy from './pages/buy/Buy';
import AdminPanel from './pages/adminpanel/AdminPanel';
import AdminLogin from './pages/adminlogin/AdminLogin';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/akshyapatra" element={<Akshyapatra />} />
        <Route path="/margdarshak" element={<Margdarshak />} />
        <Route path="/pricetrend" element={<Pricetrend />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
  );
}

export default App;
