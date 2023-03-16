import './App.css';
import Auth from './components/auth/Auth'
import Registration from './components/registration/Registration';
import Events from './components/events/Events';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateEventForm from './components/events/CreateEventForm';
import { api } from './api/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Error from './components/error/Error';
import Event from './components/events/Event';
import Resale from './components/resale/Resale';
import CreateResaleAd from './components/resale/CreateResaleAd';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    errorElement: <Error />
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "/events",
    element: <Events />
  },
  {
    path: "events/create-new",
    element: <CreateEventForm />
  },
  {
    path: "events/:id",
    element: <Event />
  },
  {
    path: "/resale",
    element: <Resale />
  },
  {
    path: "resale/create-new",
    element: <CreateResaleAd />
  }
])


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(api.checkAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
