import CodeCell from './components/codecell';
import TextEditor from './components/text-editor';
import CellList from './components/cell-list';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/styles.css';

const App = () => {
  return (
    <div>
      <CellList />
    </div>
  );
};

export default App;
