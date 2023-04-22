import Navbar from './components/NavBar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default App;
