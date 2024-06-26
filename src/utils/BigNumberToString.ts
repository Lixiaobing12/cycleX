export const scientific = (num: string | number) => {
  const num_b = Number(num);
  const toM = num_b / 1e7;
  if (toM >= 1) {
    return toM.toFixed(1) + "M";
  }
  const toK = num_b / 1e4;
  if (toK > 0) {
    return parseInt(toK.toString()) + "K";
  }
};
