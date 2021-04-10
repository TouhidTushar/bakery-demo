import Modal from "../../../../components/UI/Modal";
import { useState } from "react";
import { imageDir } from "../../../../urlConfig";
import { deleteProductById } from "../../../../actions";
import { useDispatch } from "react-redux";
import "./style.css";

const ProdDetailModal = (props) => {
  const { show, modalClose, modalTitle, PRODUCT } = props;
  const [delClicked, setdelClicked] = useState(false);
  const dispatch = useDispatch();

  const DeleteProduct = () => {
    dispatch(deleteProductById(PRODUCT._id));
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <Modal
        show={show}
        modalClose={modalClose}
        modalTitle={modalTitle}
        clearState={() => {
          return null;
        }}
      >
        <div className="productDetails">
          <p>
            <b>Name:</b> {PRODUCT.name}
          </p>
          <p>
            <b>Category:</b> {PRODUCT.category.name}
          </p>
          <p>
            <b>Weight:</b> {PRODUCT.weight}
          </p>
          <p>
            <b>Quantity:</b> {PRODUCT.quantity}
          </p>
          <p>
            <b>Price:</b> {PRODUCT.price}
          </p>
          <p>
            <b>Description:</b> {PRODUCT.description}
          </p>
        </div>
        <div className="productPic">
          {PRODUCT.productPictures.length > 0
            ? PRODUCT.productPictures.map((picture) => (
                <div key={picture._id} className="prodPicContainer">
                  <img
                    className="prodImage"
                    src={`${imageDir}/${picture.img}`}
                    alt="a nice cake"
                  />
                </div>
              ))
            : null}
        </div>
        <button
          className={delClicked ? "noDisplay" : "dltProd"}
          onClick={() => setdelClicked(true)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <div className={delClicked ? "confirmDiv" : "noDisplay"}>
          <button
            className="Delete"
            onClick={() => {
              // deletProductById(PRODUCT._id);
              DeleteProduct();
              setdelClicked(false);
              modalClose();
              document.body.style.overflow = "unset";
            }}
          >
            DELETE
          </button>
          <button className="Cancel" onClick={() => setdelClicked(false)}>
            CANCEL
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProdDetailModal;
