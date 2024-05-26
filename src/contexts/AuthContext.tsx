// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Profile } from '@/client/types';

export interface AuthContextProps {
	token: string | null;
	profile: Profile | null;
	setToken: (token: string | null) => void;
	setProfile: (profile: Profile | null) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setTokenState] = useState<string | null>(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('authToken');
		}
		return null;
	});

	const [profile, setProfileState] = useState<Profile | null>(() => {
		if (typeof window !== 'undefined') {
			return JSON.parse(localStorage.getItem('authProfile') || 'null');
		}
		return null;
	});

	const setToken = (newToken: string | null) => {
		if (newToken === null) {
			localStorage.removeItem('authToken');
		} else {
			try {
				localStorage.setItem('authToken', newToken);
			} catch (error) {
				console.error('Error setting token in localStorage:', error);
			}
		}
		setTokenState(newToken);
	};

	const setProfile = (newProfile: Profile | null) => {
		if (newProfile === null) {
			localStorage.removeItem('authProfile');
		} else {
			localStorage.setItem('authProfile', JSON.stringify(newProfile));
		}
		setProfileState(newProfile);
	};

	return (
		<AuthContext.Provider value={{ token, profile, setToken, setProfile }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
