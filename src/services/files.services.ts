import { baseUrl } from "../constants/constants";
import { FileUploadModel } from "../models/FileUploadModel";
import { request } from "./request";

class FileService {
  ENDPOINT = "api/Files";

  public async UploadFile(param: FileUploadModel) {
    const url = `${this.ENDPOINT}/UploadFile?UserId=${param.UserId}`;
    const formData = new FormData();
    formData.append("File", param.File);
    return request
      .post(url, formData)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async GetFiles(param: number) {
    const url = `${this.ENDPOINT}/GetUserFiles?userId=${param}`;
    return request
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async DeleteFile(userFileId: number) {
    const url = `${this.ENDPOINT}/DeleteFile?userFileId=${userFileId}`;
    return request
      .post(url)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async DownloadFile(filePath: string) {
    const url = `${this.ENDPOINT}/DownloadFile?filePath=${filePath}`;

    // return fetch(baseUrl + url)
    //   .then((res) => res.blob())
    //   .then((blob) => {
    //     return URL.createObjectURL(blob);
    //   });

    return request
      .get(url, { responseType: "blob" })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

const fileService = new FileService();

export default fileService;
