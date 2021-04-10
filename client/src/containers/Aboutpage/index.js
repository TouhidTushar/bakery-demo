import "./style.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Aboutpage = () => {
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

  return (
    <>
      <Layout small>
        <div className="aboutPage">
          <div className="oddSec">
            <section>
              <h1>Story of Bakery</h1>
              <p>
                Bakery is a popular local cake shop. We started our journey back
                in 2010. From just a small-town pastry shop we came a long way.
                Here at bakery we make the best cakes you ever tasted. Not only
                authentic flavours but also some exclusive fusions are available
                here as well. We also take custom orders. You can have a
                personalized cake to celebrate your occasions in the best way
                possible. We always use the best and simple ingredients for our
                products. Our staffs work tirelessly to make sure you get the
                perfect cake. Bakery always loves to be a part of your
                celebrations.
              </p>
            </section>
          </div>

          <div id="FAQ" className="evenSec">
            <section>
              <h1>FAQ</h1>
              <ul>
                <li>
                  <p>
                    <b>
                      <i className="fas fa-caret-right"></i> Why to choose
                      Bakery?
                    </b>
                  </p>
                  <p>
                    At Bakery we promise to provide the best. Using fresh and
                    simple ingredients, we assure quality. You won't be
                    disappointed with the taste too.
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      <i className="fas fa-caret-right"></i> How do I order?
                    </b>
                  </p>
                  <p>
                    Our ordering system is pretty simple and it gets even more
                    convenient if you have an account as well. To order a cake
                    just head to our products page, choose according to your
                    taste, add the item to your cart and checkout. It's that
                    simple!
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      <i className="fas fa-caret-right"></i> How do I pay?
                    </b>
                  </p>
                  <p>
                    We accept both cash and pre payment. You can choose to pay
                    on delivery or pay in advance.
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      <i className="fas fa-caret-right"></i> How to track my
                      order?
                    </b>
                  </p>
                  <p>
                    If you have an account you can track your order from the
                    'Orders' tab under your 'User' menu and if you don't have an
                    account you can track your order from our contact page,
                    using the order ID.
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      <i className="fas fa-caret-right"></i> Can I cancel my
                      order?
                    </b>
                  </p>
                  <p>
                    You can cancel your order before confirmation. Our staffs
                    will call you for order confirmation. If you wish to cancel,
                    you should do it then. Note: Cancellation isn't possible
                    after the product is shipped and for custom orders.
                  </p>
                </li>
              </ul>
            </section>
          </div>

          <div id="terms-conditions" className="oddSec">
            <section>
              <h1>Terms & Conditions</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
                qui non ullam delectus voluptatum facere architecto, saepe quam
                harum repellat a natus veritatis magnam minus?
              </p>
              <ul className="styledList">
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Autem expedita exercitationem aperiam.
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Autem expedita exercitationem aperiam.
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Autem expedita exercitationem aperiam.
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Autem expedita exercitationem aperiam.
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Autem expedita exercitationem aperiam.
                </li>
              </ul>
            </section>
          </div>

          <div id="privacy-policy" className="evenSec">
            <section>
              <h1>Privacy policy</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                repellat ipsum natus? A temporibus ipsum quis? Debitis unde est
                hic, repellendus quis placeat molestias accusantium minima,
                inventore sapiente quos porro!
              </p>
              <ul className="styledList">
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae error esse incidunt.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae error esse incidunt.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae error esse incidunt.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae error esse incidunt.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae error esse incidunt.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Aboutpage;
