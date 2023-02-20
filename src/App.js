import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header'
import Auth from './components/auth/Auth'

function App() {
  return (
    <>
      <div className='wrapper'>
        <div className='content'>
          <Header />
          <Auth />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
