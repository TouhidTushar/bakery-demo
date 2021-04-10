import "./style.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  placeCustomOrder,
  placeUserCustomOrder,
} from "../../actions";

const CustomOrder = () => {
  const dispatch = useDispatch();
  const [addr, setaddr] = useState("");
  const [phone, setphone] = useState("");
  const [coupon, setcoupon] = useState(0);
  const [addNote, setaddNote] = useState("");
  const [discount, setdiscount] = useState(0);
  const [fullName, setfullName] = useState("");
  const [payStyle, setpayStyle] = useState("");
  const [userFiles, setuserFiles] = useState([]);

  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  const handlePicture = (e) => {
    setuserFiles([...userFiles, e.target.files[0]]);
  };

  const prepareData = () => {
    const formData = new FormData();
    formData.append("orderType", "custom");
    formData.append("fullName", fullName);
    formData.append("contact", phone);
    formData.append("address", addr);
    formData.append("note", addNote);
    formData.append("paymentType", payStyle);
    for (let file of userFiles) {
      formData.append("userFile", file);
    }
    return formData;
  };

  useEffect(() => {
    if (auth.authenticate) {
      setfullName(auth.user.firstName + " " + auth.user.lastName);
      if (order.savedInfo !== {} && order.savedInfo !== undefined) {
        setphone(`${order.savedInfo.contact}`);
        setaddr(order.savedInfo.address);
      }
    } else {
      setfullName("");
      setphone("");
      setaddr("");
    }
  }, [auth, order.savedInfo]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderData = prepareData();
    if (auth.authenticate) {
      dispatch(placeUserCustomOrder(orderData)).then(() => {
        dispatch(getOrders());
      });
    } else {
      dispatch(placeCustomOrder(orderData));
    }
  };

  return (
    <>
      <Layout small>
        <div className="customOrderPage">
          <form className="customOrderForm" onSubmit={handlePlaceOrder}>
            <h2>DESIGN YOUR CAKE</h2>
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              minLength="3"
              maxLength="25"
              value={fullName}
              required
              onChange={(e) => setfullName(e.target.value)}
            />
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              pattern="^(?:\+?88|0088)?01[15-9]\d{8}$"
              title="Must be a valid phone number"
              value={phone}
              required
              onChange={(e) => setphone(e.target.value)}
            />
            <label htmlFor="address">Address:</label>
            <textarea
              maxLength="150"
              required
              value={addr}
              onChange={(e) => setaddr(e.target.value)}
            />
            <label htmlFor="notes">Notes:</label>
            <textarea
              maxLength="300"
              placeholder="Describe your cake. (e.g. flavour, weight)"
              onChange={(e) => setaddNote(e.target.value)}
            />

            <div className="paymentInfo">
              <p id="radioLabel">Choose Payment Style:</p>
              <input
                id="COD"
                type="radio"
                name="payStyle"
                value="COD"
                required
                onChange={(e) => setpayStyle(e.target.value)}
              />
              <label htmlFor="COD"> Cash on Delivery</label>
              <input
                id="PRE"
                type="radio"
                name="payStyle"
                value="PRE"
                onChange={(e) => setpayStyle(e.target.value)}
              />
              <label htmlFor="PRE"> Pay Now</label>
            </div>

            <label id="userFileLabel" htmlFor="file">
              Upload images for reference:
            </label>
            <input
              type="file"
              id="userImg"
              name="userFile"
              onChange={handlePicture}
            ></input>

            {userFiles.length > 0
              ? userFiles.map((pic, index) => (
                  <p style={{ fontSize: "12px" }} key={index}>
                    {pic.name}
                  </p>
                ))
              : null}

            <button type="submit">Place Order</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CustomOrder;
