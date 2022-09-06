export const convertId = (id?: string | number) =>
  typeof id === "number" ? id : parseInt(id ?? "-1", 10);
