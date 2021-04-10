import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Map_loc, userFilesDir } from "../../urlConfig";
import { orderConstants } from "../../actions/constants";
import { getOrderById } from "../../actions/order.action";

const Contact = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);
  const [orderID, setorderID] = useState("");
  const [orderData, setorderData] = useState([]);
  const [didMount, setdidMount] = useState(false);

  useEffect(() => {
    dispatch({ type: orderConstants.CLEARORDER });
    setdidMount(true);
    return () => setdidMount(false);
  }, []);

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
  });

  useEffect(() => {
    if (order.orderDetails == null || order.orderDetails == undefined) {
      setorderData([]);
    } else {
      if (order.orderDetails.length > 0) {
        setorderData(order.orderDetails);
      } else {
        setorderData([]);
      }
    }
  }, [order]);

  const traceOrder = (e) => {
    e.preventDefault();
    dispatch(getOrderById(orderID));
  };

  const formatDate = (_date) => {
    let date = new Date(_date);
    return date.toUTCString();
  };

  const showProducts = (_items) => {
    return _items.length > 0
      ? _items.map((item, index) => (
          <p key={index} style={{ paddingLeft: "60px" }}>
            <b>Name: </b>
            {item.product.name}, <b>Quantity: </b>
            {item.quantity}
          </p>
        ))
      : null;
  };

  return (
    <>
      <Layout small>
        <div className="contactPage">
          {auth.authenticate ? null : (
            <section className="orderTracking">
              <h1>Order Tracking</h1>
              <p className="trackMsg">
                To check your order status just provide the order ID in the
                following box and hit 'Track Order'!
              </p>
              <form className="trackOrderForm" onSubmit={traceOrder}>
                <input
                  type="text"
                  required
                  placeholder="Enter your order ID here"
                  onChange={(e) => setorderID(e.target.value)}
                />
                <button type="submit" className="trackBtn">
                  Track Order
                </button>
              </form>
              {orderData.length > 0 ? (
                <div className="ordDetails">
                  {orderData.map((item) => (
                    <div className="orderDis" key={item._id}>
                      <div>
                        <p>
                          <b>Item(s):</b>
                        </p>{" "}
                        <div id="showItemsBox">{showProducts(item.items)}</div>
                      </div>
                      <p>
                        <b>Order ID:</b> {item.orderSerial}
                      </p>
                      <p>
                        <b>Ordered on:</b> {formatDate(item.createdAt)}
                      </p>
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
                          : "Pre payment"}
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
                          <i className="fas fa-clipboard-check"></i> = Confirmed
                        </p>
                        <p>
                          <i className="fas fas fa-gift"></i> = Packed
                        </p>
                        <p>
                          <i className="fas fa-shipping-fast"></i> = On the way
                        </p>
                        <p>
                          <i className="fas fa-handshake"></i> = Delivered
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          )}
          <section className="location" id="location">
            <h1>Locate Us</h1>
            <div className="locationMap">
              <iframe
                id="map"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={Map_loc}
                width="100%"
                height="600"
                frameBorder="0"
              ></iframe>
            </div>
          </section>

          <section className="dmSection" id="write-to-us">
            <h1>Contact Us</h1>
            <form action="" className="directMailForm">
              <label htmlFor="name">Your Name:</label>
              <input type="text" required />
              <label htmlFor="email">Email:</label>
              <input type="email" required />
              <label htmlFor="contact">Contact(optional):</label>
              <input
                type="text"
                pattern="^(?:\+?88|0088)?01[15-9]\d{8}$"
                title="Must be a valid phone number"
              />
              <label htmlFor="message">Your Message:</label>
              <textarea maxLength="1000" required />
              <button type="submit" id="dmBtn">
                <i className="fas fa-paper-plane"></i> Send
              </button>
            </form>
            <p>
              <em>or reach us at . . .</em>
            </p>
            <ul className="contactListM">
              <li id="fb">
                <Link to="/" className="contIcon">
                  <i className="fab fa-facebook-square"></i>
                </Link>
              </li>
              <li id="ins">
                <Link to="/" className="contIcon">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li id="twt">
                <Link to="/" className="contIcon">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li id="yt">
                <Link to="/" className="contIcon">
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
              <li id="phn">
                <Link to="/" className="contIcon">
                  <i className="fas fa-phone-square-alt"></i>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
