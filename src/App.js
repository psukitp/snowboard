import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header'
import Auth from './components/auth/Auth'
import Registration from './components/registration/Registration';
import Events from './components/events/Events';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
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
  }
])

function App() {
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
