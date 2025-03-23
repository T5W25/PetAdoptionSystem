'use client';

import { useParams, useRouter } from "next/navigation";
import Card from "./components/Card/Card";
import "./styles.css";
import { Fragment, useEffect, useState } from "react";

interface Pet {
    id: string;
    name: string;
    age: string;
    gender: string;
    breed: string;
    coat: string;
    size: string;
    photo: string | null;
    house_trained: boolean;
    tags: string[];
    environment: {
        children: boolean | null;
        dogs: boolean | null;
        cats: boolean | null;
    };
    description: string;
}

type SaveFavoritePetRequest = {
    userId: number;
    petId: number;
};

const PageDetails: React.FC = () => {
    const params = useParams();
    const id = params?.id ?? ""; // Ensure id is always a string
    const router = useRouter();
    const [pet, setPet] = useState<Pet | undefined>(undefined);

    useEffect(() => {
        if (!id) return; // Early return if no ID

        fetch(`/api/pet-list/${id}`)
            .then((res) => res.json())
            .then((data) => setPet(data));
    }, [id]);

    if (!id) {
        return <div>Missing ID</div>;
    }

    // Process adoption
    const handleAdopt = () => {
        if (!pet) {
            alert("Pet data is missing.");
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User ID not found. Please log in first.");
            return;
        }

        const requestData = {
            userId: parseInt(userId, 10),
            petId: parseInt(userId, 10),
        };

        console.log(`Adopting ${pet.name} with request:`, requestData);

        fetch(`/api/adopt/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    if (data.error.includes("already exists")) {
                        alert(`You have already adopted ${pet.name}.`);
                    } else {
                        alert(`Failed to adopt ${pet.name}: ${data.error}`);
                    }
                } else {
                    alert(`Adoption process started for ${pet.name}! 🎉`);
                }
            })
            .catch((error) => {
                console.error("Error adopting pet:", error);
                alert("An error occurred while starting the adoption process.");
            });
    };

    // Process save to favorite
    const handleFavorite = () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User ID not found. Please log in first.");
            return;
        }

        const requestData: SaveFavoritePetRequest = {
            userId: parseInt(userId, 10),
            petId: parseInt(userId, 10),
        };

        console.log(`Favoriting ${pet?.name} with request:`, requestData);

        fetch(`/api/favorite/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        }).then((res) => {
            if (!res.ok) {
                alert(`Successfully added ${pet?.name} to favorites!`);
            } else {
                alert(`Failed to add ${pet?.name} to favorites.`);
            }
        }).catch((error) => {
            console.error("Error favoriting pet:", error);
            alert("An error occurred while adding to favorites.");
        });
    };

    return (
        <div className="pet-details">
            <Card className="pet-image__card">
                {pet?.photo && <img src={pet.photo} alt={`${pet?.name}_${pet?.id}`} />}
            </Card>

            <div className="pet-details__info">
                <Card className="pet-details__about">
                    <h1>{pet?.name}</h1>
                    <hr />
                    <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                        {`${pet?.age ? pet.age + " -" : ""} 
                        ${pet?.gender ? pet.gender + " -" : ""}
                        ${pet?.size || ""}`}
                    </p>
                    <hr />
                    <h1>About</h1>
                    {pet?.tags && pet.tags.length > 0 && (
                        <Fragment>
                            <h3>Characteristics</h3>
                            <p>{pet.tags.join(", ")}</p>
                            <br />
                        </Fragment>
                    )}
                    {pet?.coat && (
                        <Fragment>
                            <h3>COAT LENGTH</h3>
                            <p>{pet.coat}</p>
                            <br />
                        </Fragment>
                    )}
                    {pet?.house_trained !== undefined && (
                        <Fragment>
                            <h3>HOUSE-TRAINED</h3>
                            <p>{pet.house_trained ? "Yes" : "No"}</p>
                            <br />
                        </Fragment>
                    )}
                </Card>
                <Card className="pet-details__description">
                    <h1>{`Meet ${pet?.name || ""}`}</h1>
                    <p>{pet?.description || ""}</p>
                </Card>
            </div>

            <Card className="pet-adoption__card">
                <div className="pet-adoption__card__content">
                    <p>{`Considering ${pet?.name || ""} for adoption?`}</p>
                    {id && (
                        <button onClick={() => router.push(`/adoption/${id}`)}>
                            START YOUR INQUIRY
                        </button>
                    )}
                </div>

                <div className="pet-adoption__card__buttons">
                    <button onClick={handleAdopt}>ADOPTION</button>
                    <button onClick={handleFavorite}>FAVORITE</button>
                </div>
            </Card>
        </div>
    );
};

export default PageDetails;
