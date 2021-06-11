import { getServices } from "../requests/settings/get-services-config";

const serviceFromPath = (path: string) => {
  const re = /([a-z]|-)+/g;
  const firstPath = (path.match(re) || [""])[0];
  console.log(firstPath);
  return firstPath.replace("-", "");
};

export const isServicePathDisabled = (path: string): Promise<boolean> => {
  const service = serviceFromPath(path);
  return getServices().then((services) => {
    const availableServiceMatched = Object.entries(services).filter(
      (entry) =>
        entry[1] === true && entry[0].toLowerCase() === service.toLowerCase()
    );
    return availableServiceMatched.length === 0;
  });
};
