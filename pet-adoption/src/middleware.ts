import { NextRequest, NextResponse } from "next/server";

let accessToken: string | null = null;
let tokenExpiration: number = 1;

export async function middleware(req: NextRequest) {

    if (!accessToken || Date.now() > tokenExpiration) {
        //this will get a new token when access token is null or expired
        await getAccessToken();
    }

    //this will check if the accesstoken is still null
    if (!accessToken) {
        return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
    }

    console.log("MIDDLEWARE ACTIVE")
    //this will clone the headers and set the Authorization header
    const headers = new Headers(req.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);

    //this will return the next response with the new headers
    return NextResponse.next({ headers });
}

export const config = {
    matcher: ["/api/:path*", "/lib/apiHelper.ts"],
}


async function getAccessToken() {
    try {
        //this will get the api key and secret from the environment variables
        const apiKey = process.env.API_KEY;
        const apiSecret = process.env.API_SECRET;

        //this will check if the api key or secret is missing
        if (!apiKey || !apiSecret) {
            return NextResponse.json({ error: "API key or secret is missing" }, { status: 400 });
        }

        //this will fetch the access token from the petfinder api
        const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
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

        //this will check if the response is not ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch access token" }, { status: response.status });
        }

        //this will parse the response and set the access token and expiration
        const data = await response.json();
        accessToken = data.access_token;
        tokenExpiration = Date.now() + data.expires_in * 1000;
        console.log("Access Token", accessToken);
        console.log("NEW TOKEN GENERATED");

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    //this will continue to the next action
    return NextResponse.next();
}