import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FileUpload } from "primereact/fileupload";
const ExcelToJson = () => {
  const [jsonData, setJsonData] = useState([]);
  const handleFileUpload = (event) => {
    const file = event.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setJsonData(parsedData);
    };
    console.log(jsonData);
    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="p-4">
      <FileUpload
        mode="basic"
        accept=".xlsx, .xls"
        maxFileSize={1000000}
        chooseLabel="Upload Excel File"
        customUpload
        uploadHandler={handleFileUpload}
      />
    </div>
  );
};

export default ExcelToJson;
