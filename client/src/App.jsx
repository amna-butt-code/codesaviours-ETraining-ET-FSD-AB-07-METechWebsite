import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Contact from './pages/Contact.jsx';
import Quote from './pages/Quote.jsx';
import NotFound from './pages/NotFound.jsx';
import About from './pages/About.jsx';
import EVCharging from './pages/EVCharging.jsx';
import Training from './pages/Training.jsx';
import TrainingDetail from './pages/TrainingDetail.jsx';
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/training" element={<Training />} />
<Route path="/training/:slug" element={<TrainingDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
<Route path="/ev-charging" element={<EVCharging />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}