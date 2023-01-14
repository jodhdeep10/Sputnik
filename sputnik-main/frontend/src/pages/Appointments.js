import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getBaseUrl } from "../utils/index";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Appointments = () => {
  const [appts, setAppts] = useState([]);
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState();
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedin = localStorage.getItem("token");
    if (!loggedin) {
      navigate("/patient/login");
    }
    setToken(loggedin);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios.get(`${getBaseUrl()}/api/doctor`).then((res) => {
      setDoctors(res.data);
    });
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/api/appointment/`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setAppts(res.data);
      });
  }, [refresh,token]);

  const clickHandler = (id) =>{
    axios.delete(`${getBaseUrl()}/api/appointment/` + id, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((res) => {
      navigate('/appointments');
      setRefresh({});
    });
  };

  return (
    <div>
      <h1>My appointments:</h1>
      {appts.map((appt) => (
        <div className="card" key={appt._id}>
          <h3>Doctor: {appt.doctorId.name}</h3>
          <p>Description: {appt.description}</p>
          <p>Date: {appt.date.slice(0,10)}</p>
          <p>Status: {appt.status}</p>
          <IconButton aria-label="delete" size="small" onClick= {()=>{clickHandler(appt._id)}}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ))}

      <h2>Book new appointments</h2>
      <h3>List of all available doctors:</h3>
      {doctors.map((doctor) => (
        <div className="card" key={doctor._id}>
          <Link to={`/appointments/create/${doctor._id}`}>
            <h3>Name: {doctor.name}</h3>
            <p>Email: {doctor.email}</p>
            <p>Specialization: {doctor.specialization}</p>
          </Link>
        </div>
      ))}

    </div>
  );
};

export default Appointments;
