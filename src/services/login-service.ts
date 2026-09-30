import type { LoginFormData, loginResponse } from "../types/login";
import { api } from "./api";

export const LoginApi=async(LoginData: LoginFormData):Promise<loginResponse>=>{
    return api('/auth/login',"POST",LoginData)
}