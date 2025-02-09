import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from "../assets/eye.svg"; // Eye icon for showing password
import eyeOff from "../assets/eye-off.svg"; // Eye icon for hiding password
import "../style/home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const countries = [
  { value: "", label: "Select Country" },
  { value: "afghanistan", label: "Afghanistan" },
  { value: "albania", label: "Albania" },
  { value: "algeria", label: "Algeria" },
  { value: "andorra", label: "Andorra" },
  { value: "angola", label: "Angola" },
  { value: "antigua_and_barbuda", label: "Antigua and Barbuda" },
  { value: "argentina", label: "Argentina" },
  { value: "armenia", label: "Armenia" },
  { value: "australia", label: "Australia" },
  { value: "austria", label: "Austria" },
  { value: "azerbaijan", label: "Azerbaijan" },
  { value: "bahamas", label: "Bahamas" },
  { value: "bahrain", label: "Bahrain" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "barbados", label: "Barbados" },
  { value: "belarus", label: "Belarus" },
  { value: "belgium", label: "Belgium" },
  { value: "belize", label: "Belize" },
  { value: "benin", label: "Benin" },
  { value: "bhutan", label: "Bhutan" },
  { value: "bolivia", label: "Bolivia" },
  { value: "bosnia_and_herzegovina", label: "Bosnia and Herzegovina" },
  { value: "botswana", label: "Botswana" },
  { value: "brazil", label: "Brazil" },
  { value: "brunei", label: "Brunei" },
  { value: "bulgaria", label: "Bulgaria" },
  { value: "burkina_faso", label: "Burkina Faso" },
  { value: "burundi", label: "Burundi" },
  { value: "cabo_verde", label: "Cabo Verde" },
  { value: "cambodia", label: "Cambodia" },
  { value: "cameroon", label: "Cameroon" },
  { value: "canada", label: "Canada" },
  { value: "central_african_republic", label: "Central African Republic" },
  { value: "chad", label: "Chad" },
  { value: "chile", label: "Chile" },
  { value: "china", label: "China" },
  { value: "colombia", label: "Colombia" },
  { value: "comoros", label: "Comoros" },
  { value: "congo", label: "Congo" },
  { value: "costa_rica", label: "Costa Rica" },
  { value: "croatia", label: "Croatia" },
  { value: "cuba", label: "Cuba" },
  { value: "cyprus", label: "Cyprus" },
  { value: "czechia", label: "Czechia" },
  { value: "denmark", label: "Denmark" },
  { value: "djibouti", label: "Djibouti" },
  { value: "dominica", label: "Dominica" },
  { value: "dominican_republic", label: "Dominican Republic" },
  { value: "ecuador", label: "Ecuador" },
  { value: "egypt", label: "Egypt" },
  { value: "el_salvador", label: "El Salvador" },
  { value: "equatorial_guinea", label: "Equatorial Guinea" },
  { value: "eritrea", label: "Eritrea" },
  { value: "estonia", label: "Estonia" },
  { value: "eswatini", label: "Eswatini" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "fiji", label: "Fiji" },
  { value: "finland", label: "Finland" },
  { value: "france", label: "France" },
  { value: "gabon", label: "Gabon" },
  { value: "gambia", label: "Gambia" },
  { value: "georgia", label: "Georgia" },
  { value: "germany", label: "Germany" },
  { value: "ghana", label: "Ghana" },
  { value: "greece", label: "Greece" },
  { value: "guatemala", label: "Guatemala" },
  { value: "guinea", label: "Guinea" },
  { value: "haiti", label: "Haiti" },
  { value: "honduras", label: "Honduras" },
  { value: "hungary", label: "Hungary" },
  { value: "iceland", label: "Iceland" },
  { value: "india", label: "India" },
  { value: "indonesia", label: "Indonesia" },
  { value: "iran", label: "Iran" },
  { value: "iraq", label: "Iraq" },
  { value: "ireland", label: "Ireland" },
  { value: "israel", label: "Israel" },
  { value: "italy", label: "Italy" },
  { value: "jamaica", label: "Jamaica" },
  { value: "japan", label: "Japan" },
  { value: "united_states", label: "United States" },
  { value: "zimbabwe", label: "Zimbabwe" }
];

export default function Signup() {
  const [username, setUserName] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASEURL;
  axios.defaults.withCredentials = true
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!username || !fname || !lname || !date || !address || !country || !phone || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/auth/register`, {
          username,
          fname,
          lname,
          date,
          address,
          country,
          phone,
          email,
          password,
        
      },{
        withCredentials: true,
      });

     if (response.status === 200) {
      toast.success("Registration Successful");
     }  else if(response.data.success === false) {
      toast.error("Registration failed: " + (response.error || 'Unknown error'));
    }  

    setUserName("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setCountry("");
    setEmail("");
    setPassword("");
    setDate("");
    setPhone("");
    
    navigate("/login");

    } catch (error) {
     if (error.status === 400) {
       toast.error("Email address already in use" || error.message);
     } else if (error.status === 409) {
      toast.error("Username already in Use")
     } 
    }
  };

  return (
    <>
     
      <div className="reg">
        <div className="form">
          <div className="sect">
            <div className="text3">
              <h1>Join Now</h1>
              <p>
                Join the 1 million people who have already chosen GNF
                <br />
                Licensed and regulated across multiple jurisdictions, we serve
                clients in over 150 countries worldwide.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="form1">
              {[ 
                { label: "Username", type: "text", id: "username", value: username, setter: setUserName },
                { label: "First Name", type: "text", id: "fname", value: fname, setter: setFirstName },
                { label: "Last Name", type: "text", id: "lname", value: lname, setter: setLastName },
                { label: "Date of birth", type: "date", id: "date", value: date, setter: setDate },
                { label: "Address", type: "text", id: "address", value: address, setter: setAddress },
                { label: "Phone", type: "tel", id: "phone", value: phone, setter: setPhone },
                { label: "Email", type: "email", id: "email", value: email, setter: setEmail },
              ].map(({ label, type, id, value, setter }) => (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <input
                    type={type}
                    id={id}
                    value={value}
                    required
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="password-container">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                  <img src={showPassword ? eye : eyeOff} alt={showPassword ? "Hide password" : "Show password"} />
                  </div>
                </div>
              </div>
              <button type="submit" id="signup">
                Register
              </button>
            </form>
            <div className="signup">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
      <ToastContainer />
    
    </>
  );
}
