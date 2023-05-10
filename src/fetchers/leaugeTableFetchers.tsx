import axios from "axios";
import { PlayerStatsResponse } from "../infrastructure/Responses.interface";

export const fetchLeagueTableStats = async (): Promise<PlayerStatsResponse[]> => {
  const response = await axios.get("http://localhost:3000/leagueTable");
  return response.data;
};
