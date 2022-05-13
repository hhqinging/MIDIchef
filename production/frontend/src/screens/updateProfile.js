// import { useParams } from "react-router-dom";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
import "../screens-css/updateProfile.css";
// import styled from "styled-components";
// import Dropzone from "react-dropzone";
import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from "react-dropzone"
// import Alert from '@mui/material/Alert';

// const Container = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   // padding: 20px;
//   border-width: 2px;
//   border-radius: 2px;
//   border-style: dashed;
//   background-color: #fafafa;
//   color: #bdbdbd;
// border-color:'red'
//   transition: border 0.24s ease-in-out;
// `;

// const formSchema = Yup.object({
//   userName:     Yup.string().required("Username is required"),
//   description:  Yup.string().required("Description is required"),
//   image:        Yup.string().required("Track cover is required"),
// });

const UpdateProfile = () => {
//   const formik = useFormik({
//     initialValues: {
//       userName: "",
//       description: "",
//       image: "",
//     },
//     onSubmit: (values) => {
//       console.log(values);
//     },
//     validationSchema: formSchema,
//   });

  const initialValues = {
    userName: '',
    description: ''
  };

  let [nft, setNft] = useState(initialValues);
  const [imageCover, setImageCover] = useState([])

  let onFileChange = (e) => {
    e.preventDefault();
    // console.log("e.target:", e.target.files)
    setNft({
      ...nft,
      music: e.target.files[0]
    })
  }
  let handleChange = (e) => {
    const value = e.target.value;
    setNft({
      ...nft,
      [e.target.name]: value
    });
  }
  let onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userName', nft.title);
    formData.append('description', nft.description);
    formData.append('imageCover', imageCover[0]);
    axios.post("http://localhost:8000/api/upload", formData, {
    }).then(res => {
      console.log(res.status)
      if (res.status == 200) {
        alert("create success!")
      } else {
        console.log(res.status)
        alert("can not success to create!")
      }

    })
      .catch(err => {
        console.log(err)
        alert("can not success to create!")
      })
  }

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
      )
    }
  })

  //embedding image file, set width 
  const images = imageCover.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))

  return (
    <div className="update-container">
      <h1 style={{ color: "white" }}>Update User Profile</h1>
      <form onSubmit={onSubmit}>
        <label>Title</label>
        <input
          // value={formik.values.title}
          // onChange={formik.handleChange("title")}
          // onBlur={formik.handleBlur("title")}
          placeholder="NFT track title"
          value={nft.title}
          name="title"
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          placeholder="Brifly describe the NFT track"
          value={nft.description}
          name="description"
          // onChange={(e) => setNft({ description: e.target.value })}
          onChange={handleChange}
          style={{ height: "100px" }}
        />
        <label>Price</label>
        <input
          placeholder="price"
          value={nft.price}
          name="price"
          // onChange={(e) => setNft({ price: e.target.value })}
          onChange={handleChange}
        />

        <label>Image cover</label>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p style={{ color: "white" }}>Drop files here</p>
        </div>
        <div>{images}</div>

        <label>Track audio</label>
        <input type="file"
          placeholder="Track audio"
          name="music"
          // onChange={(e) => setNft({ music: e.target.files[0] })}
          onChange={onFileChange}
        />
        <label>Royalty</label>
        <input placeholder="Royalty"
          value={nft.royalty}
          name="royalty"
          // onChange={(e) => setNft({ royalty: e.target.value })} 
          onChange={handleChange}
        />
        <button>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
