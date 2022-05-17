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
import buffer from 'buffer';
const {Buffer} = buffer;

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
  let onSubmit = async (e) => {
    let btn = document.getElementById("onSubmit");
    btn.disabled=true;
    let creator = localStorage.getItem('myalgo-wallet-addresses');
    if(!creator) {
      alert("Login first to create NFT");
      return;
    }

    e.preventDefault()
    // Create NFT
    let txID = await createNFT(creator, nft.title);
    console.log("txID", txID);
    const formData = new FormData()
    formData.append('walletAddr', creator)
    formData.append('music', nft.music)
    formData.append('title', nft.title)
    formData.append('description', nft.description)
    formData.append('price', nft.price)
    formData.append('royalty', nft.royalty)
    formData.append('imageCover', imageCover[0])
    formData.append('txID', txID)
    await axios.post("http://47.252.29.19:8000/api/upload", formData, {
    }).then(res => {
      console.log(res.status)
      if (res.status === 200) {
        alert("NFT successfully created");
      }})
      .catch(err => {
        console.log(err)
        alert("Create failed! Server busy, please try again later.");
      })
      btn.disabled=false;
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

  const createNFT = async (creator, assetName) => {
    if (!window.Buffer) window.Buffer = Buffer;
    const algodClient = new algosdk.Algodv2('', 
    'https://node.testnet.algoexplorerapi.io', 
    '');
    let params = await algodClient.getTransactionParams().do();
    let defaultFrozen = false;
    let decimals = 0;
    let totalIssuance = 1;
    let unitName = "NFT"
    let note = undefined;
    let hash = undefined;

    let manager = creator;
    let freeze = creator;
    let clawback = creator;
    let reserve = creator;

    let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: creator,
      note: note,
      suggestedParams: params,
      total: totalIssuance,
      decimals: decimals,
      defaultFrozen: defaultFrozen,
      manager: manager,
      reserve: reserve,
      freeze: freeze,
      clawback: clawback,
      unitName: unitName,
      assetName: assetName,
      assetMetadataHash: hash
  });

    let myAlgoWallet = new MyAlgoConnect();
    let signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
		let response = await algodClient.sendRawTransaction(signedTxn.blob).do();
		console.log(response);
    return response;
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
        <button onClick={() => {navigate('/')}}>Cancel</button>
        <button id="onSubmit" type="submit">Submit</button>
      </form>
    </div>
  );
};



export default CreateScreen;
