import React from "react";
import Forms from "../Forms";
const SaveForm = () => {
  return (
    <div>
      <div>Save your MIDIchef track</div>
      <Forms />
      <button type="reset">Cancel</button>
      <button type="submit">Save</button>
    </div>
  );
};

export default SaveForm;
