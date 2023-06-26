import Graphic from "@arcgis/core/Graphic";
import { featureLayerPrivate } from "../layers";

interface Feature {
  PAVADINIMAS: string;
  ORGANIZATORIUS: string;
  PASTABOS: string;
  APRASYMAS: string;
  WEBPAGE: string;
  RENGINIO_PRADZIA: string;
  RENGINIO_PABAIGA: string;
  KATEGORIJA: number;
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

  // featureLayerPrivate()
  //   .applyEdits(add)
  //   .then((response) => {
  //     if (response) {
  //       console.log("response", response);
  //     }
  //   })
  //   .catch((error) => {
  //     if (error) {
  //       console.log("error", error);
  //     }
  //   });
};
