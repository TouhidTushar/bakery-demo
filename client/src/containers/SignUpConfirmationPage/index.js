import "./style.css";
import { useEffect, useState } from "react";
import { emailResend } from "../../actions";
import Layout from "../../components/Layout";
import { checkConfirm } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const SignUpConfirmation = () => {
  const dispatch = useDispatch();
  const [tempUser, settempUser] = useState({});
  const [didMount, setdidMount] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setdidMount(true);
    return () => setdidMount(false);
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    var localData = JSON.parse(localStorage.getItem("tempUser"));
    settempUser(localData);
  }, []);

  useEffect(() => {
    if (didMount) {
      dispatch(checkConfirm(tempUser)).then(() => {
        var localData = JSON.parse(localStorage.getItem("tempUser"));
        settempUser(localData);
      });
    }
  }, [didMount]);

  const resendEmail = () => {
    dispatch(emailResend(tempUser));
  };

  return (
    <>
      <Layout small>
        <div className="signUpConfirmPage">
          {auth.authenticate ? (
            <div className="loggedUserMsg">
              <h1>
                Welcome! {auth.user.firstName} {auth.user.lastName}
              </h1>
              <h3>Navigate through the website to find what you need.</h3>
            </div>
          ) : (
            <div className="signUpMsgWrapper">
              {tempUser !== null && tempUser !== undefined ? (
                tempUser.confirmed ? (
                  <>
                    <h1>"Congratulations! Your email was confirmed"</h1>
                    <p>
                      You can now login to your account and avail lots of
                      exciting offers, enjoy!
                    </p>
                  </>
                ) : (
                  <>
                    <h1>"Your account was created successfully"</h1>
                    <p>
                      An email with the confirmation link was sent to{" "}
                      <span className="tUserMail">{tempUser.email}</span>
                    </p>
                    <p>Click the link to confirm your account.</p>
                    <p>Didn't recieve any email?</p>
                    <p>
                      Click here to{" "}
                      <button id="resendMailBtn" onClick={resendEmail}>
                        Resend email
                      </button>
                    </p>
                  </>
                )
              ) : null}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SignUpConfirmation;
