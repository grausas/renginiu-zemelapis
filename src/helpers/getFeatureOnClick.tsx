// get feature on map click
export const getFeatureOnClick = (view: __esri.MapView) => {
  const data: __esri.ViewHit[][] = [];
  view.on("click", async (event) => {
    await view
      .hitTest(event, {
        include: view.map.layers.getItemAt(0) as __esri.FeatureLayer,
      })
      .then(function (response: __esri.HitTestResult) {
        // if features are returned from the featureLayer, do something with results
        if (response.results.length) {
          // do something
          console.log(response.results, "features returned");
          data.push(response.results);
        }
      });
  });
  return data;
};
