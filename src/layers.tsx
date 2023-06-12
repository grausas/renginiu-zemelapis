import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
const date = new Date();
const publicDate = new Date(date.setMonth(date.getMonth() - 1)).toISOString();

export const featureLayerPublic = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/arcgis/rest/services/Renginiai_Vilniuje_P_View/FeatureServer/0",
    outFields: ["*"],
    title: "Renginiai",
    id: "public",
    definitionExpression: "RENGINIO_PABAIGA > '" + publicDate + "'",
  });
  return layer;
};
