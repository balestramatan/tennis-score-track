import React, { createContext, useState } from "react";
import { LeagueTableContextType } from "../interfaces/userInterfaces";
import { PlayerStatsResponse } from "../infrastructure/Responses.interface";

export const LeagueTableContext = createContext<LeagueTableContextType>({
  leagueTableStats: [],
  setLeagueTableStats: () => {
  }
});

export const LeagueTableProvider = ({ children }: { children: any }) => {
  const [leagueTableStats, setLeagueTableStats] = useState<PlayerStatsResponse[]>([]);

  return (
    <LeagueTableContext.Provider value={{ leagueTableStats, setLeagueTableStats }}>
      {children}
    </LeagueTableContext.Provider>
  );
};
