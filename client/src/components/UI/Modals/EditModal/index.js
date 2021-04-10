import "./style.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { editReview } from "../../../../actions";

const EditModal = ({ open, editClose, data, Rev }) => {
  //value assignment
  const dispatch = useDispatch();
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState("");

  const reviewData = { rating, review };

  useEffect(() => {
    var thisRating = Rev.rating;
    var thisReview = Rev.review;
    setrating(thisRating);
    setreview(thisReview);
  }, [Rev]);

  const updateReview = (productId) => {
    if (rating === 0) {
      document.getElementById("notRatedMsg").innerHTML =
        "Please rate this product";
    } else {
      document.getElementById("notRatedMsg").innerHTML = "";
      dispatch(editReview(reviewData, productId, Rev._id));
      editClose();
      document.body.style.overflow = "unset";
    }
  };

  if (!open) {
    return null;
  } else {
    document.body.style.overflow = "hidden";
    return (
      <>
        <div className="editOverlay">
          <div className="edit">
            <i
              className="fas fa-times"
              id="cross"
              onClick={function () {
                editClose();
                document.body.style.overflow = "unset";
              }}
            ></i>

            <form
              className="reviewForm"
              onSubmit={(e) => {
                updateReview(data);
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
                      className={rating > 0 ? "fas fa-star" : "far fa-star"}
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
                      className={rating > 1 ? "fas fa-star" : "far fa-star"}
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
                      className={rating > 2 ? "fas fa-star" : "far fa-star"}
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
                      className={rating > 3 ? "fas fa-star" : "far fa-star"}
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
                      className={rating > 4 ? "fas fa-star" : "far fa-star"}
                    ></i>
                  </label>
                </span>
              </div>

              <p id="notRatedMsg"></p>

              <label htmlFor="review" id="reviewLabel">
                Review:
              </label>
              <textarea
                maxLength="5000"
                defaultValue={review}
                onChange={(e) => setreview(e.target.value)}
                required
              ></textarea>
              <button type="submit">Save changes</button>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default EditModal;
