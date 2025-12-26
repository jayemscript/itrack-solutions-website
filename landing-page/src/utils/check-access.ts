export const canAccess = (userAccess: string[] = [], path: string): boolean => {
  return userAccess.includes(path);
};
