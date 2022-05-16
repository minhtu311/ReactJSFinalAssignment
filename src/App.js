import React, { useState, useEffect } from 'react'
import Home from './components/HomePage/Home'
import PostsPage from './components/PostsPage/PostsPage'
import LoginPage from './components/LoginPage/LoginPage';
import PostPage from './components/PostPage/PostPage';
import ProfilePage from './components/ProfilePgae/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserContext from './contexts/UserContext';
import PostsOutlet from './components/PostsOutlet/PostsOutlet';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("TOKEN", token)
    } else {
      localStorage.removeItem("TOKEN")
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("USERID", userId)
    } else {
      localStorage.removeItem("USERID")
    }
  }, [userId]);

  const shareAuthenticationTool = {
    token, setToken, userId, setUserId
  }

  return (
    <div className='container'>
      <BrowserRouter>
        <UserContext.Provider value={shareAuthenticationTool}>
          <ul className="nav mb-3 mt-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="posts">Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="profile">Profile</Link>
            </li>
            <li className="nav-item">
              {
                token === null ?
                  (<Link className="nav-link" to="login">Login</Link>)
                  : (<button onClick={() => { setToken(null); setUserId(null) }} className='btn btn-primary'>Logout</button>)
              }
            </li>

          </ul>
          <hr />
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
            <Route path="/posts" element={<PostsOutlet />}>
              <Route index element={<PostsPage />} />
              <Route path=":id" element={<PostPage />} />
            </Route>
            <Route path="/profile" element={<ProfilePage />}>
            </Route>
            <Route path="/login" element={<LoginPage />}>
            </Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App