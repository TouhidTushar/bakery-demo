import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRecoveryCode } from "../../../../actions";

const LoginModal = ({ open, passRecClose, signUp, login }) => {
  //value assignment
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [stepOne, setstepOne] = useState(false);

  const auth = useSelector((state) => state.auth);

  const sendRecCode = (e) => {
    e.preventDefault();
    dispatch(sendRecoveryCode(email));
    setstepOne(true);
  };

  if (!open) {
    return null;
  } else {
    document.body.style.overflow = "hidden";
    return (
      <>
        <div className="passRecOverlay">
          <div
            className="passRecWrapper"
            onClick={() => {
              passRecClose();
              document.body.style.overflow = "unset";
            }}
          ></div>
          <div className="passRec">
            <i
              className="fas fa-times"
              id="cross"
              onClick={function () {
                passRecClose();
                setstepOne(false);
                document.body.style.overflow = "unset";
              }}
            ></i>

            {stepOne ? (
              <div className="recResponse">
                <p>{auth.tempRes}</p>
                <section className="recBtns">
                  <button onClick={() => setstepOne(false)}>Back</button>
                  <button
                    onClick={() => {
                      passRecClose();
                      setstepOne(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    Okay
                  </button>
                </section>
              </div>
            ) : (
              <form className="passRecForm" onSubmit={sendRecCode}>
                <h1>Account Recovery</h1>

                <p>
                  <em>enter the email associated with your account</em>
                </p>

                <div className="emailBox">
                  <input
                    id="email"
                    className="loginInput"
                    type="email"
                    placeholder=" "
                    required
                    maxLength="99"
                    autoComplete="off"
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <label className="label">Email</label>
                </div>

                <button id="sendCodeBtn" type="submit">
                  Recover
                </button>
              </form>
            )}

            <pre id="change">
              <p id="recovery">
                Remeber your password?{" "}
                <span
                  id="signBtn"
                  onClick={function () {
                    passRecClose();
                    setstepOne(false);
                    login();
                  }}
                >
                  {" "}
                  Log In{" "}
                </span>
                instead.
              </p>
              <p>
                Don't have an account?
                <span
                  id="signBtn"
                  onClick={function () {
                    passRecClose();
                    setstepOne(false);
                    signUp();
                  }}
                >
                  {" "}
                  Sign Up{" "}
                </span>
                here.
              </p>
            </pre>
          </div>
        </div>
      </>
    );
  }
};

export default LoginModal;
