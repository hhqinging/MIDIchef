// import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../screens-css/CreateScreen.css";
import styled from "styled-components";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone"
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";



const CreateScreen = () => {


  const initialValues = {
    title: '',
    description: '',
    price: 0,
    music: null,
    royalty: 0
  };

  let [nft, setNft] = useState(initialValues);
  const [imageCover, setImageCover] = useState([]);
  const navigate = useNavigate();

  let onFileChange = (e) => {
    e.preventDefault();
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
    let creator = localStorage.getItem('myalgo-wallet-addresses');
    if(!creator) {
      alert("Login first to create NFT");
      return;
    }

    e.preventDefault()
    const formData = new FormData()
    console.log(creator)
    formData.append('walletAddr', creator)
    formData.append('music', nft.music)
    formData.append('title', nft.title)
    formData.append('description', nft.description)
    formData.append('price', nft.price)
    formData.append('royalty', nft.royalty)
    formData.append('imageCover', imageCover[0])
    axios.post("http://47.252.29.19:8000/api/upload", formData, {
    }).then(res => {
      console.log(res.status)
      if (res.status == 200) {
        alert("create success!")
        createNFT(creator, res.assetID);
        axios.post("http://47.252.29.19:8000/api/nft/transferNFT");
      } else {
        alert("create failed! Please try again later")
      }

    })
      .catch(err => {
        console.log(err)
        alert("create failed!")
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

  const createNFT = (creator, assetID) => {
    let transferAsset = async (sender, recipient, assetID, amount, note=undefined) => {
      const myAlgoWallet = new MyAlgoConnect();
      const algodClient = new algosdk.Algodv2("", "https://node.testnet.algoexplorerapi.io", "");
      const params = await algodClient.getTransactionParams().do();

      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        to: recipient,
        assetIndex: assetID,
        amount: amount,
        note: note,
        suggestedParams: params
      })
      const signedTxn = await myAlgoWallet.signTransaction(
        txn.toByte()
      );
      const response = await algodClient
      .sendRawTransaction(signedTxn.blob)
      .do();
    }
    transferAsset(creator, creator, assetID, 0); // Opt in to asset transfer
  }

  return (
    <div className="create">
      <h1 style={{ color: "white" }}>Create Your NFT Track</h1>
      <form onSubmit={onSubmit}>
        <label>Title</label>
        <input
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
        <div id="image-container" >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p style={{ color: "white" }}>Drop files here</p>
          </div>
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
        <button onclick={navigate('/')}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};



export default CreateScreen;
