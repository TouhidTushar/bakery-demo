import "./style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../../actions";

const LoginModal = ({ open, loginClose, signUp, passRecover }) => {
  //value assignment
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [eyeToggle, seteyeToggle] = useState(false);

  const user = { email, password };

  const passToggle = () => {
    var x = document.getElementById("psw");
    if (x.type === "password") {
      x.type = "text";
      seteyeToggle(true);
    } else {
      x.type = "password";
      seteyeToggle(false);
    }
  };

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(login(user));
    loginClose();
    document.body.style.overflow = "unset";
  };

  if (!open) {
    return null;
  } else {
    document.body.style.overflow = "hidden";
    return (
      <>
        <div className="loginOverlay">
          <div
            className="loginWrapper"
            onClick={() => {
              loginClose();
              document.body.style.overflow = "unset";
            }}
          ></div>
          <div className="login">
            <i
              className="fas fa-times"
              id="cross"
              onClick={function () {
                loginClose();
                document.body.style.overflow = "unset";
              }}
            ></i>

            <form className="loginForm" onSubmit={userLogin}>
              <h1>LOG IN</h1>

              <p>
                <em>Exciting offers are waiting!</em>
              </p>

              <div className="emailBox">
                <input
                  id="email"
                  className="loginInput"
                  type="email"
                  placeholder=" "
                  required
                  maxLength="99"
                  onChange={(e) => setemail(e.target.value)}
                />
                <label className="label">Email</label>
              </div>

              <div className="passBox">
                <input
                  className="loginInput"
                  type="password"
                  id="psw"
                  placeholder=" "
                  required
                  minLength="8"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <label className="label">Password</label>
                <i
                  className={eyeToggle ? "fas fa-eye-slash" : "fas fa-eye"}
                  id="icons"
                  onClick={passToggle}
                ></i>
              </div>

              <button id="loginBtn" type="submit">
                Login
              </button>
            </form>
            <pre id="change">
              <p id="recovery">
                Forgot your password?{" "}
                <span
                  id="signBtn"
                  onClick={function () {
                    loginClose();
                    passRecover();
                  }}
                >
                  {" "}
                  Click here{" "}
                </span>
              </p>
              <p>
                Don't have an account?
                <span
                  id="signBtn"
                  onClick={function () {
                    loginClose();
                    signUp();
                  }}
                >
                  {" "}
                  Sign Up{" "}
                </span>
                instead.
              </p>
            </pre>
          </div>
        </div>
      </>
    );
  }
};

export default LoginModal;
