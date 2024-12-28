import { useState } from "react";
import "../style/home.css";

function Faq() {
  // Define state variables for each question
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false); // New state variable for the third question
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);

  // Toggle function for questions
  const toggleAccordion1 = () => {
    setIsOpen1(!isOpen1);
  };

  const toggleAccordion2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleAccordion3 = () => {
    setIsOpen3(!isOpen3);
  };

  const toggleAccordion4 = () => {
    setIsOpen4(!isOpen4);
  };

  const toggleAccordion5 = () => {
    setIsOpen5(!isOpen5);
  };

  const toggleAccordion6 = () => {
    setIsOpen6(!isOpen6);
  };

  const toggleAccordion7 = () => {
    setIsOpen7(!isOpen7);
  };

  const toggleAccordion8 = () => {
    setIsOpen8(!isOpen8);
  };

  const toggleAccordion9 = () => {
    setIsOpen9(!isOpen9);
  };

  const toggleAccordion10 = () => {
    setIsOpen10(!isOpen10);
  };
 
  return (
    <>
      
      <div className="container">
        <div>
          <h1>Frequently Asked Questions</h1>
          <ul className="faq">
            <li>
              <div
                className={`q ${isOpen1 ? "opened" : ""}`}
                onClick={toggleAccordion1}
              >
                <span
                  className={`arrow ${isOpen1 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  What is Guarded nest Financial Investments
                </span>
              </div>
              <div className={`a ${isOpen1 ? "a-opened" : ""}`}>
                <p>
                  Gnf it is an online platform that helps make your money or
                  asset work for you. At gnf we give you access to invest in
                  either stocks, real estate, crypto and bonds. We help minimize
                  your losses to an absolute 0% and get a 99.9 or 100% return.
                  We help to guide you on what to invest so as to produce a
                  maximum result.
                </p>
              </div>
            </li>
            <br />
            <li>
              <div
                className={`q ${isOpen2 ? "opened" : ""}`}
                onClick={toggleAccordion2}
              >
                <span
                  className={`arrow ${isOpen2 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  How does Guarded Nest differ from other investment platforms?
                </span>
              </div>
              <div className={`a ${isOpen2 ? "a-opened" : ""}`}>
                <p>
                  At Guarded Nest, we help our clients generate more income by
                  investing in any of our available services. We also allow you
                  to invest in multiple services to help spread your risk.
                  Investing with GNF offers a safe space to keep your money
                  while it multiplies. We have fixed rates in every investment
                  option you choose.
                </p>
              </div>
            </li>
            <br />
            <li>
              <div
                className={`q ${isOpen3 ? "opened" : ""}`}
                onClick={toggleAccordion3}
              >
                <span
                  className={`arrow ${isOpen3 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  What types of investments are available on Guarded Nest?
                </span>
              </div>
              <div className={`a ${isOpen3 ? "a-opened" : ""}`}>
                <p>
                  1. Stocks
                  <br />
                  2. Real estate
                  <br />
                  3. Crypto
                  <br />
                  4. Bond
                </p>
              </div>
            </li>
            <br />
            <li>
              <div
                className={`q ${isOpen4 ? "opened" : ""}`}
                onClick={toggleAccordion4}
              >
                <span
                  className={`arrow ${isOpen4 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  Is Guarded Nest suitable for beginner investors?
                </span>
              </div>
              <div className={`a ${isOpen4 ? "a-opened" : ""}`}>
                <p>
                  Yes it is, we have experts that will guide and mentor you as
                  you embark on this journey.
                </p>
              </div>
            </li>

            <br />
            <li>
              <div
                className={`q ${isOpen5 ? "opened" : ""}`}
                onClick={toggleAccordion5}
              >
                <span
                  className={`arrow ${isOpen5 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  What are the fees associated with using Guarded Nest?
                </span>
              </div>
              <div className={`a ${isOpen5 ? "a-opened" : ""}`}>
                <p>
                  There are no fees attached to begin, but on every withdraw we
                  take 10%.. Maintenance charges starts after the first
                  withdrawal which is 3% per week
                </p>
              </div>
            </li>

            <br />
            <li>
              <div
                className={`q ${isOpen6 ? "opened" : ""}`}
                onClick={toggleAccordion6}
              >
                <span
                  className={`arrow ${isOpen6 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  How does Guarded Nest ensure the security of my investments
                  and personal information?
                </span>
              </div>
              <div className={`a ${isOpen6 ? "a-opened" : ""}`}>
                <p>
                  Well, when it comes to ensuring security for investments and
                  personal information, we use encrypted data, secure servers..
                  Personal information are safe in your portfolio. And can only
                  be accessible by you. However Gnf officials will never ask for
                  your login details
                </p>
              </div>
            </li>

            <br />
            <li>
              <div
                className={`q ${isOpen7 ? "opened" : ""}`}
                onClick={toggleAccordion7}
              >
                <span
                  className={`arrow ${isOpen7 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  Can I access my investments through a mobile app?
                </span>
              </div>
              <div className={`a ${isOpen7 ? "a-opened" : ""}`}>
                <p>
                  You can access your investment through the company Website
                </p>
              </div>
            </li>

            <br />
            <li>
              <div
                className={`q ${isOpen8 ? "opened" : ""}`}
                onClick={toggleAccordion8}
              >
                <span
                  className={`arrow ${isOpen8 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  What level of customer support does Guarded Nest provide?
                </span>
              </div>
              <div className={`a ${isOpen8 ? "a-opened" : ""}`}>
                <p>We give 100% customer support</p>
              </div>
            </li>

            <br />
            <li>
              <div
                className={`q ${isOpen9 ? "opened" : ""}`}
                onClick={toggleAccordion9}
              >
                <span
                  className={`arrow ${isOpen9 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  Are there any minimum investment requirements on Guarded Nest?
                </span>
              </div>
              <div className={`a ${isOpen9 ? "a-opened" : ""}`}>
                <p>Contact management on how much you can start up with</p>
              </div>
            </li>

            <br />
            <li>
              <div
                className={`q ${isOpen10 ? "opened" : ""}`}
                onClick={toggleAccordion10}
              >
                <span
                  className={`arrow ${isOpen10 ? "arrow-rotated" : ""}`}
                ></span>
                <span className="question">
                  How often does Guarded Nest update its investment options or
                  portfolios?
                </span>
              </div>
              <div className={`a ${isOpen10 ? "a-opened" : ""}`}>
                <p>Emails are usually sent before any update is carried out</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <br />

    </>
  );
}

export default Faq;
