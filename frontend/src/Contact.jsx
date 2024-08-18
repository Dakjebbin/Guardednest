import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import logo from "./assets/logo.png";
import bar from "./assets/bar.svg";
import xmark from "./assets/xmark.svg";
import "./style/home.css";

function Contact() {
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
        <div className="row">
          <div className="conleft">
            <h1>
              <span>Reach</span> Out To Us
            </h1>
            <div className="social">
              <FontAwesomeIcon />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                width={"40px"}
                viewBox="0 0 512 512"
              >
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                width={"40px"}
                viewBox="0 0 448 512"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                width={"40px"}
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                width={"50px"}
                viewBox="0 0 496 512"
              >
                <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
              </svg>
            </div>
            <div className="contact">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                info@gnfinvest.pro
              </p>
            </div>
            <div className="contact-address">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                </svg>
                88 Sheridan Street
              </p>
            </div>
          </div>
          <div className="conright">
            <form name="submit-to-google-sheet">
              <input type="text" name="Name" placeholder="Your Name" required />
              <input
                type="email"
                name="Email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="Message"
                rows="6"
                placeholder="Your Message"
              ></textarea>
              <button className="btn2" type="submit">
                Submit
              </button>
            </form>
            <span id="msg"></span>
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

export default Contact;