import React, { createContext, useState } from "react";
import { GamesHistoryContextType } from "../interfaces/userInterfaces";

export const GamesHistoryContext = createContext<GamesHistoryContextType>({
  games: [],
  setGames: () => {
  }
});

export const GamesHistoryProvider = ({ children }: { children: any }) => {
  const [games, setGames] = useState<any[]>([]);

  return (
    <GamesHistoryContext.Provider value={{ games, setGames }}>
      {children}
    </GamesHistoryContext.Provider>
  );
};
