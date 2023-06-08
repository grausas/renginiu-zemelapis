import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const featureLayerPublic = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/arcgis/rest/services/Renginiai_Vilniuje_P_View/FeatureServer/0",
    outFields: ["*"],
    title: "public",
    id: "public",
  });
  return layer;
};
