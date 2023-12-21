import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Navbar } from './components/Navbar';

// Pages and routes
import Home from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />

            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/'/>}
            />

            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/'/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
