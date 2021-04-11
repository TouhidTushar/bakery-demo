import "./style.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { rootDir, userFilesDir } from "../../urlConfig";
import { changePassword, editUser } from "../../actions";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [birthday, setbirthday] = useState("");
  const [lastName, setlastName] = useState("");
  const [orderData, setorderData] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [didMount, setdidMount] = useState(false);
  const [chngPass, setchngPass] = useState(false);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [editProfile, seteditProfile] = useState(false);
  const [contactNumber, setcontactNumber] = useState("");
  const [orderDetailsOpen, setorderDetailsOpen] = useState(0);

  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  const _user = auth.user;
  const birthDate = new Date(_user.birthday);

  const prepareDate = (value) => {
    if (
      _user.birthday == null ||
      _user.birthday === "" ||
      _user.birthday == undefined
    ) {
      return null;
    } else {
      var dd = value.getDate();
      var mm = value.getMonth() + 1;
      var yyyy = value.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      return `${dd}/${mm}/${yyyy}`;
    }
  };
  const myDate = prepareDate(birthDate);

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

  const userData = {
    firstName,
    lastName,
    email,
    contactNumber,
    gender,
    birthday,
  };

  const passData = {
    oldPassword,
    newPassword,
  };

  useEffect(() => {
    setdidMount(true);
    return () => setdidMount(false);
  }, []);

  useEffect(() => {
    if (auth.authenticate) {
      setfirstName(_user.firstName);
      setlastName(_user.lastName);
      setemail(_user.email);
      setcontactNumber(_user.contactNumber);
      setgender(_user.gender);
      setbirthday(_user.birthday);
      setorderData(order.orderDetails);
    } else {
      setfirstName("");
      setlastName("");
      setemail("");
      setcontactNumber("");
      setgender("");
      setbirthday("");
      setorderData([]);
    }
  }, [auth, editProfile, order, didMount]);

  useEffect(() => {
    if (didMount) {
      const myId = window.location.hash.slice(1);
      if (myId === "") {
        window.scroll(0, 0);
      } else {
        const elem = document.getElementById(myId);
        if (elem) {
          elem.scrollIntoView();
        }
      }
    }
  }, [window.location.hash.slice(1), didMount]);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editUser(userData));
    seteditProfile(false);
  };

  const handlePassChng = (e) => {
    e.preventDefault();
    dispatch(changePassword(passData));
    setchngPass(false);
  };

  const renderProfile = () => {
    return (
      <>
        <p>
          <b>Username: </b>
          {_user.username}
        </p>
        <p>
          <b>Email: </b>
          {_user.email}
        </p>
        <p>
          <b>Contact: </b>
          {_user.contactNumber}
        </p>
        <p>
          <b>Gender: </b>
          {_user.gender}
        </p>
        <p>
          <b>Birthday: </b>
          {myDate}
        </p>
      </>
    );
  };

  const renderProfileForm = () => {
    return (
      <>
        <form className="editProfileForm" onSubmit={handleEdit}>
          <p>
            <b className="indent">Username</b>
            <b>: </b>
            {_user.username} (can't be changed)
          </p>
          <div>
            <label htmlFor="firstName" className="indent">
              <b>Firstname</b>
            </label>
            <b>: </b>
            <input
              type="text"
              value={firstName}
              required
              minLength="3"
              maxLength="20"
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="laststName" className="indent">
              <b>Lastname</b>
            </label>
            <b>: </b>
            <input
              type="text"
              value={lastName}
              required
              minLength="3"
              maxLength="20"
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="laststName" className="indent">
              <b>Email</b>
              <b style={{ color: "rgb(240, 84, 84)" }}>*</b>
            </label>
            <b>: </b>
            <input
              type="email"
              value={email}
              required
              maxLength="99"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <p style={{ color: "rgb(240, 84, 84)" }}>
            *changing your email will require confirmation before next login
          </p>
          <div>
            <label htmlFor="contact" className="indent">
              <b>Contact</b>
            </label>
            <b>: </b>
            <input
              type="text"
              pattern="^(?:\+?88|0088)?01[15-9]\d{8}$"
              title="Must be a valid phone number"
              value={contactNumber == null ? "" : contactNumber}
              onChange={(e) => setcontactNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gender" className="indent">
              <b>Gender</b>
            </label>
            <b>: </b>
            <select
              defaultValue={gender}
              onChange={(e) => setgender(e.target.value)}
            >
              <option value="not-selected">Not selected</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {_user.birthday == null ? (
            <>
              <div>
                <label htmlFor="birthday" className="indent">
                  <b>Birthday</b>
                  <b style={{ color: "rgb(240, 84, 84)" }}>*</b>
                </label>
                <b>: </b>
                <input
                  type="date"
                  onChange={(e) => setbirthday(e.target.value)}
                />
              </div>
              <p style={{ color: "rgb(240, 84, 84)" }}>
                (*once set, can't be changed)
              </p>
            </>
          ) : (
            <p>
              <b className="indent">Birthday</b>
              <b>: </b>
              {myDate} (can't be changed)
            </p>
          )}
          <section className="profileEditBtns">
            <button type="submit" className="saveProfile">
              Save
            </button>
            <button
              onClick={() => seteditProfile(false)}
              className="cancelProfile"
            >
              Cancel
            </button>
          </section>
        </form>
      </>
    );
  };

  const renderPassForm = () => {
    return (
      <div className="passChngWrapper">
        <form className="passChngForm" onSubmit={handlePassChng}>
          <label htmlFor="oldPass">
            <b>Current password</b>
          </label>
          <input
            type="password"
            required
            onChange={(e) => setoldPassword(e.target.value)}
          />

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
            <button
              onClick={() => setchngPass(false)}
              className="cancelProfile"
            >
              Cancel
            </button>
          </section>
        </form>
      </div>
    );
  };

  const showDate = (_date) => {
    let date = new Date(_date);
    return date.toDateString();
  };

  const showProducts = (_items) => {
    return _items.length > 0
      ? _items.map((item, index) => (
          <p key={index} style={{ paddingLeft: "60px" }}>
            <b>{index + 1}. Name: </b>
            {item.product.name}, <b>Quantity: </b>
            {item.quantity}
          </p>
        ))
      : null;
  };

  if (auth.authenticate) {
    return (
      <>
        <Layout small>
          <div className="profilePage">
            <div className="profileSection">
              <p id="userName">
                {firstName} {lastName}
              </p>

              {editProfile ? null : (
                <button
                  className="editProfile"
                  onClick={() => seteditProfile(true)}
                >
                  <i className="fas fa-cog"></i> Edit Profile
                </button>
              )}

              <div className={editProfile ? "editRender" : "profileRender"}>
                {editProfile ? renderProfileForm() : renderProfile()}
              </div>

              {chngPass ? null : (
                <button
                  className="changePass"
                  onClick={() => setchngPass(true)}
                >
                  <i className="fas fa-key"></i> Change Password
                </button>
              )}
              {chngPass ? renderPassForm() : null}
            </div>

            <div id="order-history">
              <p className="MyOrders">My orders</p>
              {orderData !== undefined &&
              orderData !== null &&
              orderData.length > 0
                ? orderData.map((item, index) => (
                    <div key={item._id}>
                      <div
                        className="orderWrapper"
                        id={index % 2 == 0 ? "evenBox" : "oddBox"}
                      >
                        {index === 0 ? (
                          <span id="latestMarker">Latest</span>
                        ) : null}
                        <span>
                          <b>Order Serial: </b>
                          {item.orderSerial}
                        </span>
                        <span>
                          <b>Orderer on: </b>
                          {showDate(item.createdAt)}
                        </span>
                        {orderDetailsOpen === index + 1 ? (
                          <button onClick={() => setorderDetailsOpen(0)}>
                            close <i className="fas fa-times"></i>
                          </button>
                        ) : (
                          <button
                            onClick={() => setorderDetailsOpen(index + 1)}
                          >
                            details <i className="far fa-question-circle"></i>
                          </button>
                        )}
                      </div>
                      <div
                        className={
                          orderDetailsOpen === index + 1
                            ? "orderDetailsBoxActive"
                            : "orderDetailsBox"
                        }
                      >
                        {item.items.length > 0 ? (
                          <div>
                            <p>
                              <b>Item(s):</b>
                            </p>{" "}
                            <div>{showProducts(item.items)}</div>
                          </div>
                        ) : null}
                        <p>
                          <b>Name:</b> {item.fullName}
                        </p>
                        <p>
                          <b>Contact:</b> {item.contact}
                        </p>
                        <p>
                          <b>Address:</b> {item.address}
                        </p>
                        <p>
                          <b>Note:</b> {item.note}
                        </p>
                        <p>
                          <b>Total payable:</b>{" "}
                          {item.totalAmount === 0
                            ? "not calculated"
                            : item.totalAmount}
                        </p>
                        <p>
                          <b>Payment type:</b>{" "}
                          {item.paymentType === "COD"
                            ? "Cash on delivery"
                            : "Pre Payment"}
                        </p>
                        <p>
                          <b>Payment Status:</b> {item.paymentStatus}
                        </p>
                        {item.userFiles.length > 0 ? (
                          <p>
                            <b>Uploads:</b>
                            {item.userFiles.map((pic, index) => (
                              <a
                                href={`${userFilesDir}/${pic.img}`}
                                target="_blank"
                                key={pic._id}
                              >
                                {" "}
                                File-{index + 1}
                                {index < item.userFiles.length - 1 ? "," : null}
                              </a>
                            ))}
                          </p>
                        ) : null}
                        <div>
                          <p>
                            <b>Order Status:</b>{" "}
                          </p>
                          <span className="orderStatusBar">
                            <div
                              className={
                                item.orderStatus[0].isCompleted
                                  ? "progressBarActive"
                                  : "progressBar"
                              }
                            >
                              <div
                                className={
                                  item.orderStatus[0].isCompleted
                                    ? "progressIconActive"
                                    : "progressIcon"
                                }
                              >
                                <i className="fas fa-receipt"></i>
                              </div>
                              <p>Ordered</p>
                            </div>
                            <div
                              className={
                                item.orderStatus[1].isCompleted
                                  ? "progressBarActive"
                                  : "progressBar"
                              }
                            >
                              <div
                                className={
                                  item.orderStatus[1].isCompleted
                                    ? "progressIconActive"
                                    : "progressIcon"
                                }
                              >
                                <i className="fas fa-clipboard-check"></i>
                              </div>
                              <p>Confirmed</p>
                            </div>
                            <div
                              className={
                                item.orderStatus[2].isCompleted
                                  ? "progressBarActive"
                                  : "progressBar"
                              }
                            >
                              <div
                                className={
                                  item.orderStatus[2].isCompleted
                                    ? "progressIconActive"
                                    : "progressIcon"
                                }
                              >
                                <i className="fas fa-gift"></i>
                              </div>
                              <p>Packed</p>
                            </div>
                            <div
                              className={
                                item.orderStatus[3].isCompleted
                                  ? "progressBarActive"
                                  : "progressBar"
                              }
                            >
                              <div
                                className={
                                  item.orderStatus[3].isCompleted
                                    ? "progressIconActive"
                                    : "progressIcon"
                                }
                              >
                                <i className="fas fa-shipping-fast"></i>
                              </div>
                              <p>On the way</p>
                            </div>
                            <div
                              className={
                                item.orderStatus[4].isCompleted
                                  ? "progressBarActive"
                                  : "progressBar"
                              }
                            >
                              <div
                                className={
                                  item.orderStatus[4].isCompleted
                                    ? "progressIconActive"
                                    : "progressIcon"
                                }
                              >
                                <i className="fas fa-handshake"></i>
                              </div>
                              <p>Delivered</p>
                            </div>
                          </span>
                        </div>
                        <div id="progressIconDetails">
                          <p>
                            <i className="fas fa-receipt"></i> = Ordered
                          </p>
                          <p>
                            <i className="fas fa-clipboard-check"></i> =
                            Confirmed
                          </p>
                          <p>
                            <i className="fas fas fa-gift"></i> = Packed
                          </p>
                          <p>
                            <i className="fas fa-shipping-fast"></i> = On the
                            way
                          </p>
                          <p>
                            <i className="fas fa-handshake"></i> = Delivered
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <Layout small>
        <div className="profilePageAlt">
          <h1 className="nonLoggedProfile">You are not logged in!</h1>
        </div>
      </Layout>
    );
  }
};

export default ProfilePage;
