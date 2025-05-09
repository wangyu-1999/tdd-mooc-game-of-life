export const getInfoLine = (board) => {
  board.updateLength();
  board.updateHeight();
  return `x = ${board.length}, y = ${board.height}, rule = B3/S23`;
};
