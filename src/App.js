import './App.css';
import Auth from './components/auth/Auth'
import Registration from './components/registration/Registration';
import Events from './components/events/Events';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateEventForm from './components/events/CreateEventForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Error from './components/error/Error';
import Event from './components/events/Event';
import Resale from './components/resale/Resale';
import CreateResaleAd from './components/resale/CreateResaleAd';
import Profile from './components/profile/Profile';
import ResaleAd from './components/resale/ResaleAd';
import Statistic from './components/statistic/Statistic'
import { userApi } from './api/userApi';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Events />,
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
    path: "/events/create-new",
    element: <CreateEventForm />
  },
  {
    path: "/events/:id",
    element: <Event />
  },
  {
    path: "/resale",
    element: <Resale />
  },
  {
    path: "/resale/create-new",
    element: <CreateResaleAd />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/resale/:id",
    element: <ResaleAd />
  },
  {
    path: "/statistic",
    element: <Statistic />
  }
])


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userApi.checkAuth());
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
