import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const OrderConfirm = () => {
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);
  const [orderData, setorderData] = useState([]);
  const [didMount, setdidMount] = useState(false);

  useEffect(() => {
    setdidMount(true);
    return () => setdidMount(false);
  }, []);

  useEffect(() => {
    if (didMount) {
      if (auth.authenticate) {
        setorderData(order.orderDetails);
      } else {
        try {
          var localData = localStorage.getItem("GuestOrder");
          var localOrder = JSON.parse(localData);
          setorderData(localOrder);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [didMount, order, auth]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const copyFunction = () => {
    var copyText = document.getElementById("Order-ID");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById(
      "tooltiptext"
    ).innerHTML = `Copied: ${copyText.value}`;
  };

  const handleTooltipText = () => {
    document.getElementById("tooltiptext").innerHTML = "Copy to clipboard";
  };

  return (
    <div className="orderConPageBG">
      <Layout small>
        <div className="orderConfirmPage">
          {orderData !== null &&
          orderData !== undefined &&
          orderData.length > 0 ? (
            <div className="orderConfirmMsg">
              {auth.authenticate ? (
                <>
                  <h1>Your order was placed successfully</h1>
                  <p>
                    Our salesperson will contact you shortly. If you don't
                    receive any call from us within next 30 minutes, you may
                    contact our HOTLINE: +0123456789.
                  </p>
                  <p>
                    <i className="fas fa-caret-right"></i> Your order ID:{" "}
                    <span className="orderID">{orderData[0].orderSerial}</span>
                  </p>
                  <p className="trackMsg">
                    You can always track your order from ORDERS under your USER
                    MENU
                  </p>
                  <Link to="/profile#order-history" id="contLink">
                    Click Here
                  </Link>
                  <span> to track your order now!</span>
                </>
              ) : (
                <>
                  <p id="instructionMsg">
                    Please read the following instructions carefully:
                  </p>
                  <p>
                    <i className="fas fa-caret-right"></i> Your order ID:{" "}
                    <input
                      type="text"
                      value={orderData[0].orderSerial}
                      id="Order-ID"
                      readOnly
                    ></input>
                    <span className="tooltip">
                      <button
                        id="copyBtn"
                        onClick={copyFunction}
                        onMouseEnter={handleTooltipText}
                      >
                        Copy ID
                      </button>
                      <span>
                        <span className="tooltiptext" id="tooltiptext"></span>
                      </span>
                    </span>
                  </p>
                  <p>
                    <i className="fas fa-caret-right"></i> A text with the order
                    ID was also sent to <b>{orderData[0].contact}</b>
                  </p>
                  <p>
                    <b>
                      <i className="fas fa-caret-right"></i> "PLEASE KEEP THIS
                      ID SAFE FOR ANY QUERY ABOUT THE ORDER"
                    </b>
                  </p>
                  <p>
                    <i className="fas fa-caret-right"></i> Our salesperson will
                    contact you shortly. If you don't receive any call from us
                    within next 30 minutes, you may contact our
                    <b> HOTLINE: +0123456789</b>.
                  </p>
                  <p>
                    <i className="fas fa-caret-right"></i> Using the provided{" "}
                    <b>order ID</b>, you can always track your order from our{" "}
                    <Link id="contLink" to="/contact">
                      Contact
                    </Link>{" "}
                    page.
                  </p>
                  <p>
                    <em>Thank you</em>.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="orderConfirmMsg">
              <h1>No order information was found!</h1>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default OrderConfirm;
