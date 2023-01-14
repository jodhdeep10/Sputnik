import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils";

const UploadFiles = () => {
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState();
  const [token, setToken] = useState("");
  const [file, setFile] = useState();
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const navigate = useNavigate();

  const [patient, setPatient] = useState({});

  useEffect(() => {
    const loggedin = localStorage.getItem("token");
    setToken(loggedin);
    console.log(loggedin);
    axios
      .get(`${getBaseUrl()}/api/patient`, {
        headers: {
          "x-auth-token": loggedin,
        },
      })
      .then((result) => {
        setPatient(result.data);
        console.log(result.data);
      });
  }, [refresh]);

  useEffect(() => {
    const loggedin = localStorage.getItem("token");
    if (!loggedin) {
      navigate("/patient/login");
    }
    setToken(loggedin);
    console.log(token);
  }, []);

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      console.log({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (
      pics.type === "application/pdf" ||
      pics.type === "image/png" ||
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dx9koz9ke");
      fetch("https://api.cloudinary.com/v1_1/dx9koz9ke/auto/upload", {
        method: "post",
        mode: "cors",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      console.log({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(
        `${getBaseUrl()}/api/patient`,
        { name, pic },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
      setPic("");
      setName("");
      setFile("");
  };
  return (
    <div>
      <h1>My files</h1>
      <img src={pic} alt="" />
      {token && 
        (<div key={patient._id}>
          {patient.files &&
            patient.files.map((file) => (
              <div className="card">
              <a href={`${file.pic}`}>
                <p><h4 style={{display:'inline-block'}}>Filename:</h4> {file.name}</p>
                <img src={file.pic} alt="" />
              </a>
              </div>
            ))}
        </div>)
      }
      <h3>Upload more:</h3>
      <form id="form" onSubmit={handleSubmit}>
        Filename:
        <input
          id="input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        File:
        <input
          id="input"
          type="file"
          value={file}
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
        <button type="submit" value="Submit">
          Upload
        </button>
      </form>
      <br /><br /><br />
    </div>
  );
};

export default UploadFiles;
