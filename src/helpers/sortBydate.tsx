export const sortByDate = (results: any) => {
  const sortedResults =
    results &&
    results.slice(0).sort((a: any, b: any) => {
      const x = a.attributes.RENGINIO_PRADZIA;
      const y = b.attributes.RENGINIO_PRADZIA;
      return x < y ? -1 : x > y ? 1 : 0;
    });

  return sortedResults;
};
