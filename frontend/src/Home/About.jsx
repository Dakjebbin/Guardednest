import { Link } from "react-router-dom";
import logo from "../assets/logosmall.png";
import team from "../assets/team/4.jpg";
import bar from "../assets/bar.svg";
import xmark from "../assets/xmark.svg";
import "../style/home.css";
import { useState } from "react";

function About() {
  const [isNavActive, setNavActive] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  return (
    <>
      <nav>
        <div className="top">
          <a className="logo" href="home.html">
            <img src={logo} alt="logo" />
          </a>
          <div className="bar" onClick={toggleNavigation}>
            <img src={isNavActive ? xmark : bar} alt="menu" />
          </div>
        </div>
        <ul className={`menu ${isNavActive ? "active" : ""}`}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <Link to={"/login"} className="book">
            Sign-in
          </Link>
        </ul>
      </nav>

      <div className="container">
        <div className="content">
          <div className="text1">
            <h1>About Us</h1>
            <p>
              Welcome to <span>Guarded Nest Financials</span> – where financial
              growth meets curated excellence. At Guarded Nest, we are dedicated
              to being your premier gateway to unlocking the full potential of
              your investments.
              <br />
              Our mission is to empower you with curated investment
              opportunities, expert insights, and a cutting-edge, user-friendly
              platform that is tailor-made to elevate your investment journey.
              <br />
              <br />
              <br />
              Embark on a transformative experience as you explore a wealth of
              carefully selected investment options that align with your
              financial goals. Our team of seasoned experts is committed to
              providing you with valuable insights and strategies, ensuring that
              you make informed decisions on your path to financial prosperity.
              <br />
              <br />
              What sets <span>Guarded Nest Financials</span> apart is our
              unwavering commitment to your success. We understand that each
              investor is unique, and our platform is designed to cater to your
              individual needs. Whether you&#39;re a seasoned investor or just
              starting on your financial journey, we have the tools and
              resources to guide you every step of the way.
              <br />
              <br />
              Join us in shaping a prosperous future, one smart investment at a
              time. Our comprehensive suite of features includes real-time
              market analysis, personalized investment recommendations, and
              innovative financial planning tools.
              <br />
              <br />
              <br />
              As a member of <span>Guarded Nest Financials</span>, you gain
              access to a community of like-minded individuals, fostering an
              environment where collective knowledge and experience drive
              success. Navigate the complexities of the financial landscape with
              confidence, supported by a team that is dedicated to your
              financial well-being. <span>Guarded Nest Financials</span> is not
              just a platform; it&#39;s a partnership in your journey towards
              financial growth.
              <br />
              <br />
              Discover the possibilities, seize the opportunities, and let
              Guarded Nest Financials be your trusted ally in the pursuit of a
              prosperous and secure future. Welcome to a world where your
              financial aspirations take flight –{" "}
              <span>Guarded Nest Financials</span>, your beacon to financial
              success.
            </p>
          </div>
          <div className="team">
            <div className="team-text">
              <h1>
                Meet Our <span>Advisers</span>
              </h1>
              <p>
                Hey everyone, meet our amazing advisers! They&#39;re here to
                help and guide us through anything.
              </p>
            </div>
            <div className="team-2">
              <div className="teaminfo">
                <img src={team} />
                <div className="team-details">
                  <h6 className="mb-1">Dianne Russell</h6>
                  <p className="mb-0">Trade Captain</p>
                </div>
              </div>

              <div className="teaminfo">
                <img src={team} />
                <div className="team-details">
                  <h6 className="mb-1">Dianne Russell</h6>
                  <p className="mb-0">Trade Captain</p>
                </div>
              </div>

              <div className="teaminfo">
                <img src={team} />
                <div className="team-details">
                  <h6 className="mb-1">Dianne Russell</h6>
                  <p className="mb-0">Trade Captain</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sub1">
            <h1>
              Subscribe to <span>Our Newsletter</span>
            </h1>
            <p>
              Hey! Are you tired of missing out on our updates?
              <br />
              Subscribe to our news now and stay in the loop!
            </p>
            <form>
              <input type="email" placeholder="Email address" />
              <br />
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>

      <footer>
        <div className="foot">
          <div className="col0">
            <img src={logo} alt="logo" />
            <h3>
              Welcome to our investment site! We offer the best,
              <br />
              most affordable products and services around.
              <br />
              Shop now and start finding great deals!
            </h3>
          </div>

          <div className="col1">
            <ul>
              <p>Quick link</p>
              <li>
                <Link to={"/home"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/services"}>Services</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col2">
            <ul>
              <p>Account</p>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Sign up</Link>
              </li>
              <li>
                <Link to={"/human-rights"}>Human Rights Policy</Link>
              </li>
              <li>
                <Link to={"/support"}>Support Center</Link>
              </li>
            </ul>
          </div>
          <div className="col3">
            <ul>
              <p>Support</p>
              <li>
                <Link to={"/policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/terms"}>Terms&Conditions</Link>
              </li>
              <li>
                <Link to={"/faq"}>FAQs</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <h3>© 2023 All Rights Reserved By GNF</h3>
        </div>
      </footer>
    </>
  );
}

export default About;