"use client";
import { useEffect, useState } from "react";
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

export default function StaffProfiles() {
    const [profiles, setProfiles] = useState<ShelterStaffProfile[]>([]);

    useEffect(() => {
        fetch("/api/staff/profiles")
            .then((res) => res.json())
            .then((data) => setProfiles(data.profiles))
            .catch((err) => console.error("Error fetching profiles:", err));
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shelter Staff Profiles</h1>

            {profiles.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.gridContainer}>
                    {profiles.map((profile) => (
                        <div key={profile.id} className={styles.card}>
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
                                            <strong>{vet.clinicName}</strong> — License: {vet.licenseNumber}<br />
                                            Contact: {vet.contactNumber}<br />
                                            Specialization: {vet.specialization ?? "N/A"} (User ID: {vet.userId})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No veterinarian profiles.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
