import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import "../screens-css/updateProfile.css";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    description: "",
  };

  let [nft, setNft] = useState(initialValues);
  const [imageCover, setImageCover] = useState([]);

  let onFileChange = (e) => {
    e.preventDefault();
    setNft({
      ...nft,
      music: e.target.files[0],
    });
  };
  let handleChange = (e) => {
    const value = e.target.value;
    setNft({
      ...nft,
      [e.target.name]: value,
    });
  };
  let onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    let creator = localStorage.getItem("myalgo-wallet-addresses");
    if (!creator) {
      alert("Login first to change profile");
      return;
    }
    formData.append("walletAddr", creator);
    formData.append("userName", nft.userName);
    formData.append("description", nft.description);
    formData.append("imageCover", imageCover[0]);
    axios
      .post("http://47.252.29.19:8000/api/user/setting", formData, {})
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          alert("Profile info has been updated.");
          navigate("/profile");
        } else {
          console.log(res.status);
          alert("can not success to create!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("can not success to create!");
      });
  };

  //URL for image
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImageCover(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  //embedding image file, set width
  const images = imageCover.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ));

  return (
    <div className="update-container">
      <h1>Update User Profile</h1>
      <form onSubmit={onSubmit}>
        <label>Username</label>
        <input
          placeholder="Enter new username "
          value={nft.userName}
          name="userName"
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          placeholder="Enter new description"
          value={nft.description}
          name="description"
          onChange={handleChange}
          style={{ height: "100px" }}
        />
        <label>Background Image</label>
        <div id="image-container">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop image file here{images}</p>
          </div>
        </div>
        <button>Cancel</button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
