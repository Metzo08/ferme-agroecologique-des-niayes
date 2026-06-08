import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Nursery from './pages/Nursery';
import Camping from './pages/Camping';
import Farms from './pages/Farms';
import Shop from './pages/Shop';
import Services from './pages/Services';
import Trainings from './pages/Trainings';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Pisciculture from './pages/Pisciculture';
import Apiculture from './pages/Apiculture';
import Transformation from './pages/Transformation';
import Partnership from './pages/Partnership';

function App() {
  return (
    <AppProvider>
      <Router>
        {/* ScrollToTop remet la page en haut à chaque changement de route */}
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/farms" element={<Farms />} />
              <Route path="/nursery" element={<Nursery />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/camping" element={<Camping />} />
              <Route path="/services" element={<Services />} />
              <Route path="/trainings" element={<Trainings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pisciculture" element={<Pisciculture />} />
              <Route path="/apiculture" element={<Apiculture />} />
              <Route path="/transformation" element={<Transformation />} />
              <Route path="/partenariat" element={<Partnership />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

