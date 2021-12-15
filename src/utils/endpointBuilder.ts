export const endpointBuilder = (league: string | number) => {
  return `https://v3.football.api-sports.io/standings?league=${league}&season=2021`;
};
