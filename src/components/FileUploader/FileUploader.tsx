import { Button } from "@mui/material";
import { useState } from "react";
import { FileUploaderProp } from "../../utils/props.type";

export const FileUploader = (props: FileUploaderProp) => {
  const [file, setFile] = useState<File>();

  const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      props.onFileUpload(file);     
    }
  };

  return (
    <div className="mt-4 mb-3">
      <form onSubmit={handleFormSubmit} className="d-flex">
        <input
          type="file"
          className="form-control me-3"
          onChange={fileUploadHandler}
        ></input>
        <Button variant="contained" type="submit">
          Upload
        </Button>
      </form>
    </div>
  );
};
