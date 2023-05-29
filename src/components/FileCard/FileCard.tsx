import { UserFile } from "../../utils/props.type";
import "./FileCard.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button, Grid } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseUrl } from "../../constants/constants";
import fileService from "../../services/files.services";

export const FileCard = (
  props: UserFile & { onDelete: (userFileId: number) => void }
) => {
  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    let userFileId = Number.parseInt(event.currentTarget.id.split("_")[1]);
    props.onDelete(userFileId);
  };

  const downloadFileHandler = () => {
    fileService.DownloadFile(props.filePath).then((res) => {
      let link = document.createElement("a");
      link.href = URL.createObjectURL(res);
      link.download = props.fileName;
      document.getElementById("downloadBtn")?.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    });
  };

  const fileType = props.fileName.split(".")[1];
  return (
    <Grid container className="file-card">
      <Grid item xs={1} className="file-icon">
        {fileType === "pdf" && <PictureAsPdfIcon />}
        {(fileType === "png" || fileType === "jpg") && <ImageIcon />}
        {!["pdf", "png", "jpg"].includes(fileType) && <DescriptionIcon />}
      </Grid>
      <Grid item xs={8}>
        {props.fileName}
      </Grid>
      <Grid item xs={2} className="d-flex">
        <div id="downloadBtn"></div>
        <Button
          variant="contained"
          color="warning"
          className="m-2"
          onClick={downloadFileHandler}
        >
          <DownloadIcon />
        </Button>
        <Button
          variant="contained"
          color="error"
          className="m-2"
          id={`file_${props.userFilesId}`}
          onClick={deleteHandler}
        >
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
