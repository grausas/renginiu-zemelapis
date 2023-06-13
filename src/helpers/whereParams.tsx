export const whereParamsChange = (
  start: number,
  end: number,
  category: string[]
) => {
  console.log("start", start);
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

  console.log("params", params.join(" AND "));
  return params.join(" AND ");
};
