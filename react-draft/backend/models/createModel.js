import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assetID: { type: String, required: true },
  owner: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  numFavorite: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  img_src: { type: String, required: true },
  src: { type: String, required: true },
  numPlay: { type: String, required: true },
  numDay: { type: String, required: true },
});
