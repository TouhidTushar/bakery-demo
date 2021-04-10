import Header from "../../components/Header";
import "./style.css";
import { Link } from "react-router-dom";
import { rootDir } from "../../urlConfig";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <div className="mainSection">
          <div className="sideBar">
            <Link
              id="dashLink"
              className={
                window.location.href === `${rootDir}/`
                  ? "linkActive"
                  : "linkInactive"
              }
              to="/"
            >
              <i className="fas fa-tachometer-alt"></i>DashBoard
            </Link>

            <ul className="adminLinks">
              <li className="linkItems">
                <Link
                  className={
                    window.location.href === `${rootDir}/orders`
                      ? "linkActive"
                      : "linkInactive"
                  }
                  to="/orders"
                >
                  <i className="fas fa-shopping-basket"></i>
                  Orders
                </Link>
              </li>
              <li className="linkItems">
                <Link
                  className={
                    window.location.href === `${rootDir}/inventory`
                      ? "linkActive"
                      : "linkInactive"
                  }
                  to="/inventory"
                >
                  <i className="fas fa-boxes"></i>
                  Inventory
                </Link>
              </li>
              <li className="linkItems">
                <Link
                  className={
                    window.location.href === `${rootDir}/customer`
                      ? "linkActive"
                      : "linkInactive"
                  }
                  to="/customer"
                >
                  <i className="fas fa-user-friends"></i>
                  Customer
                </Link>
              </li>
            </ul>
          </div>
          <div className="container">{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
