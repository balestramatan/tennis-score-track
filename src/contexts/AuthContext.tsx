import React, { createContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../interfaces/userInterfaces";
import { getData, removeData, storeData } from "../utils/asyncStorgae";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
  },
  isLoading: false,
  setIsLoading: () => {
  },
  userLogin: () => {
  },
  userLogout: () => {
  },
  isLoggedIn: () => {
  }
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userLogin = async (user: User) => {
    setIsLoading(true);
    setUser(user);
    await storeData("user", user);
    setIsLoading(false);
  };

  const userLogout = async () => {
    setIsLoading(true);
    setUser(null);
    await removeData("user");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      let user = await getData("user");
      setUser(user);
    } catch (error) {
      console.log("Error while getting user from storage", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn().then(() => console.log("User is logged in"));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading, userLogin, userLogout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
