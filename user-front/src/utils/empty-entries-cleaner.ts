type EmptyEntry = "" | null | undefined | false;

export const cleanEmptyEntries = (
  object: {},
  emptyDefinitions: EmptyEntry[] = ["", null, undefined]
): {} => {
  const objectInArray = Object.entries(object).filter((entry) => {
    return !emptyDefinitions.includes(entry[1] as any);
  });
  return Object.fromEntries(objectInArray);
};
