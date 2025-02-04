import { Link } from "react-router-dom";
import logo from "../assets/logosmall.png";
import logo2 from "../assets/logo2.png";
import bar from "../assets/bar.svg";
import xmark from "../assets/xmark.svg";
import "../style/home.css";
import { useState } from "react";

function Terms() {
  const [isNavActive, setNavActive] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  return (
    <>
    

      <div className="container5">
        <div className="contain">
          <h1 className="terms-header">Terms and Conditions</h1>

          <div className="term-border">
            <p className="intro">
              Welcome to Guarded Nest Finance Investments! By accessing or using
              our website, you agree to comply with and be bound by the
              following terms and conditions:
            </p>

            <br />
            <br />

            <p className="tc-header">Definitions</p>
            <p className="tc-body">
              For the purposes of these T&Cs and the preamble above, unless the
              context requires otherwise:
              <br />
              <br />
              “App” means the Guarded Nest Financial Investment web application
              owned and operated by GNF.
              <br />
              <br />
              “Credentials” means your personal credentials used to access the
              App, including but not limited to your username, password and
              personal identification number (“PIN”).
              <br />
              <br />
              “Privacy Policy” means the GNF privacy policy that sets out the
              basis on which any personal data we collect from you, or that you
              provide to us, will be used by us.
              <br />
              <br />
              “Services” means any form of financial services or products that
              GNF may offer you via the App and which you may from time to time
              subscribe to.
              <br />
              <br />
              “SMS” means Short Messaging Service.
              <br />
              <br />
              “Transaction Fees” includes any fees and charges payable for the
              use of any of our Services as published by GNF on the App or by
              such other means as GNF shall in its sole discretion determine.
              <br />
              <br />
              “Third-Party Service Providers” means any entities provide GNF
              support for our Services, including, for example, website and
              application development, hosting, maintenance, backup, storage,
              virtual infrastructure, payment processing, analysis, identity
              verification, background and compliance reviews, fund
              administration, banking services, and other services for us, which
              may require them to access or use your Personal Information and
              Relevant Information.
              <br />
              <br />
              “GNF”, “we” or “us” means GUARDED NEST FINANCE INVESTMENTS.
              <br />
              <br />
              “You” or “User” means the person that intends to access the App,
              request for and receive the Services.
            </p>
            <br />
            <br />
            <p className="tc-header">1. Acceptance of Terms</p>
            <br />
            <p className="tc-body">
              1.1. By accessing or using the Guarded Nest Finance Investments
              website, you acknowledge that you have read, understood, and agree
              to be bound by these terms and conditions.
              <br />
              <br />
              1.2. If you do not agree to these terms and conditions, please do
              not use our website.
            </p>
            <br />
            <br />
            <p className="tc-header">2. Registration</p>
            <br />
            <p className="tc-body">
              2.1. To access certain features of the website, you may be
              required to register for an account.
              <br />
              <br />
              2.2. You must provide accurate and complete information during the
              registration process and keep your account credentials secure.
              <br />
              <br />
              2.3. You are responsible for all activities that occur under your
              account.
            </p>
            <br />
            <br />
            <p className="tc-header">3. Investment Risks</p>
            <br />
            <p className="tc-body">
              3.1. Investing involves risk, including the potential loss of
              principal.
              <br />
              <br />
              3.2. Guarded Nest Finance Investments does not guarantee the
              performance of any investment or the accuracy of any information
              provided on the website.
            </p>
            <br />
            <br />
            <p className="tc-header">4. Financial Advice</p>
            <br />
            <p className="tc-body">
              4.1. The information provided on the Guarded Nest Finance
              Investments website is for informational purposes only and should
              not be construed as financial advice.
              <br />
              <br />
              4.2. Before making any investment decisions, you should consult
              with a qualified financial advisor.
            </p>
            <br />
            <br />
            <p className="tc-header">5. Accuracy of Information</p>
            <br />
            <p className="tc-body">
              5.1. Guarded Nest Finance Investments strives to provide accurate
              and up-to-date information, but we do not warrant the completeness
              or reliability of any information on the website.
            </p>
            <br />
            <br />
            <p className="tc-header">6. Intellectual Property </p>
            <br />
            <p className="tc-body">
              6.1. All content on the Guarded Nest Finance Investments website,
              including text, graphics, logos, and images, is the property of
              Guarded Nest Finance Investments and is protected by copyright
              laws.
              <br />
              <br />
              6.2. You may not reproduce, distribute, or modify any content from
              the website without the prior written consent of Guarded Nest
              Finance Investments.
            </p>
            <br />
            <br />
            <p className="tc-header">7. User Conduct</p>
            <br />
            <p className="tc-body">
              7.1. You agree to use the Guarded Nest Finance Investments website
              only for lawful purposes and in accordance with these terms and
              conditions.
              <br />
              <br />
              7.2. Prohibited activities include, but are not limited to,
              engaging in any form of illegal activity, transmitting spam or
              other unsolicited communications, and attempting to access
              unauthorized areas of the website.
            </p>
            <br />
            <br />
            <p className="tc-header">8. Privacy Policy</p>
            <br />
            <p className="tc-body">
              8.1. Your use of the Guarded Nest Finance Investments website is
              subject to our Privacy Policy, which explains how we collect, use,
              and protect your personal information.
            </p>
            <br />
            <br />
            <p className="tc-header">9. Termination</p>
            <br />
            <p className="tc-body">
              9.1. Guarded Nest Finance Investments reserves the right to
              terminate or suspend your access to the website at any time and
              for any reason without prior notice.
            </p>
            <br />
            <br />
            <p className="tc-header">10. Limitation of Liability</p>
            <br />
            <p className="tc-body">
              10.1. In no event shall Guarded Nest Finance Investments be liable
              for any direct, indirect, incidental, special, or consequential
              damages arising out of or in any way connected with your use of
              the website.
            </p>
            <br />
            <br />
            <p className="tc-header">11. Indemnification</p>
            <br />
            <p className="tc-body">
              11.1. You agree to indemnify and hold harmless Guarded Nest
              Finance Investments and its affiliates from any claims, damages,
              losses, or liabilities arising out of your use of the website or
              violation of these terms and conditions.
            </p>
            <br />
            <br />
            <p className="tc-header">12. Changes to Terms</p>
            <br />
            <p className="tc-body">
              12.1. Guarded Nest Finance Investments reserves the right to
              modify or update these terms and conditions at any time without
              prior notice.
            </p>
            <br />
            <br />
            <p className="tc-header">13. Fees</p>
            <br />
            <p className="tc-body">
              13.1 GNF shall be entitled to set and charge Transaction Fees, in
              connection with your use of any of our Services and from time to
              time amend or vary its Transaction Fees for the Services. If GNF
              decides to charge Transaction Fees or where already applicable,
              vary or amend its Transaction Fees, the Transaction Fees payable
              on any new request for any of the Services shall be displayed on
              the App. GNF shall use reasonable endeavors to notify you of any
              changes in relation to Transaction Fees within a reasonable period
              before such changes are implemented.
            </p>
            <br />
            <br />
            <p className="tc-header">14. Governing Law</p>
            <br />
            <p className="tc-body">
              14.1. These terms and conditions shall be governed by and
              construed in accordance with the laws, without regard to its
              conflict of law provisions.
            </p>
            <br />
            <br />
            <p className="tc-header">15. Contact Information</p>
            <br />
            <div className="tc-body">
              15.1. If you have any questions or concerns about these terms and
              conditions, please contact us at
              <br />
              <br />
              <span className="mail">
                Email:
                <a href="mailto:Gnfcustomerservice@gmail.com">
                  {" "}
                  Gnfcustomerservice@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>

    </>
  );
}

export default Terms;
