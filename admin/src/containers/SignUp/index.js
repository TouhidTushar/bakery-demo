import Layout from "../../components/Layout";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import "./style.css";
import { signup } from "../../actions";

//password
function handleChange() {
  if (document.getElementById("confirmPsw").value !== "") {
    if (
      document.getElementById("psw").value ===
      document.getElementById("confirmPsw").value
    ) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = "matching!";
      document.getElementById("signUpBtn").disabled = false;
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML = "not matching!";
      document.getElementById("signUpBtn").disabled = true;
    }
  } else {
    document.getElementById("message").innerHTML = "";
    document.getElementById("signUpBtn").disabled = false;
  }
}

const SignUp = () => {
  //value assignment
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const user = { firstName, lastName, email, password };

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userSignup = (e) => {
    e.preventDefault();
    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <Layout />
      <section className="signUpFormSection">
        <form className="signUpForm" onSubmit={userSignup}>
          <label id="nameLabel">First Name</label>
          <label id="nameLabel">Last Name</label>

          <input
            type="text"
            id="firstName"
            minLength="3"
            maxLength="20"
            required
            onChange={(e) => setfirstName(e.target.value)}
          />

          <input
            type="text"
            id="lastName"
            minLength="3"
            maxLength="20"
            required
            onChange={(e) => setlastName(e.target.value)}
          />

          <label>Email address</label>
          <input
            type="email"
            maxLength="99"
            required
            onChange={(e) => setemail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            id="psw"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
            onChange={function () {
              setpassword(document.getElementById("psw").value);
              handleChange();
            }}
          />

          <label>Confirm Password</label>
          <span id="message"></span>
          <input
            type="password"
            id="confirmPsw"
            required
            onChange={handleChange}
          />

          <button type="submit" id="signUpBtn">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
