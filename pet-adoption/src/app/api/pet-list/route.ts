import { apiGET } from "@/lib/apiHelper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiUrl = "https://api.petfinder.com/v2/animals";

  try {

    //this will wait the response from the apiGET function and parse it to json
    const data = await apiGET(req, apiUrl).then((res: any) => res.json());

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}