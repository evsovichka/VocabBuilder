export const selectStatistics = (state) => state.words.totalCount;

export const selectAllWords = (state) => state.words.items;

export const selectWordsOtherUsers = (state) => state.words.otherUsersWords;

export const selectTotalCountWordsOtherUsers = (state) =>
  state.words.totalCountOtherUsersWords;
