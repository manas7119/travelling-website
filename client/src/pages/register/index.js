import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./index.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (name, e) => {
    setCredentials((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      console.log(res)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          value={credentials.username}
          onChange={(e) =>{
            handleChange("username", e)
          }}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          value={credentials.password}
          onChange={(e) =>{
            handleChange("password", e)
          }}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="password"
          value={credentials.email}
          onChange={(e) =>{
            handleChange("email", e)
          }}
          className="lInput"
        />
        <input
          type="text"
          placeholder="country"
          id="password"
          value={credentials.country}
          onChange={(e) =>{
            handleChange("country", e)
          }}
          className="lInput"
        />
        <input
          type="text"
          placeholder="city"
          id="password"
          value={credentials.city}
          onChange={(e) =>{
            handleChange("city", e)
          }}
          className="lInput"
        />
        <input
          type="number"
          placeholder="phone"
          id="password"
          value={credentials.phone}
          onChange={(e) =>{
            handleChange("phone", e)
          }}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
