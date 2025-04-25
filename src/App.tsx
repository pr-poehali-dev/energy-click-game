
import { Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
