import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Products';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Auth />} />
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path="/product-detail/:id" element={<ProductDetail />} />
      </Routes>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
