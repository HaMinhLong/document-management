import React from "react";

import FileBase from "react-file-base64";

const FileBase64 = ({ data, setData }) => {
  return (
    <div className="input-img">
      <FileBase
        type="file"
        required
        multiple={false}
        value={data.image}
        onDone={({ base64 }) => setData({ ...data, image: base64 })}
      />
      {data.image && data.image.length > 0 && <img src={data.image} alt="" />}
    </div>
  );
};

export default FileBase64;
