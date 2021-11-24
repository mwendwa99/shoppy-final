// react context for image
// context to hold base64 image

import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImage must be used within a ImageProvider');
    }
    return context;
};

const ImageProvider = ({ children }) => {
    const [imageBase64, setImageBase64] = useState(null);

    const value = {
        imageBase64,
        setImageBase64,
    };

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>
    );
};

export { ImageProvider, useImage };