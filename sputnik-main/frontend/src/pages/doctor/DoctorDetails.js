import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils/index";

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState({});
  const { doctorId } = useParams();
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [token,setToken]=useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    const loggedin=localStorage.getItem("token");
    if(!loggedin)
    {
      navigate('/patient/login');
    }
    setToken(loggedin);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${getBaseUrl()}/api/appointment`, {
      doctorId,
      date,
      description,
    },{headers:{
      'x-auth-token':token
    }});
    navigate("/appointments");
  };

  useEffect(() => {
    axios.get(`${getBaseUrl()}/api/doctor/` + doctorId).then((res) => {
      setDoctors(res.data);
    });
  }, [doctorId]);
  
  return (
    <div>
      <h2>Details of {doctors.name} </h2>
      <div key={doctors.name}>
        <p><h4 style={{display:'inline-block'}}>Email:</h4> <a href = {`mailto:${doctors.email}`}>{doctors.email}</a> </p>
        <p><h4 style={{display:'inline-block'}}>Specialization:</h4> {doctors.specialization}</p>
      </div>
      <br />
      <h3>Create Appointments</h3>
      <form onSubmit={handleSubmit}>
        <label>Preferred date:</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => {
            setDate(e.target.value.toString());
          }}
        >
        </input>
        <label>Description:</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button type="submit" value="Submit">
          Book
        </button>
      </form>
    </div>
  );
};

export default DoctorDetails;
