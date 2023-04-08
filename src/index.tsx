import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import App from './App';
import Home from './pages/home';
import CellList from './components/CellList';
import ThreadList from './components/ThreadList';
import AddThread from './components/AddThread';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/threads',
        element: <ThreadList />,
      },
      {
        path: '/cellList',
        element: <CellList />,
      },
      {
        path: '/addThread',
        element: <AddThread />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
