import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { productImageDir } from "../../urlConfig";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../../actions";

const CartPage = () => {
  const dispatch = useDispatch();
  const [cartData, setcartData] = useState(cart);
  const [cartUpdated, setcartUpdated] = useState(false);

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (auth.authenticate) {
      setcartData(cart);
    } else {
      try {
        var localData = localStorage.getItem("Cart");
        var localCart = JSON.parse(localData);
        setcartData(localCart);
      } catch (error) {
        console.log(error);
      }
    }
  }, [cartUpdated, auth, cart]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handlePlus = (value) => {
    let product = value;
    dispatch(addToCart(product));
    if (cartUpdated) {
      setcartUpdated(false);
    } else {
      setcartUpdated(true);
    }
  };

  const handleMinus = (value) => {
    let product = value;
    dispatch(removeFromCart(product));
    if (cartUpdated) {
      setcartUpdated(false);
    } else {
      setcartUpdated(true);
    }
  };

  const cleanCart = () => {
    dispatch(clearCart());
  };

  const renderCartTotal = () => {
    const CART = cartData.cartItems;
    let cartTotal = 0;
    for (let cart of CART) {
      var cost = cart.product.price * cart.quantity;
      cartTotal += cost;
    }
    return (
      <p className="cartTotal">
        <strong>CART TOTAL: </strong>
        {cartTotal}
      </p>
    );
  };

  const renderCartItems = () => {
    const CART = cartData.cartItems;

    if (CART.length > 0) {
      return (
        <>
          <table className="cartTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th id="weightCell">Weight</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {CART.map((item, index) => (
                <tr
                  key={item.product._id}
                  className={index % 2 === 0 ? "even" : "odd"}
                >
                  <td className="alignData" id="indexCell">
                    <b>{index + 1}</b>
                  </td>
                  <td className="alignItems" id="productCell">
                    <Link
                      to={`/productInfo#${item.product.slug}`}
                      className="cartImgContainer"
                    >
                      <img
                        src={`${productImageDir}/${item.product.productPictures[0].img}`}
                        alt="product"
                      />
                    </Link>
                    <div id="cellItemName">
                      {item.product.name}{" "}
                      <span id="cellItemWeight">({item.product.weight})</span>
                    </div>
                  </td>
                  <td className="alignData" id="weightCell">
                    {item.product.weight}
                  </td>
                  <td className="alignData" id="priceCell">
                    <i
                      className="fas fa-plus-square"
                      onClick={() => handlePlus(item.product)}
                    ></i>{" "}
                    {item.quantity}{" "}
                    <i
                      className="fas fa-minus-square"
                      onClick={() => handleMinus(item.product)}
                    ></i>
                  </td>
                  <td className="alignData" id="qtyCell">
                    {item.quantity}
                    {"×"}
                    {item.product.price}={item.quantity * item.product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/order" className="checkout">
            Checkout
          </Link>
          <button className="clearCart" onClick={cleanCart}>
            Clear cart
          </button>
        </>
      );
    } else {
      return <p className="emptyCartMsg">No items in cart!</p>;
    }
  };

  return (
    <>
      <Layout small>
        <div className="cartPage">
          <h1>Your Cart</h1>

          <section className="cartItems">
            {cartData ? (
              renderCartItems()
            ) : (
              <p className="emptyCartMsg">No items in cart!</p>
            )}
            {cartData
              ? cartData.cartItems.length > 0
                ? renderCartTotal()
                : null
              : null}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
