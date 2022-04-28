import { integerPropType } from "@mui/utils";
import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    assetID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    owner: { type: String, required: true },
    creator: { type: String, required: true },
    description: { type: String, required: true },
    marketStatus: { type: String, required: true },
    numFavorite: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    img_src: { type: String, required: true },
    src: { type: String, required: true },
    numPlay: { type: String, required: true },
    numDay: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Track = mongoose.model("Track", trackSchema);
export default Track;
