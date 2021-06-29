import React from "react";

import FileBase from "react-file-base64";

const FileBase64 = ({ data, setData }) => {
  return (
    <div className="input-img">
      <FileBase
        type="file"
        required
        multiple={false}
        value={data.data}
        onDone={({ base64 }) => setData({ ...data, data: base64 })}
      />
      {data.data && data.data.length > 0 && <img src={data.data} alt="" />}
    </div>
  );
};

export default FileBase64;
