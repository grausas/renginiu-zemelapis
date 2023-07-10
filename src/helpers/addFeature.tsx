import Graphic from "@arcgis/core/Graphic";
import { featureLayerPrivate } from "../layers";
import { getDates } from "./getDates";

interface Feature {
  PAVADINIMAS: string;
  ORGANIZATORIUS: string;
  PASTABOS: string;
  APRASYMAS: string;
  WEBPAGE: string;
  RENGINIO_PRADZIA: string;
  RENGINIO_PABAIGA: string;
  KATEGORIJA: number;
  Savaites_dienos: string;
}

export const AddFeature = (feature: Feature, att: BlobPart[] | undefined) => {
  console.log("feature", feature);
  console.log("att", att);
  console.log(
    "feature.RENGINIO_PRADZIA,",
    new Date(feature.RENGINIO_PRADZIA).getTime()
  );
  console.log("savaites_dienos", feature.Savaites_dienos);
  console.log("getDay", new Date(feature.RENGINIO_PRADZIA).getDay());

  const dates = getDates(
    feature.RENGINIO_PRADZIA,
    feature.RENGINIO_PABAIGA,
    feature.Savaites_dienos
  );
  console.log("dates", dates);

  const addFeature = new Graphic({
    attributes: feature,
  });
  console.log("addFeature", addFeature);

  const options = {
    globalIdUsed: true,
  };

  const deleteFeatures = [{ objectId: 7396 }];

  const edits = {
    // addFeatures: [addFeature],
    deleteFeatures: deleteFeatures,
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

        const editsAtt: __esri.EditsProperties = {
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
