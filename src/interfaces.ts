import { MutableRefObject } from 'react';

export type Bookies =
  | 'Sky Bet'
  | 'PPBF'
  | 'Lads Coral'
  | 'Hills'
  | 'bet 365'
  | undefined;

export type SupportedLeagues = Array<SupportedLeagueObject>;
export interface SupportedLeagueObject {
  id: number;
  name: string;
  apiId: number;
}

export type ApiDataResponse = Array<ApiDataLeagueObject> | null;
export interface ApiDataLeagueObject {
  league: ApiDataLeague;
}
export interface ApiDataLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Array<Array<ApiDataStandings>>;
}

export interface ApiDataStandings {
  rank: number;
  team: ApiDataTeam;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: ApiDataBaseStats;
  home: ApiDataBaseStats;
  away: ApiDataBaseStats;
  update: string;
}

export interface ApiDataTeam {
  id: number;
  name: string;
  logo: string;
}

export interface ApiDataBaseStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: ApiDataGoals;
}

export interface ApiDataGoals {
  for: number;
  against: number;
}

export type Cache = Array<ApiDataResponse> | Array<null>;

export type CacheRef = MutableRefObject<Cache>;
export interface HandicapData {
  season: number;
  leagueID: number;
  bookmaker: HandicapBookmakerObject;
}

export interface HandicapBookmakerObject {
  [bookmaker: string]: HandicapLeagueArray;
}

export interface HandicapLeagueArray {
  [league: string]: Array<HandicapTeamObject>;
}

export interface HandicapTeamObject {
  id: string | number;
  team: string | number;
  hcap: string | number;
  ppg: number;
}

export interface RowData {
  league: number;
  bookie: Bookies;
  crest: string;
  position: number | string;
  team: string | number;
  played: number | string;
  won: number | string;
  drawn: number | string;
  lost: number | string;
  scored: number | string;
  conceded: number | string;
  difference: number | string;
  points: number | string;
  handicap: number | string;
  hppg: number | string;
  total: number;
  totalWithHcap: number;
}
