import CodeCell from '../components/CodeCell';
import { Cell } from '../state';
import './home.css';

const Home = () => {
  const heroCell: Cell = {
    id: '1',
    type: 'code',
    content: 'const foo="bar"',
  };
  return (
    <div className="hero">
      <div className="hero-story">
        <h2>Welcome to Codepencil</h2>
      </div>
      <div className="hero-card">
        <div className="hero-showcase">
          <CodeCell cell={heroCell} />
        </div>
      </div>
    </div>
  );
};

export default Home;
