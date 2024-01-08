import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Navbar } from './components/Navbar';

// Pages and routes
import Home from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';
import EditPost from './pages/PostControl';
import { PostForm } from './pages/PostForm';
import { PageNotFound } from './pages/PageNotFound';
import { PostDetail } from './pages/PostDetail';
import { DetailPostProvider } from './context/DetailPostContext';
import { PostEditDetail } from './pages/PostDetailEdit';
import { DraftPostContextProvider } from './context/DraftPostContext';
import DraftPostControl from './pages/DraftPostControl'
import { DraftPostEdit } from './pages/DraftPostEdit';

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

            <Route
              path='/addpost'
              element={!user || user.userData !=='Admin' ? <PostForm /> : <Navigate to='/'/>}
            />

            <Route
              path='/postcontrol'
              element={!user || user.userData !=='Admin' ? <EditPost /> : <Navigate to='/'/>}
            />

            <Route 
              path='/post/:postID'
              element={
              <DetailPostProvider>
                <PostDetail />
              </DetailPostProvider>  
            }
            />

            <Route 
              path='/postcontrol/:postID'
              element={
              !user || user.userData !=='Admin' ?
              <DetailPostProvider>
                <PostEditDetail />
              </DetailPostProvider> 
              : 
              <Navigate to='/'/>
            }
            />

            <Route
              path='/draftpostcontrol'
              element={
                !user || user.userData !=='Admin' ?
                <DraftPostContextProvider>
                  <DraftPostControl />
                </DraftPostContextProvider> 
                : 
                <Navigate to='/'/>
              }
            />

            <Route
              path='/draftpostcontrol/:draftID'
              element={
                !user || user.userData !=='Admin' ?
                <DraftPostContextProvider>
                  <DraftPostEdit />
                </DraftPostContextProvider> 
                : 
                <Navigate to='/'/>
              }
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
