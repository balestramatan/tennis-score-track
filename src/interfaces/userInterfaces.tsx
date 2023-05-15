import { IGame } from "./game";
import { LeagueTableContext } from "../contexts/LeagueTableContext";
import { PlayerStatsResponse } from "../infrastructure/Responses.interface";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  userLogin: (user: User) => void;
  userLogout: () => void;
  isLoggedIn: () => void;
}

export interface StatisticsContextType {
  matches: number;
  wins: number;
  losses: number;
  winRate: number;
  setMatches: (matches: number) => void;
  setWins: (wins: number) => void;
  setLosses: (losses: number) => void;
  setWinRate: (winRate: number) => void;
}

export interface GamesHistoryContextType {
  games: IGame[];
  setGames: (games: any) => void;
}

export interface LeagueTableContextType {
  leagueTableStats: PlayerStatsResponse[];
  setLeagueTableStats: (stats: any) => void;
}
