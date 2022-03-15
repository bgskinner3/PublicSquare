import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { JWT_SECRET, USER, USER_ID } from '../constants';

const NavBar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(JWT_SECRET);
  console.log('auth nav', authToken);
  return (
    <div className="nav">
      <nav>
        <div>
          <Link to="/" className="navLink">
            PUBLIC SQUARE
          </Link>
          <Link to="/posts" className="navLink">
            Posts
          </Link>
          {/* <div className="ml1">|</div>
        <Link
          to="/search"
          className="ml1 no-underline black"
        >
          search
        </Link>
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link
              to="/create"
              className="ml1 no-underline black"
            >
              submit
            </Link>
          </div>
        )} */}
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
            <div>
              <Link to="/profile" className="navLink">
                Profile
              </Link>
              <Link
                className="navLink"
                to="/"
                onClick={() => {
                  localStorage.removeItem(JWT_SECRET);
                  navigate(`/login`);
                }}
              >
                logout
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login" className="navLink">
                login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );

  // <div id="nav">
  //   <nav className="row">
  //     <ul>
  //       <li>
  //         <Link className="navBar" to="/">
  //           Home
  //         </Link>
  //       </li>
  //       <li>
  //         <Link className="navBarLink" to="/users">
  //           Users
  //         </Link>
  //       </li>
  //       <li>
  //         <Link className="navBarLink" to="/join">
  //           Join
  //         </Link>
  //       </li>
  //       <li>
  //         <Link className="navBarLink" to="/profile">
  //           Profile
  //         </Link>
  //       </li>
  //       <li>
  //         <Link className="navBarLink" to="/posts">
  //          Posts
  //         </Link>
  //       </li>
  //     </ul>

  //   </nav>

  // </div>
  //);
};

export default NavBar;
