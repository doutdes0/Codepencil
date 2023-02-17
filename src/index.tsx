import React from 'react';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/codecell';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
