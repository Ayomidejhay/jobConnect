'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { account, logoutUser, loginUser as appwriteLogin, registerUser as appwriteRegister, getCurrentUser } from '../appwrite'; // Import Appwrite functions

export interface AuthContextType {
  currentUser: Models.User<Models.Preferences> | null;
  loading: boolean;
  logout: () => Promise<{ success: boolean; message?: string }>;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType & {
    login?: (email: string, password: string) => Promise<any>;
    register?: (email: string, password: string, name: string) => Promise<any>;
}>({
    currentUser: null,
    loading: false,
    logout: async () => ({ success: true }),
    login: async () => ({ success: false }),
    register: async () => ({ success: false }),
});

// Custom hook to use the Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Auth Provider Component
export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
    const [currentUser, setCurrentUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);

    // Effect to check current user on initial load
    useEffect(() => {
        const checkUser = async () => {
            try {
                const { success, data } = await getCurrentUser();
                if (success) {
                    setCurrentUser(data ?? null);
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    // Function to handle login and update context state
    interface LoginResult {
        success: boolean;
        message?: string;
        data?: any;
    }

    interface LoginFunction {
        (email: string, password: string): Promise<LoginResult>;
    }

    const login: LoginFunction = async (email, password) => {
        setLoading(true);
        const result = await appwriteLogin(email, password);
        if (result.success) {
            // Re-fetch user to get full details after session creation
            const { success, data } = await getCurrentUser();
            if (success) {
                setCurrentUser(data ?? null);
            } else {
                setCurrentUser(null);
            }
        }
        setLoading(false);
        return result;
    };

    // Function to handle registration and update context state
    interface RegisterResult {
        success: boolean;
        message?: string;
        data?: any;
    }

    interface RegisterFunction {
        (email: string, password: string, name: string): Promise<RegisterResult>;
    }

    const register: RegisterFunction = async (email, password, name) => {
        setLoading(true);
        const result = await appwriteRegister(email, password, name);
        if (result.success) {
            // Optionally log in the user immediately after registration
            // or just update the state if a session is automatically created
            const loginResult = await appwriteLogin(email, password); // Log in after registration
            if (loginResult.success) {
                const { success, data } = await getCurrentUser();
                if (success) {
                    setCurrentUser(data ?? null);
                } else {
                    setCurrentUser(null);
                }
            }
        }
        setLoading(false);
        return result;
    };


    // Function to handle logout and update context state
    const logout = async () => {
        setLoading(true);
        const result = await logoutUser();
        if (result.success) {
            setCurrentUser(null);
        }
        setLoading(false);
        return result;
    };

    const value = {
        currentUser,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}