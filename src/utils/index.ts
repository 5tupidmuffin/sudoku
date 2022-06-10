export const getRandomArbitrary = (min: number, max: number) => {
  const random = Math.random();
  //   50% change of getting 0 i.e. empty cell
  if (random > 0.5) {
    return 0;
  }
  return Math.floor(random * (max - min) + min);
};
