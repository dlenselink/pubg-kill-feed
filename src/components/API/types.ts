interface Match {
  type: string;
  id: string;
}

interface SeasonList {
  attributes: {
    isCurrentSeason: boolean,
    isOffseason: boolean,
  },
  id: string,
  type: string,
}