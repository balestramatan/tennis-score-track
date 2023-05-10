import { MatchesSelection } from "./shared";

export interface IGame {
  id: number;
  location: string;
  date: string;
  matches: MatchesSelection[];
  player1_id: string;
  player1_name: string;
  player2_id: string;
  player2_name: string;
  winner_name: string;
  winner_id: string;
}

export interface Match {
  game_id: number;
  match_number: number;
  id: number;
  player1_score: number;
  player2_score: number;
  player1_id: number;
  player2_id: number;
}
