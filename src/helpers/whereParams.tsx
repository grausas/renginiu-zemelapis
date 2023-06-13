export const whereParamsChange = (
  start: number,
  end: number,
  category: string[]
) => {
  const params: string[] = [];
  if (end) {
    params.push(`RENGINIO_PRADZIA <= '${end}'`);
  }
  if (start) {
    params.push(`RENGINIO_PABAIGA >= '${start}'`);
  }
  if (category.length > 0) {
    params.push(`KATEGORIJA IN (${category.join(",")})`);
  }

  return params.join(" AND ");
};
