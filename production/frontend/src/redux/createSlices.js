import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseURL";




// export const createpostAction = createAsyncThunk(
//     "post/created",
//     async (post, { rejectWithValue, getState, dispatch }) => {
//       // console.log(post);
//       //get user token
//       const user = getState()?.users;
//       const { userAuth } = user;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userAuth?.token}`,
//         },
//       };
//       try {
//         //http call
//         const formData = new FormData();
//         formData.append("title", post?.title);
//         formData.append("description", post?.description);
//         formData.append("category", post?.category);
//         formData.append("image", post?.image);
  
//         const { data } = await axios.post(
//           `${baseUrl}/api/posts`,
//           formData,
//           config
//         );
//         //dispatch action
//         dispatch(resetPost());
//         return data;
//       } catch (error) {
//         if (!error?.response) throw error;
//         return rejectWithValue(error?.response?.data);
//       }
//     }
//   );