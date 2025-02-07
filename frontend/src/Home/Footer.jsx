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
                <Link to={"/"} onClick={() => scrollTo(0,0)}>Home</Link>
              </li>
              <li>
                <Link to={"/about"} onClick={() => scrollTo(0,0)}>About</Link>
              </li>
              <li>
               
                <Link to={"/services"} onClick={() => scrollTo(0,0)}>Services</Link>
              </li>
              <li>
                <Link to={"/contact"}  onClick={() => scrollTo(0,0)}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col2">
            <ul>
              <p>Account</p>
              <li>
                <Link to={"/login"}  onClick={() => scrollTo(0,0)}>Login</Link>
              </li>
              <li>
                <Link to={"/signup"} onClick={() => scrollTo(0,0)}>Sign up</Link>
              </li>
              <li>
                <Link to={"/humanrights"} onClick={() => scrollTo(0,0)}>Human Rights Policy</Link>
              </li>
              <li>
                <Link to={"/contact"} onClick={() => scrollTo(0,0)}>Support Center</Link>
              </li>
            </ul>
          </div>
          <div className="col3">
            <ul>
              <p>Support</p>
              <li>
                <Link to={"/policy"} onClick={() => scrollTo(0,0)}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/terms"} onClick={() => scrollTo(0,0)}>Terms&Conditions</Link>
              </li>
              <li>
                <Link to={"/faq"} onClick={() => scrollTo(0,0)}>FAQs</Link>
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