'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface UserContextType {
    userId: string | null;
    setUserId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserIdState] = useState<string | null>(null);

    useEffect(() => {
        const storedId = localStorage.getItem('userId');
        if (storedId) {
            setUserIdState(storedId);
        }
        
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'userId') {
                setUserIdState(event.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const setUserId = (id: string | null) => {
        if (id) {
            localStorage.setItem('userId', id);
        } else {
            localStorage.removeItem('userId');
        }
        setUserIdState(id);
    };

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
