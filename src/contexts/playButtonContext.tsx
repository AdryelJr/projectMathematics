import React, { createContext, useContext, useState, ReactNode } from 'react';

type PlayButtonContextType = {
    playButton: boolean;
    setPlayButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayButtonContext = createContext<PlayButtonContextType | undefined>(undefined);

export function PlayButtonProvider({ children }: { children: ReactNode }) {
    const [playButton, setPlayButton] = useState(false);
   
    return (
        <PlayButtonContext.Provider value={{ playButton, setPlayButton }}>
            {children}
        </PlayButtonContext.Provider>
    );
}

export function usePlayButton() {
    const context = useContext(PlayButtonContext);
    if (!context) {
        throw new Error('usePlayButton must be used within a PlayButtonProvider');
    }
    return context;
}
