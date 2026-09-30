
import type { productResponse } from "../types/product"
import { api } from "./api"

export const getProductApi= async(): Promise <productResponse>=>{
  return api("/products")
}

