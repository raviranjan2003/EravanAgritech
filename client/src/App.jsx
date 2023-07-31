import logo from './logo.svg';
import './App.css';
import { Routes , Route } from "react-router-dom";
import Header from './components/header';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
}

export default App;
