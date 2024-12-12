export const connectZetrixWallet = () => {
  return new Promise((resolve, reject) => {
    if ((window as any)?.zetrix) {
      let zetrix = (window as any).zetrix;
      zetrix.getAccount((result: any) => {
        resolve(result);
      });
    } else {
      resolve({
        code: 404,
        message: "Zetrix wallet not found",
      });
    }
  });
};
