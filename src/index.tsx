import React from 'react';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/codecell';
import TextEditor from './components/text-editor';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
