import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      // console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      const mailId = res.data.email;
      console.log(mailId);
      const domain = mailId.split('.')[1].split('@')[0];
      console.log(domain);
      navigate("/assembly");
    } catch (err) {
      alert("Wrong credentials")
      dispatch({ type: "LOGIN_FAILURE", payload: err.response });
    }
  };

  // console.log(user);
  return (
    <div className="login">
      <div className="lContainer">
        <h2>Login</h2>
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
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {/* <a href="/register">Register</a> */}
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
