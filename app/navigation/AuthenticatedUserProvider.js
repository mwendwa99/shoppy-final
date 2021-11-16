/* this file checks whether a user is logged in or not
conditionally renders two different stack navigators 
so a user will only be able to log in and access HomeScreen
if their respective user object exists*/

import React, { useState, createContext } from 'react';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};