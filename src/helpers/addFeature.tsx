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

export const AddFeature = (feature: Feature, att: any) => {
  console.log("feature", feature);
  console.log("att", att);

  const addFeature = new Graphic({
    attributes: feature,
  });
  console.log("addFeature", addFeature);

  const options = {
    globalIdUsed: true,
  };

  // const deleteFeatures = [
  //   { objectId: 7355 },
  //   { objectId: 7354 },
  //   { objectId: 7353 },
  //   { objectId: 7352 },
  //   { objectId: 7339 },
  //   { objectId: 7338 },
  //   { objectId: 7337 },
  // ];

  const edits = {
    // addFeatures: [addFeature],
    // deleteFeatures: deleteFeatures,
  };

  console.log("edits", edits);

  featureLayerPrivate()
    .applyEdits(edits)
    .then((response) => {
      if (response) {
        console.log("response", response);
        console.log("feature", feature);

        const blob = new Blob(att, {
          type: "image/jpeg",
        });

        console.log("blob", blob);

        const attachments = {
          feature: response.addFeatureResults[0],
          attachment: {
            globalId: response.addFeatureResults[0].globalId,
            name: feature.PAVADINIMAS,
            data: blob,
          },
        };

        const editsAtt: any = {
          addAttachments: [attachments],
        };

        console.log("editsAtt", editsAtt);

        featureLayerPrivate()
          .applyEdits(editsAtt, options)
          .then((response) => {
            if (response) {
              console.log("responseAtt", response);
            }
          })
          .catch((error) => {
            console.log("errorAtt", error);
          });
      }
    })
    .catch((error) => {
      if (error) {
        console.log("error", error);
      }
    });
};
