// get feature on map click
export const getFeatureOnClick = (view: __esri.MapView) => {
  const data: __esri.ViewHit[][] = [];
  view.on("click", async (event) => {
    const response = await view.hitTest(event, {
      include: view.map.layers.getItemAt(0) as __esri.FeatureLayer,
    });
    if (response.results.length) {
      data.push(response.results);
    }
  });
  return data;
};
