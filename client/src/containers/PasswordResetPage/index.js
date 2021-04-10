import "./style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { resetPassword } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const [stepOne, setstepOne] = useState(false);
  const [newPassword, setnewPassword] = useState("");

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    window.scroll(0, 0);
    setstepOne(false);
  }, []);

  const passData = {
    token: window.location.hash.slice(1),
    newPassword,
  };

  function handleChange() {
    if (
      document.getElementById("c-confirmPsw").value !== "" &&
      document.getElementById("c-psw").value !== ""
    ) {
      if (
        document.getElementById("c-psw").value ===
        document.getElementById("c-confirmPsw").value
      ) {
        document.getElementById("c-message").style.color = "rgb(0, 88, 122)";
        document.getElementById("c-message").innerHTML = "matching";
        document.getElementById("c-message").style.backgroundColor = "white";
        document.getElementById("c-passBtn").disabled = false;
        document.getElementById("c-passBtn").style.cursor = "default";
      } else {
        document.getElementById("c-message").style.color = "rgb(240, 84, 84)";
        document.getElementById("c-message").innerHTML = "not matching!";
        document.getElementById("c-message").style.backgroundColor = "white";
        document.getElementById("c-passBtn").disabled = true;
        document.getElementById("c-passBtn").style.cursor = "not-allowed";
      }
    } else {
      document.getElementById("c-message").innerHTML = "";
      document.getElementById("c-message").style.backgroundColor =
        "transparent";
      document.getElementById("c-passBtn").disabled = false;
      document.getElementById("c-passBtn").style.cursor = "default";
    }
  }

  const handlePassReset = (e) => {
    e.preventDefault();
    dispatch(resetPassword(passData));
    setstepOne(true);
  };

  return (
    <Layout small>
      <div className="passResetPage">
        {stepOne ? (
          <div className="passResetResponse">
            <h3
              style={
                auth.result
                  ? { color: "rgb(0, 136, 145)" }
                  : { color: "rgb(240, 84, 84)" }
              }
            >
              {auth.tempRes}
            </h3>
            <section className="profileEditBtns">
              {auth.result == false ? (
                <button
                  onClick={() => setstepOne(false)}
                  className="saveProfile"
                  id="c-passBtn"
                >
                  Try again
                </button>
              ) : null}
              <Link to="/">
                <button className="cancelProfile">Okay</button>
              </Link>
            </section>
          </div>
        ) : (
          <form className="passResetForm" onSubmit={handlePassReset}>
            <label htmlFor="newPass">
              <b>New password</b>
            </label>
            <input
              type="password"
              id="c-psw"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
              onChange={() => {
                setnewPassword(document.getElementById("c-psw").value);
                handleChange();
              }}
            />

            <label htmlFor="newPass">
              <b>Confirm new password</b>
            </label>
            <input
              type="password"
              id="c-confirmPsw"
              required
              onChange={handleChange}
            />

            <span id="c-message"></span>

            <section className="profileEditBtns">
              <button type="submit" className="saveProfile" id="c-passBtn">
                Save
              </button>
              <Link to="/">
                <button className="cancelProfile">Cancel</button>
              </Link>
            </section>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default PasswordReset;
