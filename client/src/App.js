import { useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";   //url change hone pr login aur homepage alag dikhe isliye routing krni h

import DataProvider from './context/DataProvider';

import Login from './components/account/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from "./components/create/CreatePost";
import Update from "./components/create/Update";
import DetailView from './components/details/DetailView';
import About from "./components/about/About";
import Contact from "./components/contact/Contact";


const PrivateRoute = ({ isAuthenticated, ...props }) => {                 // kya banda authenticated h login krne ke liye
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ?
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
      
      <Box style={{marginTop:50}}>
      <Routes>
        <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
        <Route path='/' element={<Home />} />
        </Route>

        <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>

        <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
        <Route path='/details/:id' element={<DetailView />} />
        </Route>

        <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
        <Route path='/update/:id' element={<Update />} />
        </Route>

        <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
        <Route path='/about' element={<About />} />
        </Route>

        <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
        <Route path='/contact' element={<Contact />} />
        </Route>

      </Routes>
      </Box>
      </BrowserRouter>
    </DataProvider>
    
  );
}

export default App;
