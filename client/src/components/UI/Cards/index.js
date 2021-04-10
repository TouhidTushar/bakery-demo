import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../../../actions";
import { productImageDir } from "../../../urlConfig";
import { useDispatch, useSelector } from "react-redux";

const Cards = (data) => {
  const product = data.data;
  const imageFile = product.productPictures[0].img;

  const dispatch = useDispatch();
  const [itemCount, setitemCount] = useState(0);
  const [addClicked, setaddClicked] = useState(false);

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!auth.authenticate) {
      try {
        var retrievedData = localStorage.getItem("Cart");
        const cartData = JSON.parse(retrievedData);
        setitemCount(cartData.cartItems.length);
        if (itemCount > 0) {
          document.getElementById("cartCount").style.opacity = 100;
          document.getElementById("cartCount").innerHTML = itemCount;
        }
      } catch (error) {
        setitemCount(0);
        document.getElementById("cartCount").style.opacity = 0;
        document.getElementById("cartCount").innerHTML = null;
      }
      setaddClicked(false);
    } else {
      if (cart.cartItems.length > 0) {
        document.getElementById("cartCount").style.opacity = 100;
        document.getElementById("cartCount").innerHTML = cart.cartItems.length;
      }
      setaddClicked(false);
    }
  }, [addClicked]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setaddClicked(true);
  };

  return (
    <>
      <div className="cardContainer">
        <Link to={`/productInfo#${product.slug}`}>
          <div className="cardImgContainer">
            <img src={`${productImageDir}/${imageFile}`} alt={product.slug} />
          </div>
          <div className="cardText">
            <p className="itemName">
              <b>{product.name}</b>
            </p>
            <p className="weight">
              <b>Weight: </b>
              {product.weight}
            </p>
            <p className="price">
              <b>Price: </b>
              {product.price}BDT
            </p>
          </div>
          <div className="productStock">
            {product.quantity > 0 ? (
              <p className="inStock">In Stock</p>
            ) : (
              <p className="outStock">Out of Stock</p>
            )}
          </div>
        </Link>
        <button
          className="addToCart"
          onClick={handleAddToCart}
          id={product.quantity > 0 ? "enabled" : "disabled"}
          disabled={product.quantity > 0 ? false : true}
        >
          <i className="fas fa-shopping-cart"></i> ADD TO CART
        </button>
      </div>
    </>
  );
};

export default Cards;
