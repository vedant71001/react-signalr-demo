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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const FileCard = (
  props: UserFile & { onDelete: (userFileId: number) => void }
) => {
  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    let userFileId = Number.parseInt(event.currentTarget.id.split("_")[1]);
    props.onDelete(userFileId);
  };
  const fileType = props.fileName.split(".")[1];

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

  const filePreviewHandler = () => {
    fileService.DownloadFile(props.filePath).then((res) => {
      let link = document.createElement("a");
      link.href = URL.createObjectURL(res);
      link.target = "_blank";
      document.getElementById("downloadBtn")?.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    });
  };

  return (
    <Grid container className="file-card">
      <Grid item xs={1} className="file-icon">
        {fileType === "pdf" && <PictureAsPdfIcon />}
        {(fileType === "png" || fileType === "jpg") && <ImageIcon />}
        {!["pdf", "png", "jpg"].includes(fileType) && <DescriptionIcon />}
      </Grid>
      <Grid item xs={7}>
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
          {["pdf", "png", "jpg"].includes(fileType) && (
            <Button
              variant="contained"
              className="m-2"
              onClick={filePreviewHandler}
            >
              <RemoveRedEyeIcon />
            </Button>
          )}
      </Grid>
    </Grid>
  );
};
