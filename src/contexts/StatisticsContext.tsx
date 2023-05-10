import React, { createContext, useState } from "react";
import { StatisticsContextType } from "../interfaces/userInterfaces";

export const StatisticsContext = createContext<StatisticsContextType>({
  matches: 0,
  wins: 0,
  losses: 0,
  winRate: 0,
  setMatches: () => {
  }, setWins: () => {
  }, setLosses: () => {
  }, setWinRate: () => {
  }
});

export const StatisticsProvider = ({ children }: { children: any }) => {
  const [matches, setMatches] = useState<number>(0);
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);
  const [winRate, setWinRate] = useState<number>(0);

  return (
    <StatisticsContext.Provider value={{ matches, wins, losses, winRate, setMatches, setWins, setLosses, setWinRate }}>
      {children}
    </StatisticsContext.Provider>
  );
};
