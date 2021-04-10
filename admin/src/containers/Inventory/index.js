import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCategories, deleteCategories } from "../../actions";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import Layout from "../../components/Layout";
import AddCatModal from "./components/AddCategoryModal";
import AddProdModal from "./components/AddProductModal";
import ProdDetailModal from "./components/ProductDetailModal";
import "./style.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const Inventory = () => {
  const [catModalOpen, setcatModalOpen] = useState(false);
  const [prodModalOpen, setprodModalOpen] = useState(false);
  const [prodDetailModalOpen, setprodDetailModalOpen] = useState(false);
  const [catUpdModalOpen, setcatUpdModalOpen] = useState(false);
  const [catDelModalOpen, setcatDelModalOpen] = useState(false);
  const [prodDetail, setprodDetail] = useState(null);
  const [checked, setchecked] = useState([]);
  const [expanded, setexpanded] = useState([]);
  const [checkedArray, setcheckedArray] = useState([]);
  const [expandedArray, setexpandedArray] = useState([]);
  const category = useSelector((state) => state.inventory);
  const product = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  //constructing category list tree
  const createCatList = (CATLIST, options = []) => {
    for (let CATEGORY of CATLIST) {
      options.push({
        value: CATEGORY._id,
        name: CATEGORY.name,
        parentId: CATEGORY.parentId,
      });
      if (CATEGORY.children.length > 0) {
        createCatList(CATEGORY.children, options);
      }
    }
    return options;
  };
  const ModalData = createCatList(category.Categories);

  //rendering current categories
  const renderCat = (catList) => {
    let myCategory = [];
    for (let CATEGORY of catList) {
      myCategory.push({
        label: CATEGORY.name,
        value: CATEGORY._id,
        children: CATEGORY.children.length > 0 && renderCat(CATEGORY.children),
      });
    }
    return myCategory;
  };

  //rendering current products
  const renderProd = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {product.Products.length > 0
            ? product.Products.map((product, index) => (
                <tr
                  key={product._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => showDetail(product)}
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.weight}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    );
  };

  //individual product detail
  const showDetail = (clickedProduct) => {
    setprodDetailModalOpen(true);
    setprodDetail(clickedProduct);
  };

  //constructing expanded array
  const createExpandedList = () => {
    const categories = createCatList(category.Categories);
    const ExpandedArray = [];
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && ExpandedArray.push(category);
      });
    setexpandedArray(ExpandedArray);
  };

  //constructing checked array
  const createCheckedList = () => {
    const categories = createCatList(category.Categories);
    const CheckedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && CheckedArray.push(category);
      });
    setcheckedArray(CheckedArray);
  };

  //category update handling
  const handleCatUpdate = (key, value, _index, type) => {
    if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setexpandedArray(updatedExpandedArray);
    } else if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setcheckedArray(updatedCheckedArray);
    }
  };

  const prepareData = () => {
    const UPD = new FormData();
    expandedArray.forEach((item, index) => {
      UPD.append("_id", item.value);
      UPD.append("name", item.name);
      UPD.append("parentId", item.parentId ? item.parentId : "");
    });
    checkedArray.forEach((item, index) => {
      UPD.append("_id", item.value);
      UPD.append("name", item.name);
      UPD.append("parentId", item.parentId ? item.parentId : "");
    });
    return UPD;
  };

  const updCat = (e) => {
    e.preventDefault();
    let formData = prepareData();
    dispatch(updateCategories(formData));
    dispatch(() => setcatUpdModalOpen(false));
    document.body.style.overflow = "unset";
  };

  const delCat = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    dispatch(deleteCategories(checkedIdsArray));
    setcatDelModalOpen(false);
    document.body.style.overflow = "unset";
  };

  //rendering inventory
  return (
    <Layout sidebar>
      <h1 className="contTitle">INVENTORY</h1>
      <div className="category">
        <h3 className="subSections">
          <i className="fab fa-slack-hash"></i> Categories
        </h3>
        <button className="actionBtn" onClick={() => setcatModalOpen(true)}>
          <i className="fas fa-plus"></i>
        </button>
        <button
          className="actionBtn"
          onClick={() => {
            createCheckedList();
            createExpandedList();
            setcatUpdModalOpen(true);
          }}
        >
          <i className="far fa-edit"></i>
        </button>
        <button
          className="delBtn"
          onClick={() => {
            setcatDelModalOpen(true);
            createCheckedList();
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <div className="categoryTree">
          <CheckboxTree
            nodes={renderCat(category.Categories)}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => setchecked(checked)}
            onExpand={(expanded) => setexpanded(expanded)}
            iconsClass="fa5"
          />
        </div>
      </div>

      <div className="products">
        <h3 className="subSections">
          <i className="fab fa-slack-hash"></i> Products
        </h3>
        <button className="actionBtn" onClick={() => setprodModalOpen(true)}>
          <i className="fas fa-plus"></i>
        </button>
        <div className="productTable">{renderProd()}</div>
      </div>

      {/* modals */}
      <AddCatModal
        show={catModalOpen}
        modalClose={() => setcatModalOpen(false)}
        modalData={createCatList(category.Categories)}
        modalTitle={"ADD CATEGORY"}
      ></AddCatModal>

      <AddProdModal
        show={prodModalOpen}
        modalClose={() => setprodModalOpen(false)}
        modalData={createCatList(category.Categories)}
        modalTitle={"ADD PRODUCT"}
      ></AddProdModal>

      {prodDetail ? (
        <ProdDetailModal
          show={prodDetailModalOpen}
          modalClose={() => setprodDetailModalOpen(false)}
          PRODUCT={prodDetail}
          modalTitle={"PRODUCT DETAILS"}
        ></ProdDetailModal>
      ) : null}

      {/* complex modals */}

      {/* update category modal */}
      <Modal
        show={catUpdModalOpen}
        modalClose={() => setcatUpdModalOpen(false)}
        modalTitle={"UPDATE CATEGORY"}
        clearState={() => {
          setexpandedArray([]);
          setcheckedArray([]);
        }}
      >
        {checkedArray.length === 0 && expandedArray.length === 0 ? (
          <p className="selectMsg">
            Please Check or Expand items you want to edit
          </p>
        ) : (
          <form
            className="updCatForm"
            encType="multipart/form-data"
            onSubmit={updCat}
          >
            <p>
              <em>
                <b>Expanded Items:</b>
              </em>
            </p>
            {expandedArray.length > 0 ? (
              expandedArray.map((item, index) => (
                <div className="expanded" key={index}>
                  <input
                    type="text"
                    id="catName"
                    value={item.name}
                    placeholder="Category Name"
                    required
                    onChange={(e) =>
                      handleCatUpdate("name", e.target.value, index, "expanded")
                    }
                  ></input>
                  <span> </span>
                  <select
                    id="selectParent"
                    value={item.parentId}
                    onChange={(e) =>
                      handleCatUpdate(
                        "parentId",
                        e.target.value,
                        index,
                        "expanded"
                      )
                    }
                  >
                    <option>Select Parent</option>
                    {ModalData.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <p>No items expanded.</p>
            )}

            <p>
              <em>
                <b>Checked Items:</b>
              </em>
            </p>
            {checkedArray.length > 0 ? (
              checkedArray.map((item, index) => (
                <div className="checked" key={index}>
                  <input
                    type="text"
                    id="catName"
                    value={item.name}
                    placeholder="Category Name"
                    required
                    onChange={(e) =>
                      handleCatUpdate("name", e.target.value, index, "checked")
                    }
                  ></input>
                  <span> </span>
                  <select
                    id="selectParent"
                    value={item.parentId}
                    onChange={(e) =>
                      handleCatUpdate(
                        "parentId",
                        e.target.value,
                        index,
                        "checked"
                      )
                    }
                  >
                    <option>Select Parent</option>
                    {ModalData.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <p>No items checked.</p>
            )}

            <button type="submit" className="updCat">
              Save Changes
            </button>
          </form>
        )}
      </Modal>

      {/* delete category modal */}
      <Modal
        show={catDelModalOpen}
        modalClose={() => setcatDelModalOpen(false)}
        modalTitle={"DELETE CATEGORY"}
        clearState={() => setcheckedArray([])}
      >
        {checkedArray.length === 0 ? (
          <p className="selectMsg">Please check items you want to delete</p>
        ) : (
          <>
            <p className="itemsForDel">
              <em>
                <b>Following items will be deleted:</b>
              </em>
            </p>
            <div>
              {checkedArray.map((item, index) => {
                let a =
                  (index + 1) % 4 === 0 ? (
                    <span key={index}>
                      {item.name}
                      <br />
                    </span>
                  ) : (
                    <span key={index}>
                      {item.name}
                      <span>, </span>
                    </span>
                  );
                return a;
              })}
              <p className="confirmMsg">
                Are you sure you want to delete these items?
              </p>
              <div className="confirmBtns">
                <button className="delete" onClick={delCat}>
                  DELETE
                </button>
                <button
                  className="cancel"
                  onClick={() => setcatDelModalOpen(false)}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default Inventory;
