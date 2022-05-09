// import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import "../screens-css/CreateScreen.css";
import styled from "styled-components";
import Dropzone from "react-dropzone";

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
        <input
          value={formik.values.title}
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          placeholder="NFT track title"
        />
        <label>Description</label>
        <textarea
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          placeholder="Brifly describe the NFT track"
          style={{ height: "100px" }}
        />
        <label>Price</label>
        <input
          value={formik.values.price}
          onChange={formik.handleChange("price")}
          onBlur={formik.handleBlur("price")}
          placeholder="price"
        />
        <label>Image cover</label>
        {/* <input type="file" placeholder="image" /> */}
        <Container>
          <Dropzone
            onBlur={formik.handleBlur("image")}
            accept="image/jpeg, image/png"
            onDrop={(acceptedFiles) => {
              formik.setFieldValue("image", acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="container">
                <div
                  {...getRootProps({
                    className: "dropzone",
                    onDrop: (event) => event.stopPropagation(),
                  })}
                >
                  <input {...getInputProps()} />
                  <p style={{ color: "black" }}>Click here to select image</p>
                </div>
              </div>
            )}
          </Dropzone>
        </Container>
        <label>Track audio</label>
        <input type="file" placeholder="Track audio" />
        <label>Royalty</label>
        <input placeholder="Royalty" />
        <button>Cancel</button>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default CreateScreen;
