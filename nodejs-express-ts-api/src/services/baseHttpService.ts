import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {APIResponse, IServerError} from "../model";

export class BaseHttpService {
  constructor(private baseUrl: string) {}

  async getData<T>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const {data} = await axios.get<T>(this.baseUrl.concat(path), config);
      return {success: true, message: "", result: data};
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const serverError = e as AxiosError<IServerError>;
        if (serverError && serverError.response) {
          return {
            success: false,
            message: serverError.response.data.message,
          } as APIResponse<T>;
        }
      }
      return {
        success: false,
        message: "something went wrong!",
      } as APIResponse<T>;
    }
  }
}
