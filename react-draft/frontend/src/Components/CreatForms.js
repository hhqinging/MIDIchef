import React from 'react';
import Forms from './Forms';
const CreateForm = () => {
  return (
    <div>
      <div>Create Your NFT track</div>
      <Forms />
      <button type="reset">Cancel</button>
      <button type="submit">Create</button>
    </div>
  );
};

export default CreateForm;
