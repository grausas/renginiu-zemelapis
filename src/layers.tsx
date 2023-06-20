import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// const date = new Date();
const publicDate = new Date(
  Date.now() - 30 * 24 * 60 * 60 * 1000
).toISOString();

export const featureLayerPublic = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/arcgis/rest/services/Renginiai_Vilniuje_P_View/FeatureServer/0",
    outFields: ["*"],
    title: "Renginiai",
    id: "public",
    definitionExpression: `RENGINIO_PABAIGA > '${publicDate}'`,
    effect: "drop-shadow(0px, 0px, 3px)",
  });
  return layer;
};

export const featureLayerPrivate = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Renginiai_Vilniuje_P/FeatureServer/0",
    outFields: ["*"],
    title: "Renginiai",
    id: "private",
    definitionExpression: `RENGINIO_PABAIGA > '${publicDate}'`,
    effect: "drop-shadow(0px, 0px, 3px)",
  });
  return layer;
};
