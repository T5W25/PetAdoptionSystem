import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = "https://api.petfinder.com/v2/animals";
  const accessToken = process.env.ACCESS_TOKEN; 

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
