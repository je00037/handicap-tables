export const endpointBuilder = (league: string) => {
  let apiId;
  switch (league) {
    case 'PremierLeague':
      apiId = 39;
      break;
    case 'Championship':
      apiId = 40;
      break;
    case 'League 1':
      apiId = 41;
      break;
    case 'League 2':
      apiId = 42;
      break;
    default:
      console.log('invalid league string provided');
  }

  const endpoint = `https://v3.football.api-sports.io/standings?league=${apiId}&season=2021`;
  return endpoint;
};
