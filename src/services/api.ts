import { DUMMY_BASE_URL } from "../constants"

export const api=async(url:string ,method:string="GET", body?:unknown)=>{
    const response=await fetch(`${DUMMY_BASE_URL}${url}`,{
        method,
        headers: {
            "Content-Type": "application/json",
        },
         body: body ? JSON.stringify(body) : undefined,
    })
    if (!response.ok) {
        throw new Error("Request failed");
    }
    const data=await response.json()
        return data;
}

