import Navbar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/styles.css';

const App = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
