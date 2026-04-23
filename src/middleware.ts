import { NextRequest } from "next/server"

const PUBLIC_ROUTE = ["/"]
const PUBLIC_APIS = ["/api/auth"]

export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl
  console.log(pathname);


}