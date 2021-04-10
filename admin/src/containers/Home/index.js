import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import "./style.css";

const Home = () => {
  const User = useSelector((state) => state.auth.user);

  //
  const welcomeText = () => {
    var greetings;
    var date = new Date();
    var hour = date.getHours();
    console.log(hour);
    if (hour < 5 && hour > 0) {
      greetings = "Late night is not good for work,";
    } else if (hour < 12) {
      greetings = "Good Morning,";
    } else if (hour < 17) {
      greetings = "Good Afternoon,";
    } else {
      greetings = "Good Evening,";
    }
    return greetings;
  };

  return (
    <>
      <Layout sidebar>
        <h1 className="contTitle">DASHBOARD</h1>
        <section className="welcome">
          <h2>
            <em>
              "{welcomeText()} {User.firstName}"
            </em>
          </h2>
          <p>
            Welcome to admin dashboard, manage orders, inventory and many
            more...
          </p>
        </section>
      </Layout>
    </>
  );
};

export default Home;
