import Modal from "../../../../components/UI/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../../actions";
import "./style.css";

const AddCatModal = (props) => {
  const { show, modalClose, modalTitle, modalData } = props;

  //value assignment
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [parentId, setparentId] = useState("");
  const CAT = { name, parentId };

  const clearCATstate = () => {
    setname("");
    setparentId("");
  };

  const addNewCat = (e) => {
    e.preventDefault();
    dispatch(addCategory(CAT));
    dispatch(clearCATstate);
    dispatch(modalClose);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <Modal
        show={show}
        modalClose={modalClose}
        modalTitle={modalTitle}
        clearState={clearCATstate}
      >
        <form className="addCatForm" onSubmit={addNewCat}>
          <input
            type="text"
            id="catName"
            placeholder="Category Name"
            required
            onChange={(e) => setname(e.target.value)}
          ></input>

          <select
            id="selectParent"
            onChange={(e) => setparentId(e.target.value)}
          >
            <option>Select Parent (optional)</option>
            {modalData.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <button type="submit" className="addCat">
            Add
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddCatModal;
