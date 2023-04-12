import './App.css';
import 'normalize.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home, CreatePost } from './Pages';
import NotFound from './Components/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <nav className='nav'>
          <Link to='/' className='logo'>
            <img src='/favicon.svg' alt='logo' /> Alexis.AI
          </Link>
          <Link to='/create' className='nav-link'>
            Create
          </Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
