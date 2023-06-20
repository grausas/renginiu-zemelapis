import Graphic from "@arcgis/core/Graphic";
import { featureLayerPrivate } from "../layers";

interface Feature {
  PAVADINIMAS: string;
  PASTABOS: string;
}

export const AddFeature = (feature: Feature) => {
  console.log("feature", feature);

  const addFeature = new Graphic({
    attributes: feature,
  });

  const add = {
    addFeatures: [addFeature],
  };

  console.log("add", add);

  featureLayerPrivate()
    .applyEdits(add)
    .then((response) => {
      if (response) {
        console.log("response", response);
      }
    })
    .catch((error) => {
      if (error) {
        console.log("error", error);
      }
    });
};
