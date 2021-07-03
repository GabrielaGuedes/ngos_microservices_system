export const cleanEmptyEntries = (
  object: {},
  emptyDefinitions = ["", null, undefined]
): {} => {
  const objectInArray = Object.entries(object).filter((entry) => {
    return !emptyDefinitions.includes(entry[1] as any);
  });
  return Object.fromEntries(objectInArray);
};
