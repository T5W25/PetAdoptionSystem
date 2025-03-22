'use client';

import { useParams } from "next/navigation";
import Card from "./components/Card/Card"

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

const PageDetails: React.FC = () => {

    const { id } = useParams();
    const [pet, setPet] = useState<Pet>();

    if (!id) {
        return <div>Missing ID</div>;
    }



    useEffect(() => {
        fetch(`/api/pet-list/${id}`)
            .then((res) => res.json())
            .then((data) => setPet(data));
    }, [id]);


    return (
        <div className="pet-details">
            <Card className="pet-image__card">
                {pet?.photo && <img src={pet.photo} alt={`${pet?.name}_${pet?.id}`} />}
            </Card>

            <div className="pet-details__info">
                <Card className="pet-details__about">
                    <h1>{pet?.name}</h1>
                    <hr />
                    <p style={{ marginTop: "10px", marginBottom: "10px" }}>{`
                    ${pet?.age && pet.age + " -"} 
                    ${pet?.gender && pet.gender + " -"}
                    ${pet?.size && pet.size}
                    `}</p>
                    <hr />
                    <h1>About</h1>
                    {
                        pet?.tags && (
                            <Fragment>
                                <h3>Characteristics</h3>
                                <p>{`${pet?.tags.join(", ")}`}</p>
                                <br />
                            </Fragment>
                        )
                    }

                    {pet?.coat && (
                        <Fragment>
                            <h3>COAT LENGTH</h3>
                            <p>{`${pet?.coat}`}</p>
                            <br />
                        </Fragment>
                    )}
                    {pet?.house_trained !== undefined && (
                        <Fragment>
                            <h3>HOUSE-TRAINED</h3>
                            <p>{`${pet?.house_trained ? "Yes" : "No"}`}</p>
                            <br />
                        </Fragment>
                    )}
                </Card>
                <Card className="pet-details__description">
                    <h1>{`Meet ${pet?.name}`}</h1>
                    <p>{`${pet?.description}`}</p>
                </Card>
            </div>

            <Card className="pet-adoption__card">
                <div className="pet-adoption__card__content">
                    <p>{`Considering ${pet?.name} for adoption?`}</p>
                    <button>START YOUR INQUIRY</button>
                </div>

                <div className="pet-adoption__card__buttons">
                    <button>ADOPTION</button>
                    <button>FAVORITE</button>
                </div>
            </Card>
        </div>
    )
}

export default PageDetails