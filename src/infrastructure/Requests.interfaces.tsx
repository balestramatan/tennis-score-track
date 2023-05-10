import { MatchesSelection } from "../interfaces/shared";

export interface UploadGameReq {
  player1_id: string;
  player2_id: string;
  winner_id: string;
  games_count: string,
  matches: MatchesSelection[]
  location: string;
}
