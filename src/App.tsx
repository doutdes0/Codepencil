import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer';
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
