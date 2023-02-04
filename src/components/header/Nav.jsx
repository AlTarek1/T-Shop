import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { ShowLogin, ShowLogout } from "../hiddenLink/HiddenLink";

import {
  REMOVE_LOGGED_IN,
  selectEmail,
  selectIsLoggedIn,
  selectUserID,
  selectUserName,
  SET_LOGGED_IN,
} from "../../redux/reducers/isLoggedIn";
import { selectCart } from "../../redux/reducers/cartSlice";

export const logo = (
  <div className="main-header">
    <Link to="/" className={`home-link`}>
      <h1>
        T<span>shop</span>
      </h1>
    </Link>
  </div>
);

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const handleShowMenu = () => setShowMenu(true);
  const handleHideMenu = () => setShowMenu(false);
  const [loading, setLoading] = useState(false);
  const IsLogedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsInCart = useSelector(selectCart);
  const activeStart = ({ isActive }) => (isActive ? "active" : "");
  const cart = (
    <div className="cart">
      <NavLink to="/cart" className={activeStart}>
        <FaShoppingCart size={25} />
        <span>{itemsInCart.length}</span>
      </NavLink>
    </div>
  );
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("logOut Successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const ui = user.email.slice(0, -10);
          const username = ui[0].toUpperCase() + ui.slice(1);
          setDisplayName(username);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(
          SET_LOGGED_IN({ name: displayName, ID: user.uid, email: user.email })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_LOGGED_IN());
      }
    });
  }, [dispatch, displayName]);

  return (
    <>
      {loading && <Loader />}
      <nav>
        <div className="nav-links">
          {showMenu && (
            <div className="nav-wrapper" onClick={handleHideMenu}></div>
          )}
          <div className={`${showMenu ? "show-nav" : "hide-nav"}`}>
            <ul className="nav-left" onClick={handleHideMenu}>
              <li className="special-li">
                {logo}
                <FaTimes size={22} color="#fff" />
              </li>
              <li>
                <NavLink to="/admin" className={activeStart}>
                  Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={activeStart}>
                  Home
                </NavLink>
              </li>
            </ul>
            <div className="nav-right">
              <ul onClick={handleHideMenu}>
                <ShowLogin>
                  <li>
                    <a href="#">
                      <FaUserCircle size={16} />
                      Hi, {displayName}
                    </a>
                  </li>
                </ShowLogin>
                <ShowLogout>
                  <li>
                    <NavLink to="/login" className={activeStart}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={activeStart}>
                      Register
                    </NavLink>
                  </li>
                </ShowLogout>
                <ShowLogin>
                  <li>
                    <Link to="/" onClick={logoutUser}>
                      LogOut
                    </Link>
                  </li>
                </ShowLogin>
              </ul>
              {cart}
            </div>
          </div>

          <div className="menu-icon">
            {cart}
            <FaBars size={20} onClick={handleShowMenu} />
          </div>
        </div>
      </nav>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Nav;
