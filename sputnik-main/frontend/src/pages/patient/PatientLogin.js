import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils/index";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [token,setToken]=useState("");
  useEffect(()=>{
    const loggedin=localStorage.getItem("token");
    if(loggedin)
    {
      navigate('/');
    }
    setToken(loggedin);
  },[]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${getBaseUrl()}/api/patient/login`, { email, password })
      .then((res) => {
        console.log(res.data);
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/",{ replace: true });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div className="login-signup">
      <h1>Patient Login</h1>
      <form id="form" onSubmit={handleSubmit}>
        Email:
        <input
          id="input"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        Password:
        <input
          id="input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit" value="Submit">
          Login
        </button>
        <button onClick={() => {navigate("/patient/signup")}}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default PatientLogin;
