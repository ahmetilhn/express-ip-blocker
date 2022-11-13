export const isTimePassed = (oldDate: Date, limit: number): boolean => {
  const newDate = new Date().getTime();
  return newDate - Number(oldDate) > limit;
};
