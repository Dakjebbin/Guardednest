import {Link} from 'react-router-dom'
import logo2 from '../assets/logo2.png'

const Footer = () => {
  return (
    <div>
<footer>

        <div className="foot">
          <div className="col0">
            <img src={logo2} alt="logo" />
            <h2>
              Welcome to our investment site! We offer the best,
              <br />
              most affordable products and services around.
              <br />
              Shop now and start finding great deals!
            </h2>
          </div>

          <div className="col1">
            <ul>
              <p>Quick link</p>
              <li>
                <Link to={"/"}>Home</Link>
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
                <Link to={"/signup"}>Sign up</Link>
              </li>
              <li>
                <Link to={"/humanrights"}>Human Rights Policy</Link>
              </li>
              <li>
                <Link to={"/contact"}>Support Center</Link>
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
          <h3>© 2024 All Rights Reserved By GNF</h3>
        </div>
      </footer>

    </div>
  )
}

export default Footer