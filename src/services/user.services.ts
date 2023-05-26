import { LoginModel } from "../models/LoginModel";
import { UserModel } from "../models/UserModel";
import { request } from "./request";

class UserService {
  ENDPOINT = "/api/User";

  public async Login(param: LoginModel) {
    const url = `${this.ENDPOINT}/Login`;
    return request
      .post(url, param)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async Register(param: UserModel) {
    const url = `${this.ENDPOINT}/Register`;
    return request
      .post(url, param)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

export const userService = new UserService();
