import "./style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../../actions";

//password
function handleChange() {
  if (
    document.getElementById("confirmPsw").value !== "" &&
    document.getElementById("psw").value !== ""
  ) {
    if (
      document.getElementById("psw").value ===
      document.getElementById("confirmPsw").value
    ) {
      document.getElementById("message").style.color = "white";
      document.getElementById("message").style.backgroundColor =
        "rgba(0, 136, 145, 0.5)";
      document.getElementById("message").innerHTML = "matching!";
      document.getElementById("signUpBtn").disabled = false;
      document.getElementById("signUpBtn").style.cursor = "default";
    } else {
      document.getElementById("message").style.color = "black";
      document.getElementById("message").style.backgroundColor =
        "rgba(0, 136, 145, 0.5)";
      document.getElementById("message").innerHTML = "not matching!";
      document.getElementById("signUpBtn").disabled = true;
      document.getElementById("signUpBtn").style.cursor = "not-allowed";
    }
  } else {
    document.getElementById("message").innerHTML = "";
    document.getElementById("message").style.backgroundColor = "transparent";
    document.getElementById("signUpBtn").disabled = false;
    document.getElementById("signUpBtn").style.cursor = "default";
  }
}

//modal
const SignUpModal = ({ open, signClose, login }) => {
  //value assignment
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [lastName, setlastName] = useState("");
  const [firstName, setfirstName] = useState("");

  const user = { firstName, lastName, email, password };

  const userSignup = (e) => {
    e.preventDefault();
    dispatch(signup(user));
    signClose();
    document.body.style.overflow = "unset";
  };

  if (!open) {
    return null;
  } else {
    document.body.style.overflow = "hidden";
    return (
      <>
        <div className="signUpOverlay">
          <div
            className="signUpWrapper"
            onClick={() => {
              signClose();
              document.body.style.overflow = "unset";
            }}
          ></div>
          <div className="signUp">
            <i
              className="fas fa-times"
              id="cross"
              onClick={function () {
                signClose();
                document.body.style.overflow = "unset";
              }}
            ></i>

            {/* signup form */}
            <form className="signUpForm" onSubmit={userSignup}>
              <h1>SIGN UP</h1>

              <p>
                <em>Don't miss out on the discounts!</em>
              </p>
              <div className="nameBox">
                <div className="firstName">
                  <input
                    id="firstName"
                    className="signUpInput"
                    type="text"
                    placeholder=" "
                    required
                    minLength="3"
                    maxLength="20"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                  <label className="label">First Name</label>
                </div>
                <div className="lastName">
                  <input
                    id="lastName"
                    className="signUpInput"
                    type="text"
                    placeholder=" "
                    required
                    minLength="3"
                    maxLength="20"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                  <label className="label">Last Name</label>
                </div>
              </div>

              <div className="emailBox">
                <input
                  id="email"
                  className="signUpInput"
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
                  className="signUpInput"
                  type="password"
                  id="psw"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  placeholder=" "
                  required
                  onChange={() => {
                    setpassword(document.getElementById("psw").value);
                    handleChange();
                  }}
                />
                <label className="label">Password</label>
              </div>

              <div className="passBox">
                <input
                  className="signUpInput"
                  type="password"
                  id="confirmPsw"
                  placeholder=" "
                  required
                  onChange={handleChange}
                />
                <label className="label">Confirm Password</label>
                <span id="message"></span>
              </div>

              <button id="signUpBtn" type="submit">
                Submit
              </button>
            </form>

            {/* change to login */}
            <pre id="change">
              <p>
                Already have an account?
                <span
                  id="logBtn"
                  onClick={function () {
                    login();
                    signClose();
                  }}
                >
                  {" "}
                  Log In{" "}
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

export default SignUpModal;
