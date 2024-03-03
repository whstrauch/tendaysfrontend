import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration
} from "react-router-dom";

import Login from './screens/Login';
import Play from './screens/Play';
import Nav from './components/Nav';
import CreateGame from './screens/CreateGame';
import JoinGame from './screens/Join';
import RulesModal from './components/RulesModal';
import JoinRoom from './screens/JoinRoom';




const NavbarWrapper = () => {
  const [rulesActive, setRules] = useState(false);


  return (
    <div>
        <Nav rules={() => setRules(!rulesActive)} />
        <RulesModal active={rulesActive} exit={() => setRules(!rulesActive)}/>
        <Outlet/>
        <ScrollRestoration />
    </div>  
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/play/:gameId",
        element: <Play />
      },
      {
        path: "/create",
        element: <CreateGame />
      },
      {
        path: "/join",
        element: <JoinGame />
      },
      {
        path: "/gameroom/:gameId",
        element: <JoinRoom />
      }
    ],
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
