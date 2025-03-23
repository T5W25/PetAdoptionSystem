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

interface ShelterStaffProfile {
    id: number;
    shelterName: string;
    isVerified: boolean;
    userId: number;
    fosterProfiles?: FosterProfile[];
    adopters?: AdopterProfile[];
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
                            {profile.fosterProfiles && profile.fosterProfiles.length > 0 ? (
                                <ul className={styles.list}>
                                    {profile.fosterProfiles.map((foster) => (
                                        <li key={foster.id}>{foster.address} (User ID: {foster.userId})</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No foster profiles.</p>
                            )}

                            <h3 className={styles.sectionTitle}>Adopter Profiles:</h3>
                            {profile.adopters && profile.adopters.length > 0 ? (
                                <ul className={styles.list}>
                                    {profile.adopters.map((adopter) => (
                                        <li key={adopter.id}>{adopter.location} (User ID: {adopter.userId})</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No adopter profiles.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
