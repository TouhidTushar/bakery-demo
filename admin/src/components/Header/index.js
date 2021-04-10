import { Link } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions";
import { rootDir } from "../../urlConfig";

const Header = (props) => {
  const [navBtn, setnavBtn] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const btnChange = () => {
    var toggle = document.getElementsByClassName("fa-times");
    if (toggle.length === 0) {
      setnavBtn(true);
    } else {
      setnavBtn(false);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(signout());
  };

  const renderLoggedInLinks = () => {
    return (
      <>
        <div className="navLink">
          <li className="nav-item">
            <button id="signOutBtn" onClick={logout}>
              Sign Out
            </button>
          </li>
        </div>
        <div className="bars">
          <button id="signOutBtn" onClick={logout}>
            Sign Out
          </button>
        </div>
      </>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <>
        <div className="navLink">
          <li className="nav-item">
            <Link
              id="signInLink"
              to="/SignIn"
              style={
                window.location.href === `${rootDir}/SignIn`
                  ? { color: "white" }
                  : null
              }
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link
              id="signUpLink"
              to="/SignUp"
              style={
                window.location.href === `${rootDir}/SignUp`
                  ? { color: "white" }
                  : null
              }
            >
              Sign Up
            </Link>
          </li>
        </div>
        <div className="bars">
          <i
            className={navBtn ? "fas fa-times" : "fas fa-bars"}
            onClick={btnChange}
          ></i>
        </div>
      </>
    );
  };

  const renderLoggedInDrop = () => {
    return null;
  };

  const renderNonLoggedInDrop = () => {
    return (
      <div className={navBtn ? "dropActive" : "dropDownNav"}>
        <li className="nav-item">
          <Link to="/SignIn">Sign In</Link>
        </li>
        <li className="nav-item">
          <Link to="/SignUp">Sign Up</Link>
        </li>
      </div>
    );
  };

  return (
    <>
      <div className="navBar">
        <Link to="/" className="mainLink">
          Bakery Admin
        </Link>

        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </div>

      {auth.authenticate ? renderLoggedInDrop() : renderNonLoggedInDrop()}
    </>
  );
};

export default Header;
