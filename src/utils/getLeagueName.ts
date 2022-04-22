export const getLeagueName = (id: number | undefined): string => {
  switch (id) {
    case 39:
      return 'Premier League';
    case 40:
      return 'Championship';
    case 41:
      return 'League One';
    case 42:
      return 'League Two';
    default:
      return 'invalid league ID provided';
  }
};
