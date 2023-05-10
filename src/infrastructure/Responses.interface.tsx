import React from "react";

export interface StatisticsResponse {
  wins: number;
  losses: number;
}

export interface PlayerStatsResponse {
  id: number;
  first_name: string;
  statistics: StatisticResponse[];
}

export interface StatisticResponse {
  wins: number;
  losses: number;
}
