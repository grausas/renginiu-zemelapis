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
  Savaites_dienos: string;
  KASMETINIS: number;
  ILGALAIKIS: number;
  PAPILD_INF: string;
  GlobalID: string;
}

export const UpdateFeature = async (
  feature: Feature,
  att: BlobPart[] | undefined,
  geometry: __esri.Geometry
) => {
  const updateFeature = new Graphic({
    attributes: feature,
    geometry: geometry,
  });

  const edits = {
    updateFeatures: [updateFeature],
  };

  const attachments: __esri.EditsProperties[] = [];
  const attachFeatures = async (response: __esri.EditsResult) => {
    if (response) {
      att &&
        [...att].map(async (it, index) => {
          attachments.push({
            feature: response.updateFeatureResults[0],
            attachment: {
              globalId:
                response.updateFeatureResults[0].globalId.slice(0, -2) +
                index +
                index,
              name: feature.PAVADINIMAS,
              data: it,
            },
          });
        });
      const editsAtt: __esri.EditsProperties = {
        addAttachments: attachments,
      };

      await featureLayerPrivate()
        .applyEdits(editsAtt, { globalIdUsed: true })
        .then((response) => {
          if (response) {
            console.log("responseAtt", response);
          }
        })
        .catch((error) => {
          console.log("errorAtt", error);
        });
    }
    results = "success";
  };

  let results;

  await featureLayerPrivate()
    .applyEdits(edits)
    .then(async (response) => {
      if (response) {
        await attachFeatures(response);
      }
    })
    .catch((error) => {
      if (error) {
        results = "error";
      }
    });
  return results;
};
