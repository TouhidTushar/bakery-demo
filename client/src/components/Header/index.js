import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiCakeSlice } from "react-icons/gi";
import LoginModal from "../UI/Modals/LoginModal";
import SignUpModal from "../UI/Modals/SignUpModal";
import { searchItems, signout } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { rootDir, productImageDir } from "../../urlConfig";
import { inventoryConstants } from "../../actions/constants";
import { FiHome, FiInfo, FiPhoneCall } from "react-icons/fi";
import PassRecoveryModal from "../UI/Modals/PassRecoveryModal";

//header layout
const Header = (props) => {
  const dispatch = useDispatch();
  const [scroll, setscroll] = useState(false);
  const [dropNav, setdropNav] = useState(false);
  const [itemCount, setitemCount] = useState(0);
  const [signOpen, setsignOpen] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [didMount, setdidMount] = useState(false);
  const [loginOpen, setloginOpen] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [searchOpen, setsearchOpen] = useState(false);
  const [dropNavCat, setdropNavCat] = useState(false);
  const [passRecOpen, setpassRecOpen] = useState(false);
  const [dropUserMenu, setdropUserMenu] = useState(false);
  const [dropMenuActive, setdropMenuActive] = useState(false);
  const [userMenuActive, setuserMenuActive] = useState(false);

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const category = useSelector((state) => state.inventory);
  const searchRes = useSelector((state) => state.inventory.SearchResult);

  useEffect(() => {
    setdidMount(true);
    return () => setdidMount(false);
  }, []);

  useEffect(() => {
    if (dropNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [dropNav]);

  useEffect(() => {
    if (searchInput.length > 2) {
      dispatch(searchItems(searchInput));
    }
    if (searchInput.length < 1) {
      dispatch({ type: inventoryConstants.SEARCH_CANCEL });
    }
  }, [searchInput]);

  useEffect(() => {
    if (auth.authenticate) {
      setloggedIn(true);
      if (cart.cartItems.length > 0) {
        document.getElementById("cartCount").style.opacity = 100;
        document.getElementById("cartCount").innerHTML = cart.cartItems.length;
      } else {
        document.getElementById("cartCount").style.opacity = 0;
        document.getElementById("cartCount").innerHTML = null;
      }
    } else {
      setloggedIn(false);
      try {
        var retrievedData = localStorage.getItem("Cart");
        const cartData = JSON.parse(retrievedData);
        setitemCount(cartData.cartItems.length);
        if (itemCount > 0) {
          document.getElementById("cartCount").style.opacity = 100;
          document.getElementById("cartCount").innerHTML = itemCount;
        } else {
          document.getElementById("cartCount").style.opacity = 0;
          document.getElementById("cartCount").innerHTML = null;
        }
      } catch (error) {
        setitemCount(0);
        document.getElementById("cartCount").style.opacity = 0;
        document.getElementById("cartCount").innerHTML = null;
      }
    }
  });

  const handleScroll = () => {
    if (didMount) {
      if (window.scrollY >= (window.innerWidth / 100) * 9.5) {
        setscroll(true);
      } else {
        setscroll(false);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  //rendering current categories
  const renderCat = (catList) => {
    let myCategories = [];
    for (let CAT of catList) {
      myCategories.push(
        <li key={CAT._id} style={{ margin: "8px 0px" }}>
          <Link
            to={`/products#${CAT.slug}-section`}
            onClick={
              dropNav
                ? () => {
                    setdropNav(false);
                  }
                : null
            }
          >
            {CAT.parentId == undefined || CAT.parentId == null ? (
              <GiCakeSlice />
            ) : (
              <i
                className="fab fa-slack-hash"
                style={{ fontSize: "10px", marginRight: "5px" }}
              ></i>
            )}{" "}
            {CAT.name}
          </Link>
          {CAT.children.length > 0 ? (
            <ul style={{ paddingLeft: "15px" }}>{renderCat(CAT.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  const dropMenuHandler = () => {
    if (dropMenuActive) {
      setdropMenuActive(false);
    } else {
      setdropMenuActive(true);
    }
  };

  const userMenuHandler = () => {
    if (userMenuActive) {
      setuserMenuActive(false);
    } else {
      setuserMenuActive(true);
    }
  };

  const dropNavHandler = () => {
    if (dropNav) {
      setdropNav(false);
    } else {
      setdropNav(true);
    }
  };

  const handleDropNavLogin = () => {
    setdropNav(false);
    setloginOpen(true);
  };

  const handleDropUserMenu = () => {
    if (dropUserMenu) {
      setdropUserMenu(false);
    } else {
      setdropUserMenu(true);
    }
  };

  const handleNavCat = () => {
    if (dropNavCat) {
      setdropNavCat(false);
    } else {
      setdropNavCat(true);
    }
  };

  const userSignOut = (e) => {
    e.preventDefault();
    dispatch(signout());
    if (dropNav) {
      setdropNav(false);
    }
  };

  //rendering header
  return (
    <>
      {/* header */}
      <div className="header">
        {/* mainbar */}
        <div
          className={
            props.minimalHeader
              ? "mainbar active"
              : scroll
              ? "mainbar active"
              : "mainbar"
          }
        >
          {/* logo */}
          <Link to="/" className="dummyLogo">
            <GiCakeSlice />
            <em> Bakery</em>
          </Link>

          {/* right menu */}
          <div className="rightMenu">
            <i
              id="searchIcon"
              className="fas fa-search"
              onClick={() => setsearchOpen(true)}
            ></i>
            <Link to="/cart" id="cartIcon">
              <i className="fas fa-shopping-cart"></i>
              <span id="cartCount"></span>
            </Link>
            {loggedIn ? (
              <span className="profileBtn" onClick={userMenuHandler}>
                <i className="far fa-user-circle"></i>
                <span>{auth.user.firstName}</span>
                <div
                  className={
                    userMenuActive
                      ? "userMenuContainerActive"
                      : "userMenuContainer"
                  }
                >
                  <div
                    className={userMenuActive ? "userMenuActive" : "userMenu"}
                  >
                    <ul className="userMenuList">
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/profile#order-history">Orders</Link>
                      </li>
                      <li>
                        <button className="logout" onClick={userSignOut}>
                          LOG OUT
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </span>
            ) : (
              <i
                id="userIcon"
                className="fas fa-user"
                onClick={() => setloginOpen(true)}
              ></i>
            )}

            <i
              className="fas fa-bars bars"
              id="bars"
              onClick={dropNavHandler}
            ></i>
          </div>
        </div>

        {/* navbar */}
        <nav
          className={
            props.minimalHeader
              ? "navbar active"
              : scroll
              ? "navbar active"
              : "navbar"
          }
          id="dropDown"
        >
          <ul
            className={
              props.minimalHeader
                ? "navlist active"
                : scroll
                ? "navlist active"
                : "navlist"
            }
          >
            <li className="navElement">
              <Link to="/" className="navigate">
                Home
              </Link>
            </li>
            <li>
              <div
                id="dropBtn"
                className="navigate"
                onMouseEnter={() => setdropMenuActive(true)}
                onMouseLeave={() => setdropMenuActive(false)}
                onClick={dropMenuHandler}
                style={
                  window.location.href === `${rootDir}/products`
                    ? { color: "rgb(240, 84, 84)" }
                    : null
                }
              >
                <Link to="/products" className="navigate">
                  Cakes{" "}
                  <i
                    className={
                      dropMenuActive
                        ? "fas fa-chevron-up"
                        : "fas fa-chevron-down"
                    }
                    style={{ fontSize: "14px" }}
                  ></i>
                </Link>
                <div
                  className={
                    dropMenuActive ? "dropContainerActive" : "dropContainer"
                  }
                >
                  <ul
                    className={
                      dropMenuActive ? "dropDownMenuActive" : "dropDownMenu"
                    }
                  >
                    <li style={{ margin: "8px 0px" }} key="custom-items">
                      <Link to="/customOrder">
                        <GiCakeSlice />
                        CUSTOM ORDER
                      </Link>
                    </li>
                    <li style={{ margin: "8px 0px" }} key="all-items-drop">
                      <Link to="/products">
                        <GiCakeSlice />
                        ALL CAKES
                      </Link>
                    </li>
                    {renderCat(category.Categories)}
                  </ul>
                </div>
              </div>
            </li>

            <li className="navElement">
              <Link
                to="/about"
                className="navigate"
                style={
                  window.location.href === `${rootDir}/about`
                    ? { color: "rgb(240, 84, 84)" }
                    : null
                }
              >
                About
              </Link>
            </li>
            <li className="navElement">
              <Link
                to="/contact"
                className="navigate"
                style={
                  window.location.href === `${rootDir}/contact`
                    ? { color: "rgb(240, 84, 84)" }
                    : null
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* mini-navbar */}
        <nav
          className={
            props.minimalHeader
              ? "mini-navbar active"
              : scroll
              ? "mini-navbar active"
              : "mini-navbar"
          }
        >
          <ul
            className={
              props.minimalHeader
                ? "mini-navlist active"
                : scroll
                ? "mini-navlist active"
                : "mini-navlist"
            }
          >
            <li className="mini-navElement">
              <Link to="/" className="mini-navigate">
                <FiHome />
              </Link>
            </li>

            <li className="mini-navElement">
              <Link
                to="/products"
                className="mini-navigate"
                style={
                  window.location.href === `${rootDir}/products`
                    ? { color: "rgb(240, 84, 84)" }
                    : null
                }
              >
                <GiCakeSlice />
              </Link>
            </li>

            <li className="mini-navElement">
              <Link
                to="/about"
                className="mini-navigate"
                style={
                  window.location.href === `${rootDir}/about`
                    ? { color: "rgb(240, 84, 84)" }
                    : null
                }
              >
                <FiInfo />
              </Link>
            </li>

            <li className="mini-navElement">
              <Link
                to="/contact"
                className="mini-navigate"
                style={
                  window.location.href === `${rootDir}/contact`
                    ? { color: "rgb(240, 84, 84)" }
                    : null
                }
              >
                <FiPhoneCall />
              </Link>
            </li>
          </ul>
        </nav>

        {/* contact plate */}
        <ul
          className={
            props.minimalHeader
              ? "contactPlate active"
              : scroll
              ? "contactPlate active"
              : "contactPlate"
          }
        >
          <li>
            <Link to="/" className="contactIcon">
              <i className="fab fa-facebook-square"></i>
            </Link>
          </li>
          <li>
            <Link to="/" className="contactIcon">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
          <li>
            <Link to="/" className="contactIcon">
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          <li>
            <Link to="/" className="contactIcon">
              <i className="fab fa-youtube"></i>
            </Link>
          </li>
          <li>
            <Link to="/" className="contactIcon">
              <i className="fas fa-phone-square-alt"></i>
            </Link>
          </li>
        </ul>
      </div>

      {/* mobile nav menu */}
      <div className={dropNav ? "dropNavContainerActive" : "dropNavContainer"}>
        <div
          className={dropNav ? "dropNavWrapperActive" : "dropNavWrapper"}
          onClick={dropNavHandler}
        ></div>
        <div className={dropNav ? "dropNavActive" : "dropNav"}>
          <div className="dropNavHead">
            <div>
              <i
                className="fas fa-chevron-right"
                id="dropNavCloseBtn"
                onClick={dropNavHandler}
              ></i>
            </div>

            {loggedIn ? (
              <div className="dropNavU">
                <i
                  className={
                    dropUserMenu ? "fas fa-chevron-up" : "far fa-user-circle"
                  }
                  id="dropUserLogged"
                  onClick={handleDropUserMenu}
                >
                  <span> {auth.user.firstName}</span>
                </i>
                <ul
                  className={
                    dropUserMenu ? "dropUserMenuActive" : "dropUserMenu"
                  }
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/profile#order-history">Orders</Link>
                  </li>
                  <li>
                    <button className="dropLogout" onClick={userSignOut}>
                      LOG OUT
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <i
                id="dropUserIcon"
                className="fas fa-user dropNavU"
                onClick={handleDropNavLogin}
              >
                <span> Login/Sign up</span>
              </i>
            )}
          </div>

          <div className="dropNavMain">
            <ul className="dropNavList">
              <li>
                <Link to="/">
                  <FiHome /> Home
                </Link>
              </li>
              <li>
                <div onClick={handleNavCat} id="dropCatBtn">
                  <GiCakeSlice /> Cakes{" "}
                  <i
                    className={
                      dropNavCat ? "fas fa-chevron-up" : "fas fa-chevron-down"
                    }
                    style={{ fontSize: "10px" }}
                  ></i>
                </div>
                <div className={dropNavCat ? "dropNavCatActive" : "dropNavCat"}>
                  <ul>
                    <li style={{ margin: "8px 0px" }} key="custom-items-drop">
                      <Link to="/customOrder" onClick={dropNavHandler}>
                        <GiCakeSlice />
                        CUSTOM ORDER
                      </Link>
                    </li>
                    <li style={{ margin: "8px 0px" }} key="all-items">
                      <Link to="/products" onClick={dropNavHandler}>
                        <GiCakeSlice />
                        ALL CAKES
                      </Link>
                    </li>
                    {renderCat(category.Categories)}
                  </ul>
                </div>
              </li>
              <li>
                <Link to="/about">
                  <FiInfo /> About
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <FiPhoneCall /> Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* search tab */}
      <div className={searchOpen ? "searchActive" : "searchInactive"}>
        <input
          type="text"
          id="S-Input"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        />
        <i
          id="S-Cancel"
          className="fas fa-times"
          onClick={() => {
            setsearchOpen(false);
            setsearchInput("");
          }}
        ></i>
        <div
          className={searchRes.length > 0 ? "searchResults" : "noSearchResults"}
        >
          {searchRes.length > 0
            ? searchRes.map((item, index) => (
                <Link
                  key={index}
                  className="itemBox"
                  to={`/productInfo#${item.slug}`}
                >
                  <div className="s-imgBox">
                    <img
                      src={`${productImageDir}/${item.productPictures[0].img}`}
                      alt="product-image"
                    />
                  </div>
                  <p>{item.name}</p>
                </Link>
              ))
            : null}
        </div>
      </div>

      {/* modals */}
      <LoginModal
        open={loginOpen}
        loginClose={() => setloginOpen(false)}
        passRecover={() => setpassRecOpen(true)}
        signUp={() => setsignOpen(true)}
      ></LoginModal>

      <SignUpModal
        open={signOpen}
        signClose={() => setsignOpen(false)}
        login={() => setloginOpen(true)}
      ></SignUpModal>

      <PassRecoveryModal
        open={passRecOpen}
        passRecClose={() => setpassRecOpen(false)}
        signUp={() => setsignOpen(true)}
        login={() => setloginOpen(true)}
      ></PassRecoveryModal>
    </>
  );
};

export default Header;
