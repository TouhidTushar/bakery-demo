import "./style.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { imageDir } from "../../urlConfig";
import Layout from "../../components/Layout";

const Homepage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //static image boxes
  var Boxes = [];
  const imgArray = [
    {
      src1: `${imageDir}/cho1.jpg`,
      src2: `${imageDir}/cho2.jpg`,
      src3: `${imageDir}/cho3.jpg`,
      boxname: "Chocolate",
    },
    {
      src1: `${imageDir}/orng1.jpg`,
      src2: `${imageDir}/orng2.jpg`,
      src3: `${imageDir}/orng3.jpg`,
      boxname: "Orange",
    },
    {
      src1: `${imageDir}/str1.jpg`,
      src2: `${imageDir}/str2.jpg`,
      src3: `${imageDir}/str3.jpg`,
      boxname: "Strawberry",
    },
    {
      src1: `${imageDir}/red1.jpg`,
      src2: `${imageDir}/red2.jpg`,
      src3: `${imageDir}/red3.jpg`,
      boxname: "Red Velvet",
    },
    {
      src1: `${imageDir}/che1.jpg`,
      src2: `${imageDir}/che2.jpg`,
      src3: `${imageDir}/che3.jpg`,
      boxname: "Cheese",
    },
    {
      src1: `${imageDir}/blu1.jpg`,
      src2: `${imageDir}/blu2.jpg`,
      src3: `${imageDir}/blu3.jpg`,
      boxname: "Blueberry",
    },
  ];

  for (let item of imgArray) {
    Boxes.push(
      <div className="container" key={imgArray.indexOf(item)}>
        <div className="boxA">
          <i id="box" className="fas fa-box-open"></i>
          <img src={item.src1} className="pic1" />
          <img src={item.src2} className="pic2" />
          <img src={item.src3} className="pic3" />
          <p className="boxName">{item.boxname}</p>
        </div>
      </div>
    );
  }

  //Homepage
  return (
    <>
      <Layout>
        <div className="bgVideo">
          <video src={`${imageDir}/cake-bg.MP4`} autoPlay={true} muted loop />
          <div className="cover">
            <Link to="/products" className="expBtn">
              <h1>EXPLORE</h1>
            </Link>
            <h2>"to experience the best taste"</h2>
          </div>
        </div>
        <div className="borderContainer">
          <img src={`${imageDir}/border1.png`} />
        </div>
        <div className="homelayout">
          <section className="aboutSection">
            <div className="content">
              <h1 className="caption">About Bakery</h1>
              <p className="shortAbout">
                Bakery is a popular local cake shop. If you have a sweet tooth
                then you are welcomed here. Inspired by traditional baking and
                using simple ingredients we provide the best cakes for you.
                Bakery loves to be a part of your celebrations.
              </p>
              <div className="abtBtn">
                <Link to="/about" className="abtLink">
                  Our Story
                </Link>
                <Link to="/contact#location" className="findLink">
                  Find Us
                </Link>
              </div>
            </div>
            <div className="image">
              <img src={`${imageDir}/about.jpg`} />
            </div>
          </section>
          <h1 className="sCaption">
            Check out our delicious boxes!{" "}
            <i id="bIcon" className="fas fa-box-open"></i>
          </h1>
          <p id="sText">
            We offer varieties of flavor according to your choice
          </p>
          <section className="showcase">{Boxes}</section>
          <div className="sBtn">
            <Link to="/products" className="more">
              Show More
            </Link>
          </div>
          <section className="customSection">
            <div className="content">
              <h1 className="caption">Have something in mind?</h1>
              <p className="customMsg">
                We take custom orders too. You choose, we deliver. Here at
                Bakery, our staffs work their heart out to make the perfect cake
                you wish for your beautiful occation.
              </p>
              <div className="customBtn">
                <Link to="/customOrder" className="customLink">
                  Custom Order
                </Link>
              </div>
            </div>
            <div className="image">
              <img src={`${imageDir}/custom.jpg`} />
            </div>
          </section>
          <section className="contactSection">
            <h1 className="cCaption">Want to contact?</h1>
            <p className="cMsg">How would you like to reach us...</p>
            <ul className="contactList">
              <li id="fb">
                <Link to="/" className="contIcon">
                  <i className="fab fa-facebook-square"></i>
                </Link>
              </li>
              <li id="ins">
                <Link to="/" className="contIcon">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li id="twt">
                <Link to="/" className="contIcon">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li id="yt">
                <Link to="/" className="contIcon">
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
              <li id="phn">
                <Link to="/" className="contIcon">
                  <i className="fas fa-phone-square-alt"></i>
                </Link>
              </li>
            </ul>
            <Link to="/contact#write-to-us" className="cMsgDM" id="cBtn">
              Or write to us directly <i className="fas fa-paper-plane"></i>
            </Link>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
