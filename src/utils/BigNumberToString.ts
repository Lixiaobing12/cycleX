export const scientific = (num: string | number) => {
  const num_b = Number(num);
  const toM = num_b / 1e6;
  if (toM >= 0.1) {
    return toM.toFixed(2) + "M";
  }
  const toK = num_b / 1e3;
  if (toK > 0) {
    return parseInt(toK.toString()) + "K";
  }
};
