import Layout from "../../components/Layout";
import { useState } from "react";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./style.css";

const SignIn = (props) => {
  //value assignment
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const user = { email, password };

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  return (
    <div>
      <Layout>
        <section className="signInFormSection">
          <form className="signInForm" onSubmit={userLogin}>
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
              minLength="8"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            <button id="signInBtn" type="submit">
              Submit
            </button>
          </form>
        </section>
      </Layout>
    </div>
  );
};

export default SignIn;
