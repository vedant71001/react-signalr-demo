import { useState } from "react";
import fileService from "../../services/files.services";
import { UploadedFilesProp } from "../../utils/props.type";
import { FileCard } from "../FileCard/FileCard";
import "./UploadedFiles.css";

export const UploadedFiles = (props: UploadedFilesProp) => {

    const [isValueChanged,setIsValueChanged] = useState(false);

    const deleteFileHandler = (userFileId: number) => {
        console.log(userFileId)
        fileService.DeleteFile(userFileId).then((res)=>{
          if(res){
            let deletedFileIndex = props.files.findIndex(file => file.userFilesId === userFileId);
            props.files.splice(deletedFileIndex,1)
            setIsValueChanged(!isValueChanged);
          }
        })
      }
  return (
    <div className="files-list">
      <h3>Uploaded Files</h3>
      {props.files.map((file) => (
        <FileCard
          key={file.userFilesId}
          userFilesId={file.userFilesId}
          userId={file.userId}
          fileName={file.fileName}
          filePath={file.filePath}
          isDeleted={file.isDeleted}
          uploadedAt={file.uploadedAt}
          onDelete={deleteFileHandler}
        />
      ))}
    </div>
  );
};
