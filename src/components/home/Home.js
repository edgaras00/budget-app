import useRedirect from "../../hooks/useRedirect";
import "./styles/home.css";

const Home = () => {
  useRedirect();
  return (
    <main className="home">
      <div className="home-top">
        <div className="home-heading">
          <h1>
            <span className="heading-track">TRACK.</span>{" "}
            <span className="heading-plan">PLAN.</span>{" "}
            <span className="heading-succeed">SUCCEED.</span>
          </h1>
        </div>
        <div className="home-description">
          <p>
            Take control of your finances effortlessly with our intuitive
            budgeting app, empowering financial stability and goal achievement.
          </p>
        </div>
      </div>
      <div className="home-start">
        <button>Get Started</button>
      </div>
    </main>
  );
};

export default Home;
