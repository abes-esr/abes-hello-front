import http from "./config";
import { ApiResponse } from "@/axios/ApiResponse";
import { AxiosResponse } from "axios";
import { User } from "@/store/user/types";

export abstract class AxiosRequest {

  public static async getPublicMessage(): Promise<ApiResponse> {
    return await http.get<ApiResponse>('/');

  }

  public static async getPrivateMessage(token: string): Promise<ApiResponse> {

    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }
    return await http.get<ApiResponse>('/secured', config);

  }

  public static async doLogin(user: any): Promise<AxiosResponse<User>> {
    return await http.post<User>('/login', user);
  }

  public static async doRegister(user: any): Promise<AxiosResponse<User>> {
    return await http.post<User>('/register', user);
  }

}
