// import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  image: Yup.string().required("Image cover is required"),
  track: Yup.string().required("Track audio is required"),
  royalty: Yup.number().required("royalty is required"),
});

function CreateScreen() {
  // //   const params = useParams();
  // const dispatch = useDispatch();

  // //select store data
  // const create = useSelector(state => state?.create);
  // const { isCreated, loading, appErr, serverErr } = create;

  // const formik = useFormik({
  //   initialValues: {
  //     title: "",
  //     description: "",
  //     price:"",
  //     image: "",
  //     track:"",
  //     royalty:""
  //   },
  //   onSubmit: values => {
  //     //dispath the action
  //     const data = {
  //       title: values?.title,
  //       description: values?.description,
  //       price: values?.price,
  //       image: values?.image,
  //       track:values?.track,
  //       royalty:values?.royalty
  //     };
  //     // dispatch(createpostAction(data));
  //   },
  //   validationSchema: formSchema,
  // });

  return (
    <div className="create">
      <h1 style={{ color: "white" }}>Create Your NFT Track</h1>
      <form>
        <label>Title</label>
        <input placeholder="Title" />
        <label>Description</label>
        <textarea placeholder="Description" />
        <label>Price</label>
        <input placeholder="price" />
        <label>Image cover</label>
        <input placeholder="image" />
        <label>Track audio</label>
        <input placeholder="Track audio" />
        <label>Royalty</label>
        <input placeholder="Royalty" />
        <button>Cancel</button>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default CreateScreen;
