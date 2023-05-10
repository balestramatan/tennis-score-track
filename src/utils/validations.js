export const matchesSelectionValidation = (matches) => {
  let flag = true;
  if (matches.length < 1) flag = false;

  matches.forEach(match => {
    console.log(match);
    if (match.player1_score < 6 && match.player2_score < 6) flag = false;
  });
  return flag;
};
