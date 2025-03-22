import { NextRequest, NextResponse } from "next/server";
import { apiGET } from "@/lib/apiHelper";


interface RouteParams {
    params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const apiUrl = `https://api.petfinder.com/v2/animals/${id}`;
        const data = await apiGET(req, apiUrl).then((res: any) => res.json());

        const animal = data.animal;
        return NextResponse.json({
            id: animal.id,
            name: animal.name,
            age: animal.age,
            gender: animal.gender,
            breed: animal.breeds.primary,
            coat: animal.coat,
            size: animal.size,
            photo: animal.photos.length > 0 ? animal.photos[0].full : null,
            house_trained: animal.attributes.house_trained,
            tags: animal.tags,
            environment: {
                children: animal.environment.children,
                dogs: animal.environment.dogs,
                cats: animal.environment.cats,
            },
            description: animal.description,
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

