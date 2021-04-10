import "./style.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { productImageDir } from "../../urlConfig";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "../../components/UI/Modals/EditModal";
import { addToCart, deleteReview, userReview } from "../../actions";

function ProductDetails() {
  const dispatch = useDispatch();
  const [rating, setrating] = useState(0);
  const [mySlug, setmySlug] = useState("");
  const [review, setreview] = useState("");
  const [revData, setrevData] = useState({});
  const [picCount, setpicCount] = useState(0);
  const [itemCount, setitemCount] = useState(0);
  const [modalData, setmodalData] = useState("");
  const [deleteCon, setdeleteCon] = useState(false);
  const [addClicked, setaddClicked] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const inventory = useSelector((state) => state.inventory);

  const reviewData = { rating, review };

  useEffect(() => {
    window.scroll(0, 0);
    const Slug = window.location.hash.slice(1);
    setmySlug(Slug);
    for (let item of inventory.Products) {
      if (item.slug === mySlug) {
        setmodalData(item._id);
      }
    }
  }, [inventory, window.location.hash.slice(1)]);

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

  let reviewArrayLength = 0;
  let ratingTotal = 0;
  let ratingAvg = 0;
  for (let item of inventory.Products) {
    if (item.slug === mySlug) {
      reviewArrayLength = item.reviews.length;
      if (reviewArrayLength > 0) {
        for (let entry of item.reviews) {
          ratingTotal = ratingTotal + entry.rating;
        }
        ratingAvg = ratingTotal / reviewArrayLength;
      }
    }
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setaddClicked(true);
  };

  const handleRight = (value) => {
    if (picCount < value - 1) {
      setpicCount(picCount + 1);
    } else if (picCount === value - 1) {
      setpicCount(0);
    }
  };

  const handleLeft = (value) => {
    if (picCount > 0) {
      setpicCount(picCount - 1);
    } else if (picCount === 0) {
      setpicCount(value - 1);
    }
  };

  const formatDate = (_date) => {
    let date = new Date(_date);
    return date.toDateString();
  };

  const postReview = (productId) => {
    if (rating === 0) {
      document.getElementById("notRatedMsg").innerHTML =
        "Please rate this product";
    } else {
      document.getElementById("notRatedMsg").innerHTML = "";
      dispatch(userReview(reviewData, productId));
      dispatch(clearReviewForm);
    }
  };

  const clearReviewForm = () => {
    document.getElementById("userReviewForm").reset();
    var elements = document.getElementsByClassName("rating-star");
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].type === "radio") {
        elements[i].checked = false;
      }
    }
    setrating(0);
    setreview("");
  };

  const handleDelete = (productId, reviewId) => {
    dispatch(deleteReview(productId, reviewId));
    setdeleteCon(false);
  };

  return (
    <>
      <Layout small>
        <div className="productDetailsPage">
          {inventory.Products.map((item) =>
            item.slug === mySlug ? (
              <div key={item._id} id="productRendered">
                <div className="productWrapper">
                  <div className="imgSlider">
                    <div className="imgContainer">
                      <img
                        key={item.productPictures[picCount]._id}
                        src={`${productImageDir}/${item.productPictures[picCount].img}`}
                        alt={`${item.name}-picture${picCount}`}
                      />
                    </div>
                    <div
                      className="navRight"
                      onClick={() => handleRight(item.productPictures.length)}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </div>
                    <div
                      className="navLeft"
                      onClick={() => handleLeft(item.productPictures.length)}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className="picCarousel">
                      {item.productPictures.map((item, index) => (
                        <span
                          key={index}
                          style={
                            index === picCount
                              ? { backgroundColor: "white" }
                              : { backgroundColor: "transparent" }
                          }
                        ></span>
                      ))}
                    </div>
                  </div>
                  <div className="productDetailsContainer">
                    <h1>{item.name}</h1>
                    <p className="p-attr">
                      <strong>About this product:</strong> {item.description}
                    </p>
                    <p className="p-attr">
                      <strong>Category:</strong> {item.category.name}
                    </p>
                    <p className="p-attr">
                      <strong>Weight:</strong> {item.weight}
                    </p>
                    <p className="p-attr">
                      <strong>Stock:</strong>{" "}
                      {item.quantity > 0
                        ? `In stock (${item.quantity} left)`
                        : "Out of stock!"}
                    </p>
                    <p className="p-attr">
                      <strong>Rating: </strong>
                      {ratingAvg > 0.4 ? (
                        <>
                          <i
                            className={
                              ratingAvg > 0.4 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                          <i
                            className={
                              ratingAvg > 1.4 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                          <i
                            className={
                              ratingAvg > 2.4 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                          <i
                            className={
                              ratingAvg > 3.4 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                          <i
                            className={
                              ratingAvg > 4.4 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                        </>
                      ) : (
                        "(not rated yet)"
                      )}
                    </p>
                    <div className="price-Btn">
                      <p id="itemPrice">{item.price} BDT</p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        id={item.quantity > 0 ? "enabled" : "disabled"}
                        disabled={item.quantity > 0 ? false : true}
                      >
                        <i className="fas fa-shopping-cart"></i>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>

                <section className="reviewSection">
                  <h2>Ratings and reviews:</h2>

                  <form
                    id="userReviewForm"
                    className="reviewForm"
                    onSubmit={(e) => {
                      postReview(item._id);
                      e.preventDefault();
                    }}
                  >
                    <p>Rate this product:</p>
                    <div className="ratingInput">
                      <span className="starWrapper">
                        <input
                          type="radio"
                          name="rating"
                          className="rating-star"
                          onChange={() => setrating(1)}
                        />
                        <label htmlFor="star" className="rating-label">
                          <i
                            className={
                              rating > 0 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                        </label>
                      </span>

                      <span className="starWrapper">
                        <input
                          type="radio"
                          name="rating"
                          className="rating-star"
                          onChange={() => setrating(2)}
                        />
                        <label htmlFor="star" className="rating-label">
                          <i
                            className={
                              rating > 1 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                        </label>
                      </span>

                      <span className="starWrapper">
                        <input
                          type="radio"
                          name="rating"
                          className="rating-star"
                          onChange={() => setrating(3)}
                        />
                        <label htmlFor="star" className="rating-label">
                          <i
                            className={
                              rating > 2 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                        </label>
                      </span>

                      <span className="starWrapper">
                        <input
                          type="radio"
                          name="rating"
                          className="rating-star"
                          onChange={() => setrating(4)}
                        />
                        <label htmlFor="star" className="rating-label">
                          <i
                            className={
                              rating > 3 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                        </label>
                      </span>

                      <span className="starWrapper">
                        <input
                          type="radio"
                          name="rating"
                          className="rating-star"
                          onChange={() => setrating(5)}
                        />
                        <label htmlFor="star" className="rating-label">
                          <i
                            className={
                              rating > 4 ? "fas fa-star" : "far fa-star"
                            }
                          ></i>
                        </label>
                      </span>
                    </div>

                    <p id="notRatedMsg"></p>

                    <label htmlFor="review" id="reviewLabel">
                      Review:
                    </label>
                    <textarea
                      id="myTextarea"
                      maxLength="5000"
                      placeholder={
                        auth.authenticate
                          ? null
                          : "Login/Signup to post ratings & reviews"
                      }
                      onChange={(e) => setreview(e.target.value)}
                      required
                    ></textarea>
                    <button
                      type="submit"
                      disabled={auth.authenticate ? false : true}
                      style={
                        auth.authenticate
                          ? { cursor: "auto" }
                          : { cursor: "not-allowed" }
                      }
                    >
                      Post
                    </button>
                  </form>
                  <p id="revBorder"></p>
                  {item.reviews.length > 0
                    ? item.reviews.map((rev, index) => (
                        <div
                          key={index}
                          className="userReview"
                          id={
                            rev.user._id === auth.user._id
                              ? "highlightReview"
                              : "none"
                          }
                        >
                          <p className="revUser">
                            <i className="fas fa-comment-alt"></i>
                            {"  "}
                            {rev.user.firstName} {rev.user.lastName}
                          </p>
                          {rev.user._id === auth.user._id ? (
                            <span className="revAction">
                              <i
                                className="fas fa-edit"
                                onClick={() => {
                                  seteditModalOpen(true);
                                  setrevData(rev);
                                }}
                              ></i>
                              <i
                                className="fas fa-trash"
                                onClick={() => setdeleteCon(true)}
                              ></i>
                            </span>
                          ) : null}
                          <p className="revInfo">
                            <strong>Rating:</strong>
                            <i
                              className={
                                rev.rating > 0 ? "fas fa-star" : "far fa-star"
                              }
                            ></i>
                            <i
                              className={
                                rev.rating > 1 ? "fas fa-star" : "far fa-star"
                              }
                            ></i>
                            <i
                              className={
                                rev.rating > 2 ? "fas fa-star" : "far fa-star"
                              }
                            ></i>
                            <i
                              className={
                                rev.rating > 3 ? "fas fa-star" : "far fa-star"
                              }
                            ></i>
                            <i
                              className={
                                rev.rating > 4 ? "fas fa-star" : "far fa-star"
                              }
                            ></i>
                          </p>
                          <p className="revInfo">
                            <strong>Review:</strong> {rev.review}
                          </p>
                          <p className="revInfo">
                            <strong>Posted On: </strong>
                            {formatDate(rev.posted)}
                          </p>
                          <div
                            className={
                              deleteCon ? "deleteOverlay" : "no-deleteOverlay"
                            }
                          >
                            <button
                              onClick={(e) => {
                                handleDelete(item._id, rev._id);
                                e.preventDefault();
                              }}
                              className="delReview"
                            >
                              Delete
                            </button>
                            <button
                              className="cancelDelReview"
                              onClick={() => setdeleteCon(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))
                    : null}
                </section>
              </div>
            ) : null
          )}
        </div>
      </Layout>

      <EditModal
        open={editModalOpen}
        editClose={() => seteditModalOpen(false)}
        data={modalData}
        Rev={revData}
      ></EditModal>
    </>
  );
}

export default ProductDetails;
