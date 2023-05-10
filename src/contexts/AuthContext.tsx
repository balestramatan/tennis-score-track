import React, { createContext, useState } from "react";
import { AuthContextType, User } from "../interfaces/userInterfaces";

export const AuthContext = createContext<AuthContextType>({
  user: null, setUser: () => {
  }
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
