import { NextRequest, NextResponse } from "next/server";

export async function apiGET(req: NextRequest, endpoint: string, params?: Record<string, string>): Promise<NextResponse> {

    try {

        //this will get the Authorization
        const auth = req.headers.get("Authorization")

        //this will check if the accesstoken is still null
        if (!auth) {
            return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
        }

        //this will check if there is a params and append it to the endpoint
        const url = `${endpoint}${params ? new URLSearchParams(params) : ""}`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: auth,
                "Content-Type": "application/json",
            },
        })

        //this will check if the response is not ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch data" }, { status: response.status })
        }

        //this will parse the response to json
        const data = await response.json()

        //this will return the data
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function apiPOST(req: NextRequest, endpoint: string, body: Record<string, string>): Promise<NextResponse> {

    try {
        //this will get the Authorization
        const auth = req.headers.get("Authorization")

        //this will check if the accesstoken is still null
        if (!auth) {
            return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
        }

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: auth,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        //this will check if the response is not ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to post data" }, { status: response.status })
        }

        //this will parse the response to json
        const data = await response.json()

        //this will return the data
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function apiDELETE(req: NextRequest, endpoint: string): Promise<NextResponse> {

    try {
        //this will get the Authorization
        const auth = req.headers.get("Authorization")

        //this will check if the accesstoken is still null
        if (!auth) {
            return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
        }

        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                Authorization: auth,
                "Content-Type": "application/json",
            },
        })

        //this will check if the response is not ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to delete data" }, { status: response.status })
        }

        //this will parse the response to json
        const data = await response.json()

        //this will return the data
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function apiPUT(req: NextRequest, endpoint: string, body: Record<string, string>, params?: Record<string, string>): Promise<NextResponse> {

    try {
        //this will get the Authorization
        const auth = req.headers.get("Authorization")

        //this will check if the accesstoken is still null
        if (!auth) {
            return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
        }

        //this will check if there is a params and append it to the endpoint
        const url = `${endpoint}${params ? new URLSearchParams(params) : ""}`

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: auth,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        //this will check if the response is not ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to put data" }, { status: response.status })
        }

        //this will parse the response to json
        const data = await response.json()

        //this will return the data
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function apiPATCH(req: NextRequest, endpoint: string, body: Record<string, string>, params?: Record<string, string>): Promise<NextResponse> {
    try {
        //this will get the Authorization
        const auth = req.headers.get("Authorization")

        //this will check if the accesstoken is still null
        if (!auth) {
            return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
        }

        //this will check if there is a params and append it to the endpoint
        const url = `${endpoint}${params ? new URLSearchParams(params) : ""}`

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                Authorization: auth,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        //this will check if the response is not ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to patch data" }, { status: response.status })
        }

        //this will parse the response to json
        const data = await response.json()

        //this will return the data
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function apiHEAD(req: NextRequest, endpoint: string, params?: Record<string, string>): Promise<NextResponse> {
    try {
        //this will get the Authorization
        const auth = req.headers.get("Authorization")

        //this will check if the accesstoken is still null
        if (!auth) {
            return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
        }

        //this will check if there is a params and append it to the endpoint
        const url = `${endpoint}${params ? new URLSearchParams(params) : ""}`

        const response = await fetch(url, {
            method: "HEAD",
            headers: {
                Authorization: auth,
                "Content-Type": "application/json",
            },
        })

        //this will check if the response is not ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to head data" }, { status: response.status })
        }

        //this will parse the response to json
        const data = await response.json()

        //this will return the data
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function apiOPTIONS(req: NextRequest, endpoint: string, params?: Record<string, string>): Promise<NextResponse> {
    try {
        //this will get the Authorization
        const auth = req.headers.get("Authorization")

        //this will check if the accesstoken is still null
        if (!auth) {
            return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
        }

        //this will check if there is a params and append it to the endpoint
        const url = `${endpoint}${params ? new URLSearchParams(params) : ""}`

        const response = await fetch(url, {
            method: "OPTIONS",
            headers: {
                Authorization: auth,
                "Content-Type": "application/json",
            },
        })

        //this will check if the response is not ok
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to options data" }, { status: response.status })
        }

        //this will parse the response to json
        const data = await response.json()

        //this will return the data
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
