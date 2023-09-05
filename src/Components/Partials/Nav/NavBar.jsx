import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";
import Logo from "../../../Assets/SVG/logo.svg";

const NavBar = () => {
  /* Setting up the variable to handle the state of mobile menu */

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <>
      {/* Start of the navigation component */}
      <nav className="navigation">
        {/* Logo */}
        <img className="brand-name" src={Logo} alt="logo" />
        {/* Button with a onclick event from useState hook used  for  a hamburger menu */}
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M4 18L20 18"
                stroke="#d39d5b"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M4 12L20 12"
                stroke="#d39d5b"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M4 6L20 6"
                stroke="#d39d5b"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        {/* Menu changing state depending on screen size */}
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            <li>
              {/* Navlinks for internal navigation, changing color based on active/inactive state */}
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#d39d5b" : "#707070",
                })}
              >
                FORSIDE
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                style={({ isActive }) => ({
                  color: isActive ? "#d39d5b" : "#707070",
                })}
              >
                FORESTILLINGER & EVENTS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/actors"
                style={({ isActive }) => ({
                  color: isActive ? "#d39d5b" : "#707070",
                })}
              >
                SKUESPILLERE
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                style={({ isActive }) => ({
                  color: isActive ? "#d39d5b" : "#707070",
                })}
              >
                LOGIN
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

/* Exporting the component so it can be used elsewhere */
export default NavBar;
