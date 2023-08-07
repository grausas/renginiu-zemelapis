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
  KASMETINIS: number;
  ILGALAIKIS: number;
  PAPILD_INF: string;
}

export const AddFeature = async (
  feature: Feature,
  att: BlobPart[] | undefined,
  geometry: __esri.Geometry
) => {
  const addFeature: Graphic[] = [];

  if (feature.ILGALAIKIS === 1) {
    addFeature.push(new Graphic({ attributes: feature, geometry: geometry }));

    if (feature.KASMETINIS === 1) {
      const currentYear = new Date().getFullYear();
      const nextYears = Array.from(
        { length: 4 },
        (_, i) => currentYear + 1 + i
      );

      nextYears.map((year) => {
        const recurringStartDate = new Date(feature.RENGINIO_PRADZIA);
        recurringStartDate.setFullYear(year);

        const recurringEndDate = new Date(feature.RENGINIO_PABAIGA);
        recurringEndDate.setFullYear(year);

        const recurringFeature = {
          ...feature,
          RENGINIO_PRADZIA: recurringStartDate.toISOString(),
          RENGINIO_PABAIGA: recurringEndDate.toISOString(),
        };

        addFeature.push(
          new Graphic({ attributes: recurringFeature, geometry: geometry })
        );
      });
    }
  } else {
    const dates = getDates(
      feature.RENGINIO_PRADZIA,
      feature.RENGINIO_PABAIGA,
      feature.Savaites_dienos
    );

    dates.map((date) => {
      const newFeature = { ...feature };
      newFeature.RENGINIO_PRADZIA = date.startDate;
      newFeature.RENGINIO_PABAIGA = date.endDate;

      addFeature.push(
        new Graphic({ attributes: newFeature, geometry: geometry })
      );

      if (newFeature.KASMETINIS === 1) {
        const currentYear = new Date().getFullYear();
        const nextYears = Array.from(
          { length: 4 },
          (_, i) => currentYear + 1 + i
        );

        nextYears.forEach((year) => {
          const recurringStartDate = new Date(newFeature.RENGINIO_PRADZIA);
          recurringStartDate.setFullYear(year);

          const recurringEndDate = new Date(newFeature.RENGINIO_PABAIGA);
          recurringEndDate.setFullYear(year);

          const recurringFeature = {
            ...newFeature,
            RENGINIO_PRADZIA: recurringStartDate.toISOString(),
            RENGINIO_PABAIGA: recurringEndDate.toISOString(),
          };

          addFeature.push(
            new Graphic({ attributes: recurringFeature, geometry: geometry })
          );
        });
      }
    });
  }

  const edits = {
    addFeatures: addFeature,
  };

  const attachments: __esri.EditsProperties[] = [];
  const attachFeatures = (response: __esri.EditsResult) => {
    if (response) {
      att &&
        [...att].map(async (it, index) => {
          attachments.push({
            feature: response.addFeatureResults[0],
            attachment: {
              globalId:
                response.addFeatureResults[0].globalId.slice(0, -2) +
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

      featureLayerPrivate()
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
  };

  let results;

  await featureLayerPrivate()
    .applyEdits(edits)
    .then((response) => {
      if (response) {
        results = "success";
        attachFeatures(response);
      }
    })
    .catch((error) => {
      if (error) {
        results = "error";
      }
    });
  return results;
};
