export type Bookies =
  | 'Sky Bet'
  | 'PPBF'
  | 'Ladbrokes'
  | 'Hills'
  | 'Bet 365'
  | undefined;

export type Leagues =
  | 'PremierLeague'
  | 'Championship'
  | 'League 1'
  | 'League 2'
  | undefined;
export interface ApiData {
  filters: object;
  competition: ApiDataCompetition;
  season: ApiDataSeason;
  standings: Array<ApiDataStandings>;
}

export interface ApiDataTeam {
  id: number;
  name: string;
  crestUrl: string;
}

export interface ApiDataTable {
  position: number;
  team: ApiDataTeam;
  playedGames: number;
  form?: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface ApiDataStandings {
  stage: string;
  type: string;
  group?: string;
  table: Array<ApiDataTable>;
}

export interface ApiDataSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner?: string;
}

export interface ApiDataArea {
  id: number;
  name: string;
}

export interface ApiDataCompetition {
  id: number;
  area: ApiDataArea;
  name: string;
  code: string;
  plan: string;
  lastUpdated: string;
}

export interface HandicapData {
  bookmaker: HandicapBookmakerObject;
}

export interface HandicapBookmakerObject {
  [bookmaker: string]: HandicapLeagueArray;
}

export interface HandicapLeagueArray {
  [league: string]: Array<HandicapTeamObject>;
}

export interface HandicapTeamObject {
  id: number;
  team: string;
  hcap: number;
  ppg: number;
}

export interface RowData {
  league: number;
  bookie: Bookies;
  crest: string;
  position: number | string;
  team: string;
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
}
