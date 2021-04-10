import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCat,
  getProd,
  isUserLoggedIn,
  getCartItems,
  getOrders,
  getDeliveryInfo,
} from "./actions";
import Homepage from "./containers/Homepage";
import ProductsPage from "./containers/ProductsPage";
import Aboutpage from "./containers/Aboutpage";
import ContactPage from "./containers/ContactPage";
import CartPage from "./containers/CartPage";
import OrderPage from "./containers/OrderPage";
import OrderConfirmPage from "./containers/OrderConfirmPage";
import PaymentPage from "./containers/PaymentGateway";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CustomOrderPage from "./containers/CustomOrderPage";
import ProfilePage from "./containers/ProfilePage";
import SignUpConfirmPage from "./containers/SignUpConfirmationPage";
import PasswordResetPage from "./containers/PasswordResetPage";

function App() {
  const dispatch = useDispatch();
  const [spinner, setspinner] = useState(false);
  const [cartResponse, setcartResponse] = useState(false);
  const [authResponse, setauthResponse] = useState(false);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    return () => {
      setspinner(true);
    };
  }, []);

  useEffect(() => {
    dispatch(getCat());
    dispatch(getProd());
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn()).then(() => {
        dispatch(getCartItems());
        dispatch(getOrders());
        dispatch(getDeliveryInfo());
      });
    }
  }, []);

  useEffect(() => {
    if (auth.loading || cart.updatingCart || order.loading) {
      if (!spinner) {
        setspinner(true);
      }
    } else if (
      auth.loading == false &&
      cart.updatingCart == false &&
      order.loading == false
    ) {
      setTimeout(() => {
        setspinner(false);
      }, 1000);
    }
  }, [auth, cart, order]);

  useEffect(() => {
    if (auth.serverRes !== "" && auth.serverRes !== undefined) {
      setauthResponse(true);
      setTimeout(() => {
        setauthResponse(false);
      }, 4000);
    } else {
      setauthResponse(false);
    }
  }, [auth]);

  useEffect(() => {
    if (cart.serverRes !== "" && cart.serverRes !== undefined) {
      setcartResponse(true);
      setTimeout(() => {
        setcartResponse(false);
      }, 4000);
    } else {
      setcartResponse(false);
    }
  }, [cart]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/about" component={Aboutpage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/order" component={OrderPage} />
        <Route path="/orderConfirmation" component={OrderConfirmPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/productInfo" component={ProductDetailsPage} />
        <Route path="/customOrder" component={CustomOrderPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/signUpConfirmation" component={SignUpConfirmPage} />
        <Route path="/accountRecovery" component={PasswordResetPage} />
        <Route path="/paymentGateway" component={PaymentPage} />
      </Switch>

      {/* loader */}
      <div className={spinner ? "loadingSpinner" : "noSppiner"}>
        <div className={spinner ? "lds-ring" : "lds-ring-hidden"}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* cart-response */}
      <div
        className={cartResponse && !spinner ? "showResponse" : "hideResponse"}
      >
        <div
          className="responseTxt"
          style={
            cart.result
              ? {
                  color: "rgb(0, 88, 122)",
                  border: "2px solid rgb(0, 88, 122)",
                }
              : {
                  color: "rgb(240, 84, 84)",
                  border: "2px solid rgb(240, 84, 84)",
                }
          }
        >
          <p>{cart.serverRes}</p>
        </div>
      </div>

      {/* auth-response */}
      <div
        className={
          authResponse && spinner == false ? "showResponse" : "hideResponse"
        }
      >
        <div
          className="responseTxt"
          style={
            auth.result
              ? {
                  color: "rgb(0, 88, 122)",
                  border: "2px solid rgb(0, 88, 122)",
                }
              : {
                  color: "rgb(240, 84, 84)",
                  border: "2px solid rgb(240, 84, 84)",
                }
          }
        >
          <p>{auth.serverRes}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
