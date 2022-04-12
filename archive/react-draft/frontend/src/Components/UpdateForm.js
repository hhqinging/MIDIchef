import React from "react";
import Forms from "../Forms";
const UpdateForm = () => {
  return (
    <div>
      <div>Update price and post your collected track</div>
      <Forms />
      <button type="reset">Cancel</button>
      <button type="submit">Post</button>
    </div>
  );
};

export default UpdateForm;
