export const whereParamsChange = (start: number, end: number) => {
  console.log("start", start);
  const params: string[] = [];
  if (end) {
    params.push(`RENGINIO_PRADZIA <= '${end}'`);
  }
  if (start) {
    params.push(`RENGINIO_PABAIGA >= '${start}'`);
  }
  console.log("params", params.join(" AND "));
  return params.join(" AND ");
};
