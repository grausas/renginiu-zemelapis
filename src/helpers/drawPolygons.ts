import graphicLayer from "@arcgis/core/layers/GraphicsLayer.js";
export const gLayer = new graphicLayer({
  title: "graphics",
});

export const drawPolygon = async (
  view: __esri.MapView | undefined,
  setGeometry: any,
  featureLayer: __esri.FeatureLayer
) => {
  const sketch = await (await import("@arcgis/core/widgets/Sketch.js")).default;

  view?.map.layers.add(gLayer);
  const home = new sketch({
    view: view,
    layer: gLayer,
    visibleElements: {
      createTools: {
        circle: false,
        polyline: false,
        rectangle: false,
        point: false,
      },
      selectionTools: {
        "lasso-selection": false,
        "rectangle-selection": false,
      },
      settingsMenu: false,
    },
    defaultUpdateOptions: {
      tool: "reshape",
      toggleToolOnClick: false,
    },
  });
  view?.ui.add(home, {
    position: "top-right",
  });

  let arr: any;
  home.on("create", function ({ graphic, state }) {
    featureLayer.opacity = 0.2;
    // check if the create event's state has changed to complete indicating
    // the graphic create operation is completed.
    if (state === "complete") {
      if (arr) {
        const geometry: any = graphic.geometry;
        const rings = geometry.rings[0];
        arr.addRing(rings);
      } else {
        arr = graphic.geometry;
      }
      // remove the graphic from the layer. Sketch adds
      // the completed graphic to the layer by default.
      setGeometry(arr);

      // use the graphic.geometry to query features that intersect it
    }

    if (state === "cancel") {
      featureLayer.opacity = 1;
    }
  });
  home.on("delete", function (event) {
    function areArraysEqual(arr1: any, arr2: any) {
      return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    function removeNestedArray(arr: any, nestedArr: any) {
      return arr.filter((item: any) => !areArraysEqual(item, nestedArr));
    }
    const geometry: any = event.graphics[0].geometry;
    const rings = geometry.rings[0];
    const newArray = removeNestedArray(arr.rings, rings);
    arr.rings = newArray;
  });
};
