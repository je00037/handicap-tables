export const endpointBuilder = (league: string | number) => {
  // let apiId;
  // switch (league) {
  //   case 'PremierLeague':
  //     apiId = 39;
  //     break;
  //   case 'Championship':
  //     apiId = 40;
  //     break;
  //   case 'League 1':
  //     apiId = 41;
  //     break;
  //   case 'League 2':
  //     apiId = 42;
  //     break;
  //   default:
  //     console.log('invalid league string provided');
  // }

  return `https://v3.football.api-sports.io/standings?league=${league}&season=2021`;
};
