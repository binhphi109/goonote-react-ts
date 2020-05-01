export const MatchMode = {
  ENDS_WITH: 'endsWith',
  STARTS_WITH: 'startsWith',
  EXACT: 'exact',
  CONTAINS: 'contains',
};

export const matchTextWithCase = (textUnderTest, searchText, matchMode) => {
  if (!searchText) {
    return true;
  }
  switch (matchMode) {
    case MatchMode.ENDS_WITH:
      return textUnderTest.endsWith(searchText);

    case MatchMode.STARTS_WITH:
      return textUnderTest.startsWith(searchText);

    case MatchMode.CONTAINS:
    default:
      return textUnderTest.includes(searchText);
  }
};

export const matchTextIgnoreCase = (textUnderTest, searchText, matchMode) => {
  if (!searchText) return true;
  if (!textUnderTest) return false;
  return matchTextWithCase(textUnderTest.toUpperCase(), searchText.toUpperCase(), matchMode);
};

export const compareTextWithCase = (textUnderTest, searchText, matchMode) => {
  if (!searchText) {
    return false;
  }
  switch (matchMode) {
    case MatchMode.ENDS_WITH:
      return textUnderTest.endsWith(searchText);

    case MatchMode.STARTS_WITH:
      return textUnderTest.startsWith(searchText);

    case MatchMode.EXACT:
      return textUnderTest === searchText;

    case MatchMode.CONTAINS:
    default:
      return textUnderTest.includes(searchText);
  }
};

export const compareTextIgnoreCase = (textUnderTest, searchText, matchMode) => {
  if (!searchText) return false;
  if (!textUnderTest) return false;
  return compareTextWithCase(textUnderTest.toUpperCase(), searchText.toUpperCase(), matchMode);
};
