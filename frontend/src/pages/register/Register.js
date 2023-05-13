import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "mm",
    email: undefined,
    password: undefined,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8800/api/auth/register", credentials);
    navigate("/login");
  };

  // console.log(user);
  return (
    <div className="login">
      <div className="lContainer">
        <h2>Register</h2>
        {/* <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        /> */}
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
