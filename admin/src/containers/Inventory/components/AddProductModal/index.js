import Modal from "../../../../components/UI/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../actions";
import "./style.css";

const AddProdModal = (props) => {
  const { show, modalClose, modalTitle, modalData } = props;
  // value assignment
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [weight, setweight] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [offer, setoffer] = useState("");
  const [productPictures, setproductPictures] = useState([]);

  const handlePicture = (e) => {
    setproductPictures([...productPictures, e.target.files[0]]);
  };

  const prepareData = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("weight", weight);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("offer", offer);
    for (let file of productPictures) {
      formData.append("productPicture", file);
    }
    return formData;
  };

  const addNewProd = (e) => {
    e.preventDefault();
    let PROD = prepareData();
    dispatch(addProduct(PROD));
    dispatch(clearPRODstate);
    dispatch(modalClose);
    document.body.style.overflow = "unset";
  };

  const clearPRODstate = () => {
    setname("");
    setweight("");
    setprice("");
    setdescription("");
    setcategory("");
    setquantity("");
    setoffer("");
    setproductPictures([]);
  };

  return (
    <>
      <Modal
        show={show}
        modalClose={modalClose}
        modalTitle={modalTitle}
        clearState={clearPRODstate}
      >
        <form className="addProdForm" onSubmit={addNewProd}>
          <input
            type="text"
            id="prodName"
            placeholder="Product Name"
            required
            onChange={(e) => setname(e.target.value)}
          ></input>

          <input
            type="text"
            id="prodWeight"
            placeholder="Product Weight"
            required
            onChange={(e) => setweight(e.target.value)}
          ></input>

          <input
            type="number"
            id="prodPrice"
            placeholder="Product Price"
            required
            onChange={(e) => setprice(e.target.value)}
          ></input>

          <textarea
            id="prodDescription"
            placeholder="Product Description"
            required
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>

          <select
            id="selectCategory"
            required
            defaultValue={"DEFAULT"}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              -- select a category --
            </option>
            {modalData.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            id="prodQuantity"
            placeholder="Product Quantity"
            required
            onChange={(e) => setquantity(e.target.value)}
          ></input>

          <input
            type="number"
            id="prodOffer"
            placeholder="Offer"
            onChange={(e) => setoffer(e.target.value)}
          ></input>

          <input
            type="file"
            id="prodImg"
            name="productPicture"
            required
            onChange={handlePicture}
          ></input>

          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <p style={{ fontSize: "12px" }} key={index}>
                  {pic.name}
                </p>
              ))
            : null}

          <button type="submit" className="addProd">
            Add
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddProdModal;
