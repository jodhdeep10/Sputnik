import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    const loggedin = localStorage.getItem("token");
    setToken(loggedin);
  }, [refresh]);

  const loginHandler = () => {
    navigate("/doctor/login");
  };

  const signupHandler = () => {
    navigate("/doctor/signup");
  };

  const signoutHandler = () => {
    localStorage.removeItem("token");
    setRefresh({});
  };

  return (
    <div>
      <h1>For Doctors</h1>
      {/* {!token && <button onClick={loginHandler}>Log in</button>}
      {!token && <button onClick={signupHandler}>Signup</button>}
      {token && <button onClick={signoutHandler}>Signout</button>} */}
      <h3>We are currently not accepting registrations through the site. You can, however, reach out to us if you want to register as a doctor.</h3>
    </div>
  );
};

export default Doctors;
