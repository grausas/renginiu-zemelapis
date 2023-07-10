export async function queryFeatures(
  layer: __esri.FeatureLayer,
  whereParams: string
) {
  const params = {
    where: whereParams,
    returnGeometry: true,
    outFields: ["*"],
  };

  const results = await layer.queryFeatures(params);
  return results.features;
}
