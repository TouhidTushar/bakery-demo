import "./style.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Cards from "../../components/UI/Cards";

const ProductsPage = () => {
  const [didMount, setdidMount] = useState(false);

  useEffect(() => {
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
  }, [window.location.hash.slice(1), didMount]);

  const inventory = useSelector((state) => state.inventory);

  const createCatList = (CATLIST, options = []) => {
    for (let CATEGORY of CATLIST) {
      options.push({
        id: CATEGORY._id,
        name: CATEGORY.name,
        slug: CATEGORY.slug,
        parentId: CATEGORY.parentId,
      });
      if (CATEGORY.children.length > 0) {
        createCatList(CATEGORY.children, options);
      }
    }
    return options;
  };

  const renderProducts = (catList) => {
    const PRODUCTS = inventory.Products;
    let myCategories = [];
    for (let CAT of catList) {
      myCategories.push(
        <div
          id={`${CAT.slug}-section`}
          key={catList.indexOf(CAT)}
          className={!CAT.parentId ? "parentCategory" : "childCategory"}
        >
          <h1>
            {!CAT.parentId ? (
              <i className="fab fa-slack-hash"></i>
            ) : (
              <i className="fas fa-caret-down"></i>
            )}{" "}
            {CAT.name}{" "}
            {!CAT.parentId ? <i className="fab fa-slack-hash"></i> : null}
          </h1>
          <div className={!CAT.parentId ? null : "productCards"}>
            {PRODUCTS.map((item, index) => {
              if (item.category.name === CAT.name) {
                return <Cards data={item} key={index}></Cards>;
              }
            })}
          </div>
        </div>
      );
    }
    return myCategories;
  };

  return (
    <>
      <Layout small>
        <div id="productPage">
          <section className="productContainer">
            <div className="allCategory">
              <h1>
                <i className="fas fa-star"></i> All Cakes
              </h1>
              <div className="productCards">
                {inventory.Products.map((item, index) => {
                  return <Cards data={item} key={index}></Cards>;
                })}
              </div>
            </div>
            {renderProducts(createCatList(inventory.Categories))}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default ProductsPage;
