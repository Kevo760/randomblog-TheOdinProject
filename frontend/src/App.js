import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Navbar } from './components/Navbar';

// Pages and routes
import Home from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';
import EditPost from './pages/EditPost';
import { PostForm } from './pages/PostForm';
import { PageNotFound } from './pages/PageNotFound';
import { PostDetail } from './pages/PostDetail';

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
              // element={<PostDetail />}
            />

            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/'/>}
            />

            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/'/>}
            />

            <Route
              path='/addpost'
              element={!user || user.userData !=='Admin' ? <PostForm /> : <Navigate to='/'/>}
            />

            <Route
              path='/editpost'
              element={!user || user.userData !=='Admin' ? <EditPost /> : <Navigate to='/'/>}
            />

            <Route
              path='/pagenotfound'
              element={<PageNotFound />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
