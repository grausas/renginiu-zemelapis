export const drawPolygon = async (view) => {
  const sketch = await (await import("@arcgis/core/widgets/Sketch.js")).default;
  const graphicLayer = await (
    await import("@arcgis/core/layers/GraphicsLayer.js")
  ).default;
  const layer = new graphicLayer({
    title: "graphics",
  });
  view?.map.layers.add(layer);
  const home = new sketch({
    view: view,
    layer: layer,
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
  home.on("create", function (event) {
    // check if the create event's state has changed to complete indicating
    // the graphic create operation is completed.
    if (event.state === "complete") {
      console.log("arr", arr);
      if (arr) {
        console.log("heheh");
        arr.addRing(event.graphic.geometry.rings[0]);
      } else {
        arr = event.graphic.geometry;
      }
      // remove the graphic from the layer. Sketch adds
      // the completed graphic to the layer by default.
      console.log(event);

      // use the graphic.geometry to query features that intersect it
    }
  });
  home.on("delete", function (event) {
    function areArraysEqual(arr1, arr2) {
      return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    function removeNestedArray(arr, nestedArr) {
      return arr.filter((item) => !areArraysEqual(item, nestedArr));
    }

    const newArray = removeNestedArray(
      arr.rings,
      event.graphics[0].geometry.rings[0]
    );
    arr.rings = newArray;

    // console.log("event ", event.graphics[0].geometry.rings[0]);
    // console.log("arr rings ", arr);
    // arr.rings.filter(
    //   (arr) => !arr.includes(event.graphics[0].geometry.rings[0])
    // );
  });
};
