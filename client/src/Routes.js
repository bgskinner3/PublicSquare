import React from 'react';
import NavBar from './components/NavBar';
import { connect } from 'react-redux';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';
// import { JWT_SECRET } from './constants'
import 'bootstrap/dist/css/bootstrap.min.css';
  

import { UserPage, PostPage, HomePage, Login } from './components';

const DisplayData = (props) => {
  //use this to determine if user is logged in? 
  // const authToken = localStorage.getItem(JWT_SECRET);

  return (
    <div>
      <main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/posts" element={<PostPage />} />
          <Route exact path="/profile" element={<UserPage />} />
          {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
        </Routes>
      </main>
    </div>
   
  );
};

export default DisplayData;





















 // <div>
    //   {authToken ? (
    //     <main>
    //       <Routes>
    //         <Route path="/home" element={<HomePage />} />
    //         <Route exact path="/posts" element={<PostPage />} />
    //         <Route exact path="/profile" element={<UserPage />} />
    //         <Route path="/" element={<Navigate replace to="/home" />} />
    //       </Routes>
    //     </main>
    //   ) : (
    //     <main>
    //       <Routes>
    //         <Route  path="/home" element={<HomePage />} />
    //         <Route exact path="/login" element={<Login />} />
    //         <Route exact path="/posts" element={<PostPage />} />
    //         <Route path="/" element={<Navigate replace to="/home" />} />
    //       </Routes>
    //     </main>
    //   )}
    // </div>