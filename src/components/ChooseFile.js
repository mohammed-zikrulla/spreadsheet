import React, { useState } from "react";
import { read, utils } from "xlsx";
import Display from "./Display";
import "./ChooseFile.css";

function ChooseFile() {
  const [fileName, setFileName] = useState("Browse xlsx file ");
  const [jsonData, setJsonData] = useState([]);

  // uploading xlsx file to parse into json data
  const chooseFile = async (e) => {
    e.preventDefault();
    const realFile = e.target.files[0];
    setFileName(realFile.name);

    const data = await realFile.arrayBuffer();
    const workbook = read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);
    setJsonData(jsonData);
  };

  return (
    <div className="main-container">
      <h1>choose files to Edit</h1>
      <div className="input-container">
        <div className="input-group">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile04"
              onChange={(e) => chooseFile(e)}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile04">
              {fileName}
            </label>
          </div>
        </div>
      </div>

      <Display jsonData={jsonData} />
    </div>
  );
}

export default ChooseFile;
