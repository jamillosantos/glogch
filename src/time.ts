export const SECOND = 1000;
export const MINUTE = SECOND * 60;

export const sleep = async (timeout: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
