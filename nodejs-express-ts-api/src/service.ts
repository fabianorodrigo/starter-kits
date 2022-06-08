import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {APIResponse, ServerError} from "./model";

export default async function getData<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> {
  try {
    const {data} = await axios.get<T>(url, config);
    return {success: true, message: "", result: data};
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const serverError = e as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          message: serverError.response.data.error,
        } as APIResponse<T>;
      }
    }
    return {success: false, message: "something went wrong!"} as APIResponse<T>;
  }
}
