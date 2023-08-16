import { featureLayerPrivate } from "../layers";

export const DeleteFeature = async (objectId: number) => {
  const featureDelete = {
    deleteFeatures: [{ objectId: objectId }],
  };

  let results;

  await featureLayerPrivate()
    .applyEdits(featureDelete)
    .then((response) => {
      if (response) {
        results = "success";
      }
    })
    .catch((error) => {
      if (error) {
        results = "error";
      }
    });
  return results;
};
