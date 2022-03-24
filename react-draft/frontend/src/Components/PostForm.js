import React from "react";
import Forms from "../Forms";
const PostForm = () => {
  return (
    <div>
      <div>Post your MIDIchef track</div>
      <Forms />
      <button type="reset">Cancel</button>
      <button type="submit">Post</button>
    </div>
  );
};

export default PostForm;
