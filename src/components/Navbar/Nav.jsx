import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink as NavLinkin } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

function Navibar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [btn, setBtn] = useState("Login");

  const toggle = () => setIsOpen(!isOpen);

  function handleLogout() {
    window.localStorage.removeItem("token");
    // window.location.reload();
    window.location.href = "/";
  }

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setLoggedIn(true);
      setBtn("Logout");
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <Navbar className='flex justfiy-center justify-around items-center p-7 bg-yellow-400 font-sans'>
      <NavbarBrand className='text-3xl font-bold text-yellow-900 ' href='/'>
        Happiness Wonder
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav
          className='flex justify-between items-center text-yellow-900 text-lg font-bold'
          navbar
        >
          <NavItem>
            <NavLink tag={NavLinkin} to='/' alt='home'>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='ml-5 hover:border-b-2 border-gray-400'
              alt='rankings'
              tag={NavLinkin}
              to='/rankings'
            >
              Ranking
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='ml-5' tag={NavLinkin} to='/Search' alt='search'>
              Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='ml-5'
              tag={NavLinkin}
              to='/Factors'
              alt='factors'
            >
              Factors
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='ml-5'
              tag={NavLinkin}
              to='/Register'
              alt='register'
            >
              Register
            </NavLink>
          </NavItem>
          {!loggedIn ? (
            <div>
              <NavbarText className='navbar__link'>
                <Link className='ml-5' tag={NavLinkin} to='/login' alt='login'>
                  {/* Login */}
                  {btn}
                </Link>
              </NavbarText>
            </div>
          ) : (
            <NavbarText
              className='ml-5 border-2 align-middle border-yellow-500 rounded-lg'
              alt='logout'
            >
              <button
                className='w-24 font-bold justify-items-center'
                onClick={handleLogout}
              >
                {/* Logout */}
                {btn}
              </button>
            </NavbarText>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}
export default Navibar;
