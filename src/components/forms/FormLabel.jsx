import React from "react";

const FormLabel = ({ labelFor, labelName }) => {
  return (
    <div>
      <div className="px-4 ">
        <label for={labelFor}>{labelName}</label>
      </div>
    </div>
  );
};

export default FormLabel;
