import Header from "../Header";
import Footer from "../Footer";

const Layout = (props) => {
  return (
    <>
      {props.small ? <Header minimalHeader /> : <Header />}
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
