import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import App from './App';
import Home from './pages/home';
import Threads from './pages/threads';
import CellList from './components/CellList';

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
        element: <Threads />,
        // children: [
        //   {
        //     path: `/celllist${id}`
        //   }
        // ]
      },
      { path: '/celllist', element: <CellList /> },
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
