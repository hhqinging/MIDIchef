// import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import "../screens-css/CreateScreen.css";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from "react-dropzone"
import Alert from '@mui/material/Alert';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
border-color:'red'
  transition: border 0.24s ease-in-out;
`;

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  image: Yup.string().required("Track cover is required"),
  track: Yup.string().required("Track audio is required"),
  royalty: Yup.number().required("royalty is required"),
});

const CreateScreen = () => {
  // //   const params = useParams();
  // const dispatch = useDispatch();

  // //select store data
  // const create = useSelector(state => state?.create);
  // const { isCreated, loading, appErr, serverErr } = create;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      image: "",
      track: "",
      royalty: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: formSchema,
  });


  const initialValues = {
    title: '',
    description: '',
    price: 0,
    music: null,
    royalty: 0
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
    e.preventDefault()
    // console.log("nft:", nft)
    // console.log("cover:", imageCover)
    const formData = new FormData()
    formData.append('music', nft.music)
    formData.append('title', nft.title)
    formData.append('description', nft.description)
    formData.append('price', nft.price)
    formData.append('royalty', nft.royalty)
    formData.append('imageCover', imageCover[0])
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

  const images = imageCover.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))

  return (
    <div className="create">
      <h1 style={{ color: "white" }}>Create Your NFT Track</h1>
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



export default CreateScreen;
