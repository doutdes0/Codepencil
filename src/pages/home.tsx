import showcase1 from "../assests/showcase1.png";
import showcase2 from "../assests/showcase2.png";
import { Link } from "react-router-dom";
import "./home.css";

const Home: React.FC = () => {
  return (
    <>
      <div className="hero-wrapper">
        <h2>Welcome to Codepencil.</h2>
        <h4>A code sandbox.</h4>
        <div className="hero hero-1">
          <div className="hero-story">
            <h3>Create, build fast and behold the beauty of your work!</h3>
            <p>
              Simply import any package from npm, given it's optimized for
              in-browser bundling, and you're ready to go. <br /> We've already
              preinstalled <strong>React</strong> and <strong>ReactDOM</strong>{" "}
              for you! <br />
              You don't have to set it up, just use the{" "}
              <code>show{"(<App/>)"}</code> function to display components and
              other data types. <br />
              And, most conviniently, variables from previous codecells can be
              accessed in following ones.
            </p>
          </div>
          <div className="hero-card hero-card-1">
            <div className="hero-showcase">
              <img src={showcase1} alt="editor-showcase" />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-wrapper">
        <div className="hero bttm-left-grad">
          <div className="hero-card hero-card-2">
            <div className="hero-showcase">
              <img src={showcase2} alt="editor-showcase" />
            </div>
          </div>
          <div className="hero-story">
            <h3>Supply your code with useful notes!</h3>
            <p>
              Writing notes is as easy as creating a README file with the help
              of inbuilt markdown editor. <br />
              This way you won't ever lose your train of thought. <br />
              Now, what are you waiting for? Create your first thread and try
              out the editors!
            </p>
            <Link to="/threads">
              <button className="action-btn">Dive in!</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
