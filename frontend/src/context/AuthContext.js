import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(atob(localStorage.getItem('authTokens').split('.')[1])) : null
    );
    const history = useNavigate();

    const loginUser = async (uco, password) => {
        const response = await axios.post('/token/', {
            uco, password
        });
        if (response.status === 200) {
            setAuthTokens(response.data);
            setUser({
                id: response.data.id,
                uco: response.data.uco,
                name: response.data.name,
                surname: response.data.surname,
                role: response.data.role
            });
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            history('/');
        } else {
            alert('Something went wrong!');
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        history('/login');
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;