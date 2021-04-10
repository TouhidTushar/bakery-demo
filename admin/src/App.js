import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { isUserLoggedIn, getInitialData } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Inventory from "./containers/Inventory";
import Customer from "./containers/Customer";
import Orders from "./containers/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/HOC/PrivateRoute.js";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/inventory" component={Inventory} />
        <PrivateRoute path="/customer" component={Customer} />
        <PrivateRoute path="/orders" component={Orders} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/SignIn" exact component={SignIn} />
      </Switch>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
