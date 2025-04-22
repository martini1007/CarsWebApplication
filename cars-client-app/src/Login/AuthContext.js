// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Tworzymy kontekst
const AuthContext = createContext();

// Komponent dostarczający kontekst
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null); // Domyślnie nie ma tokenu

    // Funkcja ustawiająca token
    const saveToken = (newToken) => {
        setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{ token, saveToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook do używania kontekstu
export const useAuth = () => useContext(AuthContext);
