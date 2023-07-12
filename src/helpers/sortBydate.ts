export const sortByDate = (results: __esri.Graphic[]) => {
  return results
    .slice()
    .sort(
      (a, b) => a.attributes.RENGINIO_PRADZIA - b.attributes.RENGINIO_PRADZIA
    );
};
