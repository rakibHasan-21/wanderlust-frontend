import { headers } from "next/headers"
import { auth } from "./auth"

export default async function TokenServer(){
      const jwtToken = await auth.api.getToken({
        headers: await headers()
      })
      const token = jwtToken?.token
      return token
} 