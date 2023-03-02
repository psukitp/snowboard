import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header'
import Auth from './components/auth/Auth'
import Registration from './components/registration/Registration';
import Events from './components/events/Events';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateEventForm from './components/events/CreateEventForm';
import { api } from './api/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Error from './components/error/Error';

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
  }
])

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(api.checkAuth());
    }
  }, [])

  return (
    <>
      <div className='wrapper'>
        <Header />
        <main className='main'>
          <RouterProvider router={router} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
