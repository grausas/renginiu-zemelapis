export const whereParamsChange = (
  start: number | undefined,
  end: number | undefined,
  category: string[]
): string => {
  const params: string[] = [];
  if (end !== undefined) params.push(`RENGINIO_PRADZIA <= '${end}'`);
  if (start !== undefined) params.push(`RENGINIO_PABAIGA >= '${start}'`);
  if (category.length) params.push(`KATEGORIJA IN (${category.join(",")})`);
  return params.join(" AND ");
};
