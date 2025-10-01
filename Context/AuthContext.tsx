"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  signup: (data: any) => Promise<void>;
}

const API_BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

   const signup = async (data: any) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, data, {
        withCredentials: true,
      });
      setUser(res.data.user); // store user in context
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      throw err;
    }
  };


  return (
    <AuthContext.Provider value={{user, setUser, signup}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
