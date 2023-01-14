import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils/index";

const DoctorSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${getBaseUrl()}/api/doctor/register`,{name,email,password,specialization})
      .then((res) => {
        console.log(res.data);
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate('/',{ replace: true });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <h1>Doctor Signup</h1>
      <form id="form" onSubmit={handleSubmit}>
        Name
        <input
          id="input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
        Specialization
        <input
          id="input"
          type="text"
          value={specialization}
          onChange={(e) => {
            setSpecialization(e.target.value);
          }}
        />
        <button type="submit" value="Submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default DoctorSignup;
