import React from 'react';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/codecell';
import TextEditor from './components/text-editor';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  return (
    <div>
      <CellList />
    </div>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
