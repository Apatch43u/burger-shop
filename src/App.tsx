import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullBurger from './pages/FullBurger';
import { Routes, Route } from 'react-router-dom';
import MainTemplates from './templates/MainTemplates';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainTemplates />}>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/burger/:id' element={<FullBurger />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
