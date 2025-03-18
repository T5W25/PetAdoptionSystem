import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = "https://api.petfinder.com/v2/animals";
  const tokenUrl = "https://api.petfinder.com/v2/oauth2/token";
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  // check if there is no valid key  
  if (!apiKey || !apiSecret) {
    return NextResponse.json(
        { error: "API key or secret is missing" },
        { status: 400 }
    );
  }

  try {
    // get access token  
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: apiSecret,
      }),
    });

    if (!tokenResponse.ok) {
      return NextResponse.json(
          { error: "Failed to fetch access token" },
          { status: tokenResponse.status }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // invoke api  
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
          { error: "Failed to fetch data" },
          { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}