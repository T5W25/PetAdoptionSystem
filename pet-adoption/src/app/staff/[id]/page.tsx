'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

interface FosterProfile {
    id: number;
    address: string;
    userId: number;
    shelterStaffId: number;
}

interface AdopterProfile {
    id: number;
    location: string;
    userId: number;
    shelterStaffId: number;
}

interface VolunteerProfile {
    id: number;
    interests: string;
    userId: number;
    shelterStaffId: number | null;
}

interface VeterinarianProfile {
    id: number;
    licenseNumber: string;
    clinicName: string;
    contactNumber: string;
    specialization?: string;
    userId: number;
    shelterStaffId: number | null;
}

interface ShelterStaffProfile {
    id: number;
    shelterName: string;
    isVerified: boolean;
    userId: number;
    fosterProfiles?: FosterProfile[];
    adopters?: AdopterProfile[];
    volunteers?: VolunteerProfile[];
    veterinarians?: VeterinarianProfile[];
}

export default function StaffProfilePage() {
    const { id } = useParams();
    const [profile, setProfile] = useState<ShelterStaffProfile | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/staff/profiles?userId=${id}`);
                const data = await res.json();
                setProfile(data.profile || null);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, [id]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shelter Staff Profile</h1>

            {!profile ? (
                <p>Loading or no profile found for user ID: {id}</p>
            ) : (
                <div className={styles.card}>
                    <h2 className={styles.profileName}>
                        {profile.shelterName}
                        <span className={profile.isVerified ? styles.verified : styles.notVerified}>
                            {profile.isVerified ? "✅ Verified" : "❌ Not Verified"}
                        </span>
                    </h2>

                    <h3 className={styles.sectionTitle}>Foster Profiles:</h3>
                    {profile.fosterProfiles?.length ? (
                        <ul className={styles.list}>
                            {profile.fosterProfiles.map((foster) => (
                                <li key={foster.id}>
                                    {foster.address} (User ID: {foster.userId})
                                    <button
                                        onClick={async () => {
                                            try {
                                                const res = await fetch(`/api/foster-to-shelter/unlink`, {
                                                    method: "DELETE",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ fosterId: foster.userId }),
                                                });

                                                if (res.ok) {
                                                    setProfile((prev) => ({
                                                        ...prev!,
                                                        fosterProfiles: prev!.fosterProfiles!.filter(f => f.id !== foster.id),
                                                    }));
                                                } else {
                                                    console.error("Failed to unlink foster");
                                                }
                                            } catch (error) {
                                                console.error("Error unlinking foster:", error);
                                            }
                                        }}
                                        className={styles.deleteButton}
                                    >
                                        ❌ Unlink
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No foster profiles.</p>
                    )}

                    <h3 className={styles.sectionTitle}>Adopter Profiles:</h3>
                    {profile.adopters?.length ? (
                        <ul className={styles.list}>
                            {profile.adopters.map((adopter) => (
                                <li key={adopter.id}>
                                    {adopter.location} (User ID: {adopter.userId})
                                    <button
                                        onClick={async () => {
                                            try {
                                                const res = await fetch(`/api/adopter-to-shelter/unlink`, {
                                                    method: "DELETE",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ adopterId: adopter.userId }),
                                                });

                                                if (res.ok) {
                                                    setProfile((prev) => ({
                                                        ...prev!,
                                                        adopters: prev!.adopters!.filter(a => a.id !== adopter.id),
                                                    }));
                                                } else {
                                                    console.error("Failed to unlink adopter");
                                                }
                                            } catch (error) {
                                                console.error("Error unlinking adopter:", error);
                                            }
                                        }}
                                        className={styles.deleteButton}
                                    >
                                        ❌ Unlink
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No adopter profiles.</p>
                    )}

                    <h3 className={styles.sectionTitle}>Volunteer Profiles:</h3>
                    {profile.volunteers?.length ? (
                        <ul className={styles.list}>
                            {profile.volunteers.map((volunteer) => (
                                <li key={volunteer.id}>
                                    Interests: {volunteer.interests} (User ID: {volunteer.userId})
                                    <button
                                        onClick={async () => {
                                            try {
                                                const res = await fetch(`/api/volunteer-to-shelter/unlink`, {
                                                    method: "DELETE",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ volunteerId: volunteer.userId }),
                                                });

                                                if (res.ok) {
                                                    setProfile((prev) => ({
                                                        ...prev!,
                                                        volunteers: prev!.volunteers!.filter(v => v.id !== volunteer.id),
                                                    }));
                                                } else {
                                                    console.error("Failed to unlink volunteer");
                                                }
                                            } catch (error) {
                                                console.error("Error unlinking volunteer:", error);
                                            }
                                        }}
                                        className={styles.deleteButton}
                                    >
                                        ❌ Unlink
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No volunteer profiles.</p>
                    )}

                    <h3 className={styles.sectionTitle}>Veterinarian Profiles:</h3>
                    {profile.veterinarians?.length ? (
                        <ul className={styles.list}>
                            {profile.veterinarians.map((vet) => (
                                <li key={vet.id}>
                                    <strong>{vet.clinicName}</strong> — License: {vet.licenseNumber}
                                    <br />
                                    Contact: {vet.contactNumber}
                                    <br />
                                    Specialization: {vet.specialization ?? "N/A"} (User ID: {vet.userId})
                                    <br />
                                    <button
                                        onClick={async () => {
                                            try {
                                                const res = await fetch(`/api/vet-to-shelter/unlink`, {
                                                    method: "DELETE",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ vetId: vet.userId }),
                                                });

                                                if (res.ok) {
                                                    setProfile((prev) => ({
                                                        ...prev!,
                                                        veterinarians: prev!.veterinarians!.filter(v => v.id !== vet.id),
                                                    }));
                                                } else {
                                                    console.error("Failed to unlink vet");
                                                }
                                            } catch (error) {
                                                console.error("Error unlinking vet:", error);
                                            }
                                        }}
                                        className={styles.deleteButton}
                                    >
                                        ❌ Unlink
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No veterinarian profiles.</p>
                    )}
                </div>
            )}
        </div>
    );
}
