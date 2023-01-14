import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [token,setToken]=useState("");
  useEffect(()=>{
    const loggedin=localStorage.getItem("token");
    if(loggedin)
    {
      navigate('/doctors');
    }
    setToken(loggedin);
  },[]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${getBaseUrl()}/api/doctor/login`, { email, password })
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
    <div>
      <h1>Doctor Login</h1>
      <form id="form" onSubmit={handleSubmit}>
        Email
        <input
          id="input"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        Password
        <input
          id="input"
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" value="Submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;
