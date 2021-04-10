import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  placeOrder,
  placeUserOrder,
  saveDeliveryInfo,
  getOrders,
  clearCart,
} from "../../actions";

const Order = () => {
  const dispatch = useDispatch();
  const [addr, setaddr] = useState("");
  const [phone, setphone] = useState("");
  const [coupon, setcoupon] = useState(0);
  const [addNote, setaddNote] = useState("");
  const [discount, setdiscount] = useState(0);
  const [fullName, setfullName] = useState("");
  const [payStyle, setpayStyle] = useState("");
  const [saveInfo, setsaveInfo] = useState("");
  const [cartData, setcartData] = useState(cart);
  const [didMount, setdidMount] = useState(false);

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    setdidMount(true);
    return () => setdidMount(false);
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (didMount) {
      if (auth.authenticate) {
        setcartData(cart);
        setfullName(auth.user.firstName + " " + auth.user.lastName);
        if (order.savedInfo !== {} && order.savedInfo !== undefined) {
          var contact = `${order.savedInfo.contact}`;
          if (contact == undefined) {
            setphone("");
          } else {
            setphone(contact);
          }
          setaddr(order.savedInfo.address);
        } else {
          setfullName("");
          setphone("");
          setaddr("");
        }
      } else {
        setfullName("");
        setphone("");
        setaddr("");
        try {
          var localData = localStorage.getItem("Cart");
          var localCart = JSON.parse(localData);
          setcartData(localCart);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [didMount, auth, cart]);

  const prepareSubTotal = () => {
    if (cartData == null || cartData == undefined) {
      return null;
    } else {
      let subTotal = 0;
      for (let item of cartData.cartItems) {
        var cost = item.product.price * item.quantity;
        subTotal += cost;
      }
      return subTotal;
    }
  };

  const orderData = {
    items: cart.cartItems,
    fullName: fullName,
    contact: phone,
    address: addr,
    note: addNote,
    totalAmount: prepareSubTotal() + 60 + discount + coupon,
    paymentType: payStyle,
  };

  const info = {
    contact: phone,
    address: addr,
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (auth.authenticate) {
      dispatch(placeUserOrder(orderData)).then(() => {
        dispatch(getOrders());
        dispatch(clearCart());
      });
      if (saveInfo === "YES") {
        dispatch(saveDeliveryInfo(info));
      }
    } else {
      dispatch(placeOrder(orderData)).then(() => {
        dispatch(clearCart());
      });
    }
  };

  const renderOrderDetails = () => {
    const CART = cartData.cartItems;
    if (CART.length > 0) {
      return (
        <>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th id="optionalField">Weight</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {CART.map((item, index) => (
                <tr key={item.product._id} id="tRows">
                  <td id="indCell">{index + 1}. </td>
                  <td id="productNameCell">
                    {" "}
                    {item.product.name}{" "}
                    <span id="cellItemWM">({item.product.weight})</span>
                  </td>
                  <td id="optionalField">{item.product.weight}</td>
                  <td>{item.quantity} </td>
                  <td>
                    {item.quantity}
                    {"×"}
                    {item.product.price}={item.quantity * item.product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else {
      return <p>Wrong</p>;
    }
  };

  return (
    <div className="orderPageBG">
      <Layout small>
        <div className="orderPage">
          <div className="orderSummary">
            <p id="orderSum">Order Summary</p>
            {cartData !== null &&
            cartData !== undefined &&
            cartData.cartItems.length > 0 ? (
              <section className="orderDetails">
                {renderOrderDetails()}
                <p>
                  <span>Subtotal:</span>
                  <span id="O-value">{prepareSubTotal()}</span>
                </p>
                <p>
                  <span>Delivery cost:</span>
                  <span id="O-value">60</span>
                </p>
                <p>
                  <span>Discount:</span>
                  <span id="O-value">0</span>
                </p>
                <p>
                  <span>Coupon:</span>
                  <span id="O-value">0</span>
                </p>
                <p id="finalTotal"></p>
                <p>
                  <span>Total:</span>
                  <span id="O-value">
                    {prepareSubTotal() + 60 - discount - coupon}
                  </span>
                </p>
              </section>
            ) : (
              <p style={{ textAlign: "center" }}>Empty Cart !</p>
            )}
          </div>

          <div className="orderInfo">
            <form
              className="addressForm"
              id="orderForm"
              onSubmit={handlePlaceOrder}
            >
              <p id="oderInfoTitle">Delivery Information</p>
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
                placeholder="Special requirements? (e.g. write something on top)"
                onChange={(e) => setaddNote(e.target.value)}
              />
              <div className="paymentInfo">
                <p>Choose Payment Style:</p>
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
              {auth.authenticate ? (
                <div className="saveInfo">
                  <p>Would you like to save these information for future?</p>
                  <input
                    id="YES"
                    type="radio"
                    name="saveInfo"
                    value="YES"
                    onChange={(e) => setsaveInfo(e.target.value)}
                  />
                  <label htmlFor="YES"> Yes</label>
                  <input
                    id="NO"
                    type="radio"
                    name="saveInfo"
                    value="NO"
                    onChange={(e) => setsaveInfo(e.target.value)}
                  />
                  <label htmlFor="NO"> No</label>
                </div>
              ) : null}
              <div className="orderBtnDiv">
                <button
                  id="placeOrder"
                  form="orderForm"
                  disabled={
                    cartData == null || cartData == undefined
                      ? true
                      : cartData.cartItems.length > 0
                      ? false
                      : true
                  }
                  style={
                    cartData == null || cartData == undefined
                      ? { cursor: "not-allowed" }
                      : cartData.cartItems.length > 0
                      ? { cursor: "pointer" }
                      : { cursor: "not-allowed" }
                  }
                >
                  Place Order
                </button>
                <Link id="cancelOrder" to="/cart">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Order;
